import { Hono } from 'hono';
import type { Env } from '../types';
import { validateCreateApprovalPayload } from '../services/validation';
import { createApprovalRequest } from '../services/approvals';

const approvalsRoutes = new Hono<{ Bindings: Env }>();

approvalsRoutes.get('/', (c) => {
  return c.json({
    message: 'Approvals routes scaffolded',
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

export default approvalsRoutes;