import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './types';
import approvalsRoutes from './routes/approvals';
import boardRoutes from './routes/boards';
import usageRoutes from './routes/usage';
import integrationsRoutes from './routes/integrations';
import { runReminderSweep } from './services/reminders';
import emailActionRoutes from './routes/emailActions';

const API_RATE_LIMIT_PER_MINUTE = 300;

const app = new Hono<{ Bindings: Env; Variables: { requestId: string } }>();

app.use(
  '/api/*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'x-monday-signature'],
    exposeHeaders: ['x-request-id'],
    maxAge: 86400,
  }),
);

app.use('*', async (c, next) => {
  const requestId = crypto.randomUUID();
  c.set('requestId', requestId);
  c.header('x-request-id', requestId);

  await next();
});

app.use('/api/*', async (c, next) => {
  const requestId = c.get('requestId');
  const ip = c.req.header('cf-connecting-ip') ?? c.req.header('x-forwarded-for') ?? 'unknown';
  const bucket = new Date().toISOString().slice(0, 16);
  const key = `rate:${ip}:${bucket}`;

  const currentRaw = await c.env.USAGE.get(key);
  const current = currentRaw ? Number(currentRaw) : 0;
  const nextCount = Number.isFinite(current) ? current + 1 : 1;

  await c.env.USAGE.put(key, String(nextCount), { expirationTtl: 120 });

  if (nextCount > API_RATE_LIMIT_PER_MINUTE) {
    return c.json(
      {
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many requests. Please retry shortly.',
        },
        requestId,
      },
      429,
    );
  }

  await next();
});

app.onError((error, c) => {
  const requestId = c.get('requestId');

  console.error(
    JSON.stringify({
      level: 'error',
      event: 'unhandled_error',
      requestId,
      path: c.req.path,
      method: c.req.method,
      message: error instanceof Error ? error.message : 'unknown_error',
    }),
  );

  return c.json(
    {
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred.',
      },
      requestId,
    },
    500,
  );
});

app.get('/health', (c) => {
  return c.json({ ok: true });
});

app.route('/api/approvals', approvalsRoutes);
app.route('/api/boards', boardRoutes);
app.route('/api/usage', usageRoutes);
app.route('/api/integrations', integrationsRoutes);
app.route('/api/email', emailActionRoutes);

const worker: ExportedHandler<Env> = {
  fetch: app.fetch,
  scheduled: (event, env, ctx) => {
    ctx.waitUntil(
      runReminderSweep(env).then((result) => {
        console.log(
          JSON.stringify({
            level: 'info',
            event: 'reminder_sweep_completed',
            scheduledTime: event.scheduledTime,
            remindersSent: result.remindersSent,
            failures: result.failures,
          }),
        );
      }),
    );
  },
};

export default worker;
