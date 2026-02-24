import { Context, Hono } from 'hono';
import type { Env } from '../types';
import {
  validateCreateApprovalPayload,
  validateTransitionApprovalPayload,
} from '../services/validation';
import {
  createApprovalRequest,
  getApprovalAuditTimeline,
  listApprovals,
  transitionApproval,
  type TransitionAction,
} from '../services/approvals';
import { isApprovalStatus } from '../services/validation';
import { updateMondayStatus } from '../services/mondayStatus';
import { sendMondayNotification } from '../services/mondayNotifications';
import { MondayApiError } from '../services/mondayClient';
import { logSideEffectFailure, queueSideEffectFailure } from '../services/sideEffects';
import { checkFreeTierLimit, incrementResolvedUsage } from '../services/usage';

const approvalsRoutes = new Hono<{ Bindings: Env }>();

function parsePositiveInt(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}

function getErrorCode(error: unknown): string {
  if (error instanceof MondayApiError) {
    return error.code;
  }

  return 'UNKNOWN_ERROR';
}

async function runCreateSideEffects(c: Context<{ Bindings: Env }>, input: {
  approvalId: string;
  itemId: number;
  boardId: number;
  statusColumnId: string;
  accountId: number;
  requesterName: string;
  approverName: string;
  approverId: number;
}): Promise<void> {
  const sideEffectFailures: Array<{ operation: string; errorCode: string }> = [];

  try {
    await updateMondayStatus(c.env, {
      boardId: input.boardId,
      itemId: input.itemId,
      statusColumnId: input.statusColumnId,
      status: 'pending',
    });
  } catch (error) {
    sideEffectFailures.push({ operation: 'updateMondayStatus', errorCode: getErrorCode(error) });
  }

  try {
    await sendMondayNotification(c.env, {
      recipientUserId: input.approverId,
      targetItemId: input.itemId,
      template: 'requested',
      requesterName: input.requesterName,
      approverName: input.approverName,
    });
  } catch (error) {
    sideEffectFailures.push({ operation: 'sendMondayNotification', errorCode: getErrorCode(error) });
  }

  for (const failure of sideEffectFailures) {
    logSideEffectFailure({
      operation: failure.operation,
      approvalId: input.approvalId,
      accountId: input.accountId,
      errorCode: failure.errorCode,
    });

    await queueSideEffectFailure(c.env, {
      key: `${failure.operation}:${input.approvalId}`,
      errorCode: failure.errorCode,
      payload: {
        operation: failure.operation,
        approvalId: input.approvalId,
        accountId: input.accountId,
        boardId: input.boardId,
        itemId: input.itemId,
      },
    });
  }
}

async function runTransitionSideEffects(c: Context<{ Bindings: Env }>, input: {
  approvalId: string;
  status: 'approved' | 'rejected' | 'changes_requested';
  itemId: number;
  boardId: number;
  statusColumnId: string | null;
  requesterId: number;
  requesterName: string;
  approverName: string;
  accountId: number;
}): Promise<void> {
  const sideEffectFailures: Array<{ operation: string; errorCode: string }> = [];

  if (input.statusColumnId) {
    try {
      await updateMondayStatus(c.env, {
        boardId: input.boardId,
        itemId: input.itemId,
        statusColumnId: input.statusColumnId,
        status: input.status,
      });
    } catch (error) {
      sideEffectFailures.push({ operation: 'updateMondayStatus', errorCode: getErrorCode(error) });
    }
  }

  try {
    await sendMondayNotification(c.env, {
      recipientUserId: input.requesterId,
      targetItemId: input.itemId,
      template: input.status,
      requesterName: input.requesterName,
      approverName: input.approverName,
    });
  } catch (error) {
    sideEffectFailures.push({ operation: 'sendMondayNotification', errorCode: getErrorCode(error) });
  }

  for (const failure of sideEffectFailures) {
    logSideEffectFailure({
      operation: failure.operation,
      approvalId: input.approvalId,
      accountId: input.accountId,
      errorCode: failure.errorCode,
    });

    await queueSideEffectFailure(c.env, {
      key: `${failure.operation}:${input.approvalId}`,
      errorCode: failure.errorCode,
      payload: {
        operation: failure.operation,
        approvalId: input.approvalId,
        accountId: input.accountId,
        boardId: input.boardId,
        itemId: input.itemId,
        status: input.status,
      },
    });
  }
}

async function handleTransition(c: Context<{ Bindings: Env }>, action: TransitionAction) {
  const approvalId = c.req.param('id');
  const payload = await c.req.json().catch(() => null);
  const validation = validateTransitionApprovalPayload(payload);

  if (!validation.valid) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid approval transition payload.',
          details: validation.errors,
        },
      },
      400,
    );
  }

  const validatedData = validation.data;

  if (!validatedData) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid approval transition payload.',
          details: ['Payload validation failed.'],
        },
      },
      400,
    );
  }

  const usageLimit = await checkFreeTierLimit(c.env, validatedData.accountId);
  if (!usageLimit.allowed) {
    return c.json(
      {
        error: {
          code: 'FREE_TIER_LIMIT_REACHED',
          message: `Monthly limit reached (${usageLimit.limit}). Upgrade required to continue.`,
          details: [`current=${usageLimit.count}`],
        },
      },
      403,
    );
  }

  const result = await transitionApproval(c.env.DB, approvalId, action, validatedData);

  if (!result.ok && result.reason === 'not_found') {
    return c.json(
      {
        error: {
          code: 'APPROVAL_NOT_FOUND',
          message: 'Approval not found.',
        },
      },
      404,
    );
  }

  if (!result.ok && result.reason === 'forbidden_actor') {
    return c.json(
      {
        error: {
          code: 'FORBIDDEN_APPROVER_ACTION',
          message: 'Only the assigned approver can perform this action.',
        },
      },
      403,
    );
  }

  if (!result.ok && result.reason === 'already_closed') {
    return c.json(
      {
        error: {
          code: 'APPROVAL_ALREADY_CLOSED',
          message: 'Closed approvals cannot transition again.',
          details: [result.currentStatus],
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
          message: 'Unable to update approval at this time.',
        },
      },
      500,
    );
  }

  await runTransitionSideEffects(c, {
    approvalId: result.approvalId,
    status: result.status,
    itemId: result.itemId,
    boardId: result.boardId,
    statusColumnId: result.statusColumnId,
    requesterId: result.requesterId,
    requesterName: result.requesterName,
    approverName: result.approverName,
    accountId: result.accountId,
  });

  await incrementResolvedUsage(c.env, result.accountId);

  return c.json(
    {
      message: 'Approval updated successfully.',
      data: {
        id: result.approvalId,
        status: result.status,
      },
    },
    200,
  );
}

approvalsRoutes.get('/', (c) => {
  const accountIdRaw = c.req.query('accountId');
  const boardIdRaw = c.req.query('boardId');
  const approverIdRaw = c.req.query('approverId');
  const statusRaw = c.req.query('status');
  const limitRaw = c.req.query('limit');
  const offsetRaw = c.req.query('offset');

  const accountId = parsePositiveInt(accountIdRaw);
  const boardId = parsePositiveInt(boardIdRaw);
  const approverId = parsePositiveInt(approverIdRaw);
  const parsedLimit = limitRaw ? Number(limitRaw) : 25;
  const parsedOffset = offsetRaw ? Number(offsetRaw) : 0;

  const errors: string[] = [];

  if (!accountId) {
    errors.push('accountId must be a positive integer query parameter.');
  }

  if (!boardId && !approverId) {
    errors.push('At least one filter is required: boardId or approverId.');
  }

  if (boardIdRaw && !boardId) {
    errors.push('boardId must be a positive integer when provided.');
  }

  if (approverIdRaw && !approverId) {
    errors.push('approverId must be a positive integer when provided.');
  }

  if (statusRaw && !isApprovalStatus(statusRaw)) {
    errors.push('status must be one of pending, approved, rejected, changes_requested.');
  }

  if (!Number.isInteger(parsedLimit) || parsedLimit <= 0 || parsedLimit > 100) {
    errors.push('limit must be an integer between 1 and 100.');
  }

  if (!Number.isInteger(parsedOffset) || parsedOffset < 0) {
    errors.push('offset must be an integer greater than or equal to 0.');
  }

  if (errors.length > 0) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid approvals query parameters.',
          details: errors,
        },
      },
      400,
    );
  }

  const status = statusRaw && isApprovalStatus(statusRaw) ? statusRaw : undefined;

  return listApprovals(c.env.DB, {
    accountId: accountId as number,
    boardId,
    approverId,
    status,
    limit: parsedLimit,
    offset: parsedOffset,
  })
    .then((result) => {
      return c.json({
        data: result.rows,
        pagination: {
          limit: parsedLimit,
          offset: parsedOffset,
          hasMore: result.hasMore,
          nextOffset: result.nextOffset,
        },
      });
    })
    .catch(() => {
      return c.json(
        {
          error: {
            code: 'STORAGE_ERROR',
            message: 'Unable to fetch approvals at this time.',
          },
        },
        500,
      );
    });
});

approvalsRoutes.post('/', async (c) => {
  const payload = await c.req.json().catch(() => null);
  const validation = validateCreateApprovalPayload(payload);

  if (!validation.valid) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid approval request payload.',
          details: validation.errors,
        },
      },
      400,
    );
  }

  const validatedData = validation.data;

  if (!validatedData) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid approval request payload.',
          details: ['Payload validation failed.'],
        },
      },
      400,
    );
  }

  const usageLimit = await checkFreeTierLimit(c.env, validatedData.accountId);
  if (!usageLimit.allowed) {
    return c.json(
      {
        error: {
          code: 'FREE_TIER_LIMIT_REACHED',
          message: `Monthly limit reached (${usageLimit.limit}). Upgrade required to continue.`,
          details: [`current=${usageLimit.count}`],
        },
      },
      403,
    );
  }

  const result = await createApprovalRequest(c.env.DB, validatedData);

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
          message: 'Unable to create approval request at this time.',
        },
      },
      500,
    );
  }

  await runCreateSideEffects(c, {
    approvalId: result.approvalId,
    itemId: validatedData.itemId,
    boardId: validatedData.boardId,
    statusColumnId: validatedData.statusColumnId,
    accountId: validatedData.accountId,
    requesterName: validatedData.requesterName,
    approverName: validatedData.approverName,
    approverId: validatedData.approverId,
  });

  return c.json(
    {
      message: 'Approval request created successfully.',
      data: {
        id: result.approvalId,
        status: result.status,
      },
    },
    201,
  );
});

approvalsRoutes.patch('/:id/approve', async (c) => {
  return handleTransition(c, 'approve');
});

approvalsRoutes.patch('/:id/reject', async (c) => {
  return handleTransition(c, 'reject');
});

approvalsRoutes.patch('/:id/changes', async (c) => {
  return handleTransition(c, 'changes');
});

approvalsRoutes.get('/:id/audit', async (c) => {
  const accountIdRaw = c.req.query('accountId');
  const accountId = parsePositiveInt(accountIdRaw);

  if (!accountId) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid audit query parameters.',
          details: ['accountId must be a positive integer query parameter.'],
        },
      },
      400,
    );
  }

  const approvalId = c.req.param('id');

  try {
    const audit = await getApprovalAuditTimeline(c.env.DB, approvalId, accountId);

    if (!audit.found) {
      return c.json(
        {
          error: {
            code: 'APPROVAL_NOT_FOUND',
            message: 'Approval not found.',
          },
        },
        404,
      );
    }

    return c.json({
      data: {
        approvalId,
        events: audit.events,
      },
    });
  } catch {
    return c.json(
      {
        error: {
          code: 'STORAGE_ERROR',
          message: 'Unable to fetch approval audit timeline at this time.',
        },
      },
      500,
    );
  }
});

export default approvalsRoutes;