import { Hono } from 'hono';
import type { Env } from './types';
import approvalsRoutes from './routes/approvals';
import boardRoutes from './routes/boards';
import usageRoutes from './routes/usage';

const app = new Hono<{ Bindings: Env }>();

app.get('/health', (c) => {
  return c.json({ ok: true });
});

app.route('/api/approvals', approvalsRoutes);
app.route('/api/boards', boardRoutes);
app.route('/api/usage', usageRoutes);

export default app;