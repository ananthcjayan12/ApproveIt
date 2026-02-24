import { Hono } from 'hono';
import type { Env } from '../types';
import { createApprovalRequest } from '../services/approvals';
import { getBoardConfig } from '../services/boardConfigs';
import { checkFreeTierLimit } from '../services/usage';
import { verifyMondaySignature } from '../services/auth';

const integrationsRoutes = new Hono<{ Bindings: Env }>();

function parsePositiveInt(value: unknown): number | undefined {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}

integrationsRoutes.post('/request-approval', async (c) => {
  const signature = c.req.header('x-monday-signature') ?? c.req.header('authorization');

  if (!signature) {
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

  const rawPayload = await c.req.text();

  const isValidSignature = await verifyMondaySignature({
    secret: c.env.MONDAY_SIGNING_SECRET,
    payload: rawPayload,
    providedSignature: signature,
  });

  if (!isValidSignature) {
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
    payload = JSON.parse(rawPayload) as unknown;
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

  const input = payload as Record<string, unknown>;
  const accountId = parsePositiveInt(input.accountId);
  const boardId = parsePositiveInt(input.boardId);
  const itemId = parsePositiveInt(input.itemId);
  const requesterId = parsePositiveInt(input.requesterId);
  const requesterName = typeof input.requesterName === 'string' ? input.requesterName.trim() : '';

  if (!accountId || !boardId || !itemId || !requesterId || !requesterName) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'accountId, boardId, itemId, requesterId, requesterName are required.',
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

  const approverId = parsePositiveInt(input.approverId);
  const approverName = typeof input.approverName === 'string' ? input.approverName.trim() : '';

  const config = await getBoardConfig(c.env.DB, boardId, accountId);
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
    note: typeof input.note === 'string' ? input.note : undefined,
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
