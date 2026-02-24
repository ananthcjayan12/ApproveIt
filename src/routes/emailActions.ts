import { Hono } from 'hono';
import type { Env } from '../types';
import { transitionApproval } from '../services/approvals';
import { createEmailActionToken, verifyEmailActionToken } from '../services/emailTokens';
import { updateMondayStatus } from '../services/mondayStatus';
import { sendMondayNotification } from '../services/mondayNotifications';
import { incrementResolvedUsage } from '../services/usage';

const emailActionRoutes = new Hono<{ Bindings: Env }>();

emailActionRoutes.post('/:approvalId/token', async (c) => {
  const approvalId = c.req.param('approvalId');
  const payload = await c.req.json().catch(() => null);

  if (!payload || typeof payload !== 'object') {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid token payload.',
        },
      },
      400,
    );
  }

  const input = payload as Record<string, unknown>;
  const accountId = Number(input.accountId);
  const actorId = Number(input.actorId);
  const actorName = typeof input.actorName === 'string' ? input.actorName.trim() : '';

  if (!Number.isInteger(accountId) || accountId <= 0 || !Number.isInteger(actorId) || actorId <= 0 || !actorName) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'accountId, actorId, and actorName are required.',
        },
      },
      400,
    );
  }

  const approveToken = await createEmailActionToken(c.env.MONDAY_SIGNING_SECRET, {
    approvalId,
    accountId,
    actorId,
    actorName,
    action: 'approve',
  });

  const rejectToken = await createEmailActionToken(c.env.MONDAY_SIGNING_SECRET, {
    approvalId,
    accountId,
    actorId,
    actorName,
    action: 'reject',
  });

  const changesToken = await createEmailActionToken(c.env.MONDAY_SIGNING_SECRET, {
    approvalId,
    accountId,
    actorId,
    actorName,
    action: 'changes',
  });

  return c.json({
    data: {
      approve: `/api/email/approve?token=${approveToken}`,
      reject: `/api/email/reject?token=${rejectToken}`,
      changes: `/api/email/changes?token=${changesToken}`,
    },
  });
});

emailActionRoutes.get('/:action', async (c) => {
  const action = c.req.param('action');
  const token = c.req.query('token');

  if (!token || (action !== 'approve' && action !== 'reject' && action !== 'changes')) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Missing token or invalid action.',
        },
      },
      400,
    );
  }

  const verified = await verifyEmailActionToken(c.env.MONDAY_SIGNING_SECRET, token);
  if (!verified.valid || verified.payload.action !== action) {
    return c.json(
      {
        error: {
          code: 'UNAUTHORIZED',
          message: 'Invalid or expired email action token.',
        },
      },
      401,
    );
  }

  const result = await transitionApproval(c.env.DB, verified.payload.approvalId, action, {
    accountId: verified.payload.accountId,
    actorId: verified.payload.actorId,
    actorName: verified.payload.actorName,
  });

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

  if (!result.ok && result.reason === 'already_closed') {
    return c.json(
      {
        error: {
          code: 'APPROVAL_ALREADY_CLOSED',
          message: 'Approval has already been resolved.',
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
          code: 'APPROVAL_TRANSITION_FAILED',
          message: 'Unable to apply approval action.',
        },
      },
      500,
    );
  }

  if (result.statusColumnId) {
    await updateMondayStatus(c.env, {
      boardId: result.boardId,
      itemId: result.itemId,
      statusColumnId: result.statusColumnId,
      status: result.status,
    }).catch(() => undefined);
  }

  await sendMondayNotification(c.env, {
    recipientUserId: result.requesterId,
    targetItemId: result.itemId,
    template: result.status,
    requesterName: result.requesterName,
    approverName: result.approverName,
  }).catch(() => undefined);

  await incrementResolvedUsage(c.env, result.accountId);

  return c.json({
    data: {
      id: result.approvalId,
      status: result.status,
      message: 'Email action applied successfully.',
    },
  });
});

export default emailActionRoutes;
