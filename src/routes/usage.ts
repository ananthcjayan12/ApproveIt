import { Hono } from 'hono';
import type { Env } from '../types';

const usageRoutes = new Hono<{ Bindings: Env }>();

usageRoutes.get('/:accountId', (c) => {
  return c.json({
    accountId: c.req.param('accountId'),
    message: 'Usage route scaffolded',
  });
});

export default usageRoutes;