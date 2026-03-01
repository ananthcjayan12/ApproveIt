import { Hono } from 'hono';
import type { Env } from '../types';
import { createApprovalRequest } from '../services/approvals';
import { getBoardConfig, getBoardConfigByBoardId } from '../services/boardConfigs';
import { checkFreeTierLimit } from '../services/usage';
import { verifyMondayJwt, verifyMondaySignature } from '../services/auth';
import { updateMondayStatus } from '../services/mondayStatus';
import { sendMondayNotification } from '../services/mondayNotifications';
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

function parseApprover(value: unknown): { id?: number; name?: string } {
  const record = asRecord(value);

  const directId = firstDefined(
    parsePositiveInt(value),
    parsePositiveInt(record.id),
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

function normalizeIntegrationInput(payload: Record<string, unknown>): {
  accountId?: number;
  boardId?: number;
  itemId?: number;
  requesterId?: number;
  requesterName?: string;
  approverId?: number;
  approverName?: string;
  statusColumnId?: string;
  triggerStatusColumnId?: string;
  note?: string;
} {
  const embeddedPayload = asRecord(payload.payload);
  const inbound = asRecord(firstDefined(embeddedPayload.inboundFieldValues, embeddedPayload.inputFields));
  const inputRoot = Object.keys(inbound).length > 0 ? inbound : payload;

  const approver = parseApprover(
    firstDefined(inputRoot.approver, inputRoot.approverId, inputRoot.person, inputRoot.people, inputRoot.user),
  );

  return {
    accountId: firstDefined(parsePositiveInt(inputRoot.accountId), parsePositiveInt(inputRoot.account_id)),
    boardId: firstDefined(parsePositiveInt(inputRoot.boardId), parsePositiveInt(inputRoot.board_id)),
    itemId: firstDefined(
      parsePositiveInt(inputRoot.itemId),
      parsePositiveInt(inputRoot.item_id),
      parsePositiveInt(inputRoot.pulseId),
    ),
    requesterId: firstDefined(
      parsePositiveInt(inputRoot.requesterId),
      parsePositiveInt(inputRoot.requester_id),
      parsePositiveInt(inputRoot.userId),
      parsePositiveInt(inputRoot.triggeredByUserId),
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

integrationsRoutes.post('/request-approval', async (c) => {
  const signature = c.req.header('x-monday-signature');
  const authorizationHeader = c.req.header('authorization');

  if (!signature && !authorizationHeader) {
    return c.json(
      {
        error: {
          code: 'UNAUTHORIZED',
          message: 'Missing monday signature header.',
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
    return c.json(
      {
        error: {
          code: 'UNAUTHORIZED',
          message: 'Invalid monday signature.',
        },
      },
      401,
    );
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody) as unknown;
  } catch {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Payload must be valid JSON.',
        },
      },
      400,
    );
  }

  if (!payload || typeof payload !== 'object') {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Payload must be a JSON object.',
        },
      },
      400,
    );
  }

  const rawPayload = payload as Record<string, unknown>;
  const input = normalizeIntegrationInput(rawPayload);
  console.log(
    JSON.stringify({
      level: 'info',
      event: 'integration_request_received',
      authMode: jwtClaims ? 'jwt' : hasValidHmacSignature ? 'hmac' : 'none',
      rawKeys: Object.keys(rawPayload),
      normalizedInput: input,
    }),
  );
  const boardId = input.boardId;
  const boardConfig = boardId ? await getBoardConfigByBoardId(c.env.DB, boardId) : null;
  const accountId = input.accountId ?? parsePositiveInt(jwtClaims?.accountId) ?? boardConfig?.accountId;
  const itemId = input.itemId;
  const requesterId = input.requesterId ?? parsePositiveInt(jwtClaims?.userId) ?? 0;
  const requesterName = input.requesterName ?? 'Automation';

  if (!accountId || !boardId || !itemId) {
    console.error(
      JSON.stringify({
        level: 'error',
        event: 'integration_payload_validation_failed',
        reason: 'missing_required_base_fields',
        normalizedInput: input,
        boardConfig,
      }),
    );
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'accountId, boardId, and itemId are required.',
        },
      },
      400,
    );
  }

  const usageLimit = await checkFreeTierLimit(c.env, accountId);
  if (!usageLimit.allowed) {
    return c.json(
      {
        error: {
          code: 'FREE_TIER_LIMIT_REACHED',
          message: `Monthly limit reached (${usageLimit.limit}). Upgrade required to continue.`,
        },
      },
      403,
    );
  }

  const approverId = input.approverId;
  const approverName = input.approverName ?? '';

  const config = boardConfig ?? await getBoardConfig(c.env.DB, boardId, accountId);
  const statusColumnId =
    typeof input.statusColumnId === 'string' && input.statusColumnId.trim()
      ? input.statusColumnId.trim()
      : (config?.statusColumnId ?? '');

  if (!statusColumnId) {
    return c.json(
      {
        error: {
          code: 'MISSING_STATUS_COLUMN',
          message: 'statusColumnId is missing in payload and board config.',
        },
      },
      400,
    );
  }

  if (!approverId || !approverName) {
    return c.json(
      {
        error: {
          code: 'MISSING_APPROVER',
          message: 'Recipe payload must include approverId and approverName.',
        },
      },
      400,
    );
  }

  const result = await createApprovalRequest(c.env.DB, {
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

  if (!result.ok && result.reason === 'duplicate_pending') {
    return c.json(
      {
        error: {
          code: 'DUPLICATE_PENDING_APPROVAL',
          message: 'A pending approval already exists for this item and approver.',
          details: [result.existingApprovalId],
        },
      },
      409,
    );
  }

  if (!result.ok) {
    return c.json(
      {
        error: {
          code: 'STORAGE_ERROR',
          message: 'Unable to create approval request.',
        },
      },
      500,
    );
  }

  const sideEffectFailures: Array<{ operation: string; errorCode: string }> = [];

  const shouldSkipStatusSync =
    input.triggerStatusColumnId !== undefined && input.triggerStatusColumnId === statusColumnId;

  if (shouldSkipStatusSync) {
    console.warn(
      JSON.stringify({
        level: 'warn',
        event: 'integration_status_sync_skipped',
        reason: 'trigger_and_tracking_columns_match',
        boardId,
        itemId,
        statusColumnId,
      }),
    );
  } else {
    try {
      await updateMondayStatus(c.env, {
        boardId,
        itemId,
        statusColumnId,
        status: 'pending',
      });
    } catch (error) {
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
  } catch (error) {
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

  return c.json(
    {
      data: {
        id: result.approvalId,
        status: result.status,
      },
    },
    201,
  );
});

export default integrationsRoutes;
