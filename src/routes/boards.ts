import { Hono } from 'hono';
import type { Env } from '../types';

const boardRoutes = new Hono<{ Bindings: Env }>();

boardRoutes.get('/:boardId/config', (c) => {
  return c.json({
    boardId: c.req.param('boardId'),
    message: 'Board config route scaffolded',
  });
});

export default boardRoutes;