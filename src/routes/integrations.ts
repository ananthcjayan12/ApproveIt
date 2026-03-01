import { Hono } from 'hono';
import type { Env } from '../types';
import { createApprovalRequest } from '../services/approvals';
import { getBoardConfig, getBoardConfigByBoardId } from '../services/boardConfigs';
import { checkFreeTierLimit } from '../services/usage';
import { verifyMondayJwt, verifyMondaySignature } from '../services/auth';
import { updateMondayStatus } from '../services/mondayStatus';
import { sendMondayNotification } from '../services/mondayNotifications';
import { getApproverFromPeopleColumn } from '../services/mondayItems';
import { MondayApiError } from '../services/mondayClient';
import { logSideEffectFailure, queueSideEffectFailure } from '../services/sideEffects';

const integrationsRoutes = new Hono<{ Bindings: Env }>();

function parsePositiveInt(value: unknown): number | undefined {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function firstDefined<T>(...values: Array<T | undefined>): T | undefined {
  return values.find((value) => value !== undefined);
}

function parseString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function parseEntityId(value: unknown, nestedKeys: string[] = []): number | undefined {
  const record = asRecord(value);

  return firstDefined(
    parsePositiveInt(value),
    parsePositiveInt(record.id),
    ...nestedKeys.map((key) => parsePositiveInt(record[key])),
  );
}

function parseFirstPositiveIntFromArray(value: unknown): number | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  for (const entry of value) {
    const parsed = parsePositiveInt(entry);
    if (parsed) {
      return parsed;
    }
  }

  return undefined;
}

function parseApprover(value: unknown): { id?: number; name?: string } {
  const record = asRecord(value);

  const directId = firstDefined(
    parseEntityId(value, ['userId', 'user_id', 'personId', 'person_id']),
    parsePositiveInt(record.userId),
    parsePositiveInt(record.personId),
  );
  const directName = firstDefined(parseString(record.name), parseString(record.text), parseString(record.label));

  if (directId || directName) {
    return { id: directId, name: directName };
  }

  const people = Array.isArray(record.personsAndTeams) ? record.personsAndTeams : [];
  const firstPerson = asRecord(people[0]);
  return {
    id: parsePositiveInt(firstPerson.id),
    name: parseString(firstPerson.name),
  };
}

function parseColumnId(value: unknown): string | undefined {
  const candidate = parseString(value);
  if (!candidate) {
    return undefined;
  }

  return /^[a-zA-Z0-9_]+$/.test(candidate) ? candidate : undefined;
}

function normalizeIntegrationInput(payload: Record<string, unknown>): {
  accountId?: number;
  boardId?: number;
  itemId?: number;
  requesterId?: number;
  requesterName?: string;
  approverId?: number;
  approverName?: string;
  approverColumnId?: string;
  statusColumnId?: string;
  triggerStatusColumnId?: string;
  note?: string;
} {
  const embeddedPayload = asRecord(payload.payload);
  const inbound = asRecord(firstDefined(embeddedPayload.inboundFieldValues, embeddedPayload.inputFields));
  const inputRoot =
    Object.keys(inbound).length > 0
      ? { ...embeddedPayload, ...payload, ...inbound }
      : { ...embeddedPayload, ...payload };

  const approverValue = firstDefined(
    inputRoot.approver,
    inputRoot.approverId,
    inputRoot.person,
    inputRoot.people,
    inputRoot.user,
  );
  const approver = parseApprover(approverValue);

  return {
    accountId: firstDefined(
      parseEntityId(inputRoot.accountId, ['accountId', 'account_id']),
      parseEntityId(inputRoot.account_id, ['accountId', 'account_id']),
    ),
    boardId: firstDefined(
      parseEntityId(inputRoot.boardId, ['boardId', 'board_id']),
      parseEntityId(inputRoot.board_id, ['boardId', 'board_id']),
    ),
    itemId: firstDefined(
      parseEntityId(inputRoot.itemId, ['itemId', 'item_id', 'pulseId', 'pulse_id']),
      parseEntityId(inputRoot.item_id, ['itemId', 'item_id', 'pulseId', 'pulse_id']),
      parseEntityId(inputRoot.pulseId, ['itemId', 'item_id', 'pulseId', 'pulse_id']),
      parseFirstPositiveIntFromArray(inputRoot.itemIds),
      parseFirstPositiveIntFromArray(inputRoot.item_ids),
      parseFirstPositiveIntFromArray(inputRoot.pulseIds),
      parseFirstPositiveIntFromArray(inputRoot.pulse_ids),
    ),
    requesterId: firstDefined(
      parseEntityId(inputRoot.requesterId, ['requesterId', 'requester_id']),
      parseEntityId(inputRoot.requester_id, ['requesterId', 'requester_id']),
      parseEntityId(inputRoot.userId, ['userId', 'user_id']),
      parseEntityId(inputRoot.triggeredByUserId, ['triggeredByUserId', 'triggered_by_user_id']),
    ),
    requesterName: firstDefined(
      parseString(inputRoot.requesterName),
      parseString(inputRoot.requester_name),
      parseString(inputRoot.userName),
    ),
    approverId: approver.id,
    approverName: firstDefined(
      parseString(inputRoot.approverName),
      parseString(inputRoot.approver_name),
      approver.name,
    ),
    approverColumnId: approver.id ? undefined : parseColumnId(approverValue),
    statusColumnId: firstDefined(
      parseString(inputRoot.statusColumnId),
      parseString(inputRoot.status_column_id),
      parseString(inputRoot.trackStatusColumn),
      parseString(inputRoot.track_column_id),
      parseString(inputRoot.status),
    ),
    triggerStatusColumnId: firstDefined(
      parseString(inputRoot.triggerStatusColumnId),
      parseString(inputRoot.trigger_status_column_id),
      parseString(inputRoot.triggerColumnId),
      parseString(inputRoot.trigger_column_id),
      parseString(inputRoot.sourceStatusColumnId),
      parseString(inputRoot.source_status_column_id),
    ),
    note: parseString(inputRoot.note),
  };
}

function getErrorCode(error: unknown): string {
  if (error instanceof MondayApiError) {
    return error.code;
  }

  return 'UNKNOWN_ERROR';
}

function logIntegrationEvent(
  level: 'info' | 'warn' | 'error',
  requestId: string,
  event: string,
  details: Record<string, unknown> = {},
): void {
  const entry = JSON.stringify({
    level,
    requestId,
    event,
    ...details,
  });

  if (level === 'error') {
    console.error(entry);
    return;
  }

  if (level === 'warn') {
    console.warn(entry);
    return;
  }

  console.log(entry);
}

integrationsRoutes.post('/request-approval', async (c) => {
  const requestId = crypto.randomUUID();
  const signature = c.req.header('x-monday-signature');
  const authorizationHeader = c.req.header('authorization');

  logIntegrationEvent('info', requestId, 'integration_request_started', {
    hasSignatureHeader: Boolean(signature),
    hasAuthorizationHeader: Boolean(authorizationHeader),
  });

  if (!signature && !authorizationHeader) {
    logIntegrationEvent('warn', requestId, 'integration_auth_missing_headers');
    return c.json(
      {
        error: {
          code: 'UNAUTHORIZED',
          message: 'Missing monday signature header.',
          requestId,
        },
      },
      401,
    );
  }

  const rawBody = await c.req.text();
  const jwtClaims = authorizationHeader
    ? await verifyMondayJwt({
        secret: c.env.MONDAY_SIGNING_SECRET,
        authorizationHeader,
      })
    : null;
  const hasValidHmacSignature = signature
    ? await verifyMondaySignature({
        secret: c.env.MONDAY_SIGNING_SECRET,
        payload: rawBody,
        providedSignature: signature,
      })
    : false;

  if (!jwtClaims && !hasValidHmacSignature) {
    logIntegrationEvent('warn', requestId, 'integration_auth_failed', {
      hasSignatureHeader: Boolean(signature),
      hasAuthorizationHeader: Boolean(authorizationHeader),
      rawBodyLength: rawBody.length,
    });
    return c.json(
      {
        error: {
          code: 'UNAUTHORIZED',
          message: 'Invalid monday signature.',
          requestId,
        },
      },
      401,
    );
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody) as unknown;
  } catch {
    logIntegrationEvent('error', requestId, 'integration_payload_parse_failed', {
      rawBodyPreview: rawBody.slice(0, 500),
    });
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Payload must be valid JSON.',
          requestId,
        },
      },
      400,
    );
  }

  if (!payload || typeof payload !== 'object') {
    logIntegrationEvent('error', requestId, 'integration_payload_not_object', {
      payloadType: typeof payload,
    });
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Payload must be a JSON object.',
          requestId,
        },
      },
      400,
    );
  }

  const rawPayload = payload as Record<string, unknown>;
  const embeddedPayload = asRecord(rawPayload.payload);
  const inboundFieldValues = asRecord(firstDefined(embeddedPayload.inboundFieldValues, embeddedPayload.inputFields));
  const input = normalizeIntegrationInput(rawPayload);
  logIntegrationEvent('info', requestId, 'integration_request_received', {
    authMode: jwtClaims ? 'jwt' : hasValidHmacSignature ? 'hmac' : 'none',
    rawKeys: Object.keys(rawPayload),
    payloadKeys: Object.keys(embeddedPayload),
    inboundKeys: Object.keys(inboundFieldValues),
    jwtClaimKeys: jwtClaims ? Object.keys(jwtClaims) : [],
    normalizedInput: input,
  });
  const boardId = input.boardId;
  const boardConfig = boardId ? await getBoardConfigByBoardId(c.env.DB, boardId) : null;
  const accountId = input.accountId ?? parsePositiveInt(jwtClaims?.accountId) ?? boardConfig?.accountId;
  const itemId = input.itemId;
  const requesterId = input.requesterId ?? parsePositiveInt(jwtClaims?.userId) ?? 0;
  const requesterName = input.requesterName ?? 'Automation';

  if (!accountId || !boardId || !itemId) {
    logIntegrationEvent('error', requestId, 'integration_payload_validation_failed', {
      reason: 'missing_required_base_fields',
      normalizedInput: input,
      resolvedAccountId: accountId,
      boardConfig,
    });
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'accountId, boardId, and itemId are required.',
          requestId,
        },
      },
      400,
    );
  }

  const usageLimit = await checkFreeTierLimit(c.env, accountId);
  if (!usageLimit.allowed) {
    logIntegrationEvent('warn', requestId, 'integration_usage_limit_reached', {
      accountId,
      limit: usageLimit.limit,
    });
    return c.json(
      {
        error: {
          code: 'FREE_TIER_LIMIT_REACHED',
          message: `Monthly limit reached (${usageLimit.limit}). Upgrade required to continue.`,
          requestId,
        },
      },
      403,
    );
  }

  let approverId = input.approverId;
  let approverName = input.approverName ?? (approverId ? `User ${approverId}` : '');

  if (!approverId && itemId && input.approverColumnId) {
    try {
      const resolvedApprover = await getApproverFromPeopleColumn(c.env, {
        itemId,
        peopleColumnId: input.approverColumnId,
      });
      approverId = resolvedApprover.userId;
      approverName = resolvedApprover.userName ?? (approverId ? `User ${approverId}` : approverName);
      logIntegrationEvent('info', requestId, 'integration_approver_resolved_from_column', {
        itemId,
        approverColumnId: input.approverColumnId,
        approverId,
        approverName,
      });
    } catch (error) {
      logIntegrationEvent('error', requestId, 'integration_approver_resolution_failed', {
        itemId,
        approverColumnId: input.approverColumnId,
        errorCode: getErrorCode(error),
        errorMessage: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const config = boardConfig ?? await getBoardConfig(c.env.DB, boardId, accountId);
  const statusColumnId =
    typeof input.statusColumnId === 'string' && input.statusColumnId.trim()
      ? input.statusColumnId.trim()
      : (config?.statusColumnId ?? '');

  if (!statusColumnId) {
    logIntegrationEvent('error', requestId, 'integration_status_column_missing', {
      normalizedInput: input,
      boardConfig,
    });
    return c.json(
      {
        error: {
          code: 'MISSING_STATUS_COLUMN',
          message: 'statusColumnId is missing in payload and board config.',
          requestId,
        },
      },
      400,
    );
  }

  if (!approverId) {
    logIntegrationEvent('error', requestId, 'integration_approver_missing', {
      normalizedInput: input,
      attemptedApproverColumnId: input.approverColumnId,
    });
    return c.json(
      {
        error: {
          code: 'MISSING_APPROVER',
          message: 'Recipe payload must include approverId.',
          requestId,
        },
      },
      400,
    );
  }

  let result: Awaited<ReturnType<typeof createApprovalRequest>>;
  try {
    result = await createApprovalRequest(c.env.DB, {
      accountId,
      boardId,
      itemId,
      requesterId,
      requesterName,
      approverId,
      approverName,
      statusColumnId,
      note: input.note,
    });
  } catch (error) {
    logIntegrationEvent('error', requestId, 'integration_create_approval_threw', {
      accountId,
      boardId,
      itemId,
      approverId,
      errorMessage: error instanceof Error ? error.message : String(error),
    });
    return c.json(
      {
        error: {
          code: 'STORAGE_ERROR',
          message: 'Unable to create approval request.',
          requestId,
        },
      },
      500,
    );
  }

  if (!result.ok && result.reason === 'duplicate_pending') {
    logIntegrationEvent('warn', requestId, 'integration_duplicate_pending_approval', {
      accountId,
      boardId,
      itemId,
      approverId,
      existingApprovalId: result.existingApprovalId,
    });
    return c.json(
      {
        error: {
          code: 'DUPLICATE_PENDING_APPROVAL',
          message: 'A pending approval already exists for this item and approver.',
          details: [result.existingApprovalId],
          requestId,
        },
      },
      409,
    );
  }

  if (!result.ok) {
    logIntegrationEvent('error', requestId, 'integration_create_approval_failed', {
      accountId,
      boardId,
      itemId,
      approverId,
      result,
    });
    return c.json(
      {
        error: {
          code: 'STORAGE_ERROR',
          message: 'Unable to create approval request.',
          requestId,
        },
      },
      500,
    );
  }

  const sideEffectFailures: Array<{ operation: string; errorCode: string }> = [];

  const shouldSkipStatusSync =
    input.triggerStatusColumnId !== undefined && input.triggerStatusColumnId === statusColumnId;

  if (shouldSkipStatusSync) {
    logIntegrationEvent('warn', requestId, 'integration_status_sync_skipped', {
      reason: 'trigger_and_tracking_columns_match',
      boardId,
      itemId,
      statusColumnId,
    });
  } else {
    try {
      await updateMondayStatus(c.env, {
        boardId,
        itemId,
        statusColumnId,
        status: 'pending',
      });
      logIntegrationEvent('info', requestId, 'integration_status_sync_succeeded', {
        boardId,
        itemId,
        statusColumnId,
      });
    } catch (error) {
      logIntegrationEvent('error', requestId, 'integration_status_sync_failed', {
        boardId,
        itemId,
        statusColumnId,
        errorCode: getErrorCode(error),
        errorMessage: error instanceof Error ? error.message : String(error),
      });
      sideEffectFailures.push({ operation: 'updateMondayStatus', errorCode: getErrorCode(error) });
    }
  }

  try {
    await sendMondayNotification(c.env, {
      recipientUserId: approverId,
      targetItemId: itemId,
      template: 'requested',
      requesterName,
      approverName,
    });
    logIntegrationEvent('info', requestId, 'integration_notification_succeeded', {
      recipientUserId: approverId,
      itemId,
    });
  } catch (error) {
    logIntegrationEvent('error', requestId, 'integration_notification_failed', {
      recipientUserId: approverId,
      itemId,
      errorCode: getErrorCode(error),
      errorMessage: error instanceof Error ? error.message : String(error),
    });
    sideEffectFailures.push({ operation: 'sendMondayNotification', errorCode: getErrorCode(error) });
  }

  for (const failure of sideEffectFailures) {
    logSideEffectFailure({
      operation: failure.operation,
      approvalId: result.approvalId,
      accountId,
      errorCode: failure.errorCode,
    });

    await queueSideEffectFailure(c.env, {
      key: `${failure.operation}:${result.approvalId}`,
      errorCode: failure.errorCode,
      payload: {
        operation: failure.operation,
        approvalId: result.approvalId,
        accountId,
        boardId,
        itemId,
      },
    });
  }

  logIntegrationEvent('info', requestId, 'integration_request_completed', {
    approvalId: result.approvalId,
    status: result.status,
    sideEffectFailures,
  });

  return c.json(
    {
      data: {
        id: result.approvalId,
        status: result.status,
        requestId,
      },
    },
    201,
  );
});

export default integrationsRoutes;
