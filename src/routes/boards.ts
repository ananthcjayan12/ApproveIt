import { Hono } from 'hono';
import type { Env } from '../types';
import { getBoardConfig, upsertBoardConfig } from '../services/boardConfigs';

const boardRoutes = new Hono<{ Bindings: Env }>();

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

function isColumnId(value: string): boolean {
  return /^[a-zA-Z0-9_]+$/.test(value);
}

boardRoutes.get('/:boardId/config', async (c) => {
  const boardId = parsePositiveInt(c.req.param('boardId'));
  const accountId = parsePositiveInt(c.req.query('accountId'));

  if (!boardId || !accountId) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'boardId and accountId must be positive integers.',
        },
      },
      400,
    );
  }

  const config = await getBoardConfig(c.env.DB, boardId, accountId);

  return c.json({
    data: config,
  });
});

boardRoutes.put('/:boardId/config', async (c) => {
  const boardId = parsePositiveInt(c.req.param('boardId'));
  const payload = await c.req.json().catch(() => null);

  if (!boardId || !payload || typeof payload !== 'object') {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid board config payload.',
        },
      },
      400,
    );
  }

  const input = payload as Record<string, unknown>;
  const accountId = parsePositiveInt(String(input.accountId ?? ''));
  const statusColumnId = typeof input.statusColumnId === 'string' ? input.statusColumnId.trim() : '';
  const defaultApproverColumn =
    typeof input.defaultApproverColumn === 'string' ? input.defaultApproverColumn.trim() : '';
  const reminderHours = Number(input.reminderHours);

  const errors: string[] = [];

  if (!accountId) {
    errors.push('accountId must be a positive integer.');
  }

  if (!statusColumnId || !isColumnId(statusColumnId)) {
    errors.push('statusColumnId must match /^[a-zA-Z0-9_]+$/.');
  }

  if (!defaultApproverColumn || !isColumnId(defaultApproverColumn)) {
    errors.push('defaultApproverColumn must match /^[a-zA-Z0-9_]+$/.');
  }

  if (!Number.isInteger(reminderHours) || reminderHours < 1 || reminderHours > 168) {
    errors.push('reminderHours must be an integer between 1 and 168.');
  }

  if (errors.length > 0) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid board config payload.',
          details: errors,
        },
      },
      400,
    );
  }

  try {
    const config = await upsertBoardConfig(c.env.DB, {
      boardId,
      accountId: accountId as number,
      statusColumnId,
      defaultApproverColumn,
      reminderHours,
    });

    return c.json({
      data: config,
    });
  } catch {
    return c.json(
      {
        error: {
          code: 'STORAGE_ERROR',
          message: 'Unable to save board config.',
        },
      },
      500,
    );
  }
});

export default boardRoutes;