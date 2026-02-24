import { Hono } from 'hono';
import type { Env } from '../types';
import { getMonthlyUsage } from '../services/usage';

const usageRoutes = new Hono<{ Bindings: Env }>();

usageRoutes.get('/:accountId', async (c) => {
  const accountId = Number(c.req.param('accountId'));

  if (!Number.isInteger(accountId) || accountId <= 0) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'accountId must be a positive integer.',
        },
      },
      400,
    );
  }

  const usage = await getMonthlyUsage(c.env, accountId);

  return c.json({
    data: {
      accountId,
      periodKey: usage.key,
      count: usage.count,
      limit: usage.limit,
      remaining: Math.max(usage.limit - usage.count, 0),
    },
  });
});

export default usageRoutes;