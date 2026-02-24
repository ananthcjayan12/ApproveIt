import { Hono } from 'hono';
import type { Env } from '../types';
import { validateCreateApprovalPayload } from '../services/validation';

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

  return c.json(
    {
      message: 'Approval payload validated. Persistence will be added in AP-005.',
      data: validation.data,
    },
    202,
  );
});

export default approvalsRoutes;