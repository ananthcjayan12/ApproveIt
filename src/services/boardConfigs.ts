interface BoardConfigRow {
  id: string;
  monday_board_id: number;
  monday_account_id: number;
  status_column_id: string | null;
  default_approver_column: string | null;
  reminder_hours: number;
  created_at: string;
}

export interface BoardConfig {
  id: string;
  boardId: number;
  accountId: number;
  statusColumnId: string | null;
  defaultApproverColumn: string | null;
  reminderHours: number;
  createdAt: string;
}

export interface UpsertBoardConfigInput {
  boardId: number;
  accountId: number;
  statusColumnId: string;
  defaultApproverColumn: string;
  reminderHours: number;
}

function mapBoardConfig(row: BoardConfigRow): BoardConfig {
  return {
    id: row.id,
    boardId: row.monday_board_id,
    accountId: row.monday_account_id,
    statusColumnId: row.status_column_id,
    defaultApproverColumn: row.default_approver_column,
    reminderHours: row.reminder_hours,
    createdAt: row.created_at,
  };
}

function generateId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

export async function getBoardConfig(
  db: D1Database,
  boardId: number,
  accountId: number,
): Promise<BoardConfig | null> {
  const row = await db
    .prepare(
      `SELECT id, monday_board_id, monday_account_id, status_column_id, default_approver_column, reminder_hours, created_at
       FROM board_configs
       WHERE monday_board_id = ? AND monday_account_id = ?
       LIMIT 1`,
    )
    .bind(boardId, accountId)
    .first<BoardConfigRow>();

  return row ? mapBoardConfig(row) : null;
}

export async function getBoardConfigByBoardId(db: D1Database, boardId: number): Promise<BoardConfig | null> {
  const row = await db
    .prepare(
      `SELECT id, monday_board_id, monday_account_id, status_column_id, default_approver_column, reminder_hours, created_at
       FROM board_configs
       WHERE monday_board_id = ?
       LIMIT 1`,
    )
    .bind(boardId)
    .first<BoardConfigRow>();

  return row ? mapBoardConfig(row) : null;
}

export async function upsertBoardConfig(db: D1Database, input: UpsertBoardConfigInput): Promise<BoardConfig> {
  const existing = await db
    .prepare(
      `SELECT id
       FROM board_configs
       WHERE monday_board_id = ? AND monday_account_id = ?
       LIMIT 1`,
    )
    .bind(input.boardId, input.accountId)
    .first<{ id: string }>();

  const id = existing?.id ?? generateId('cfg');

  await db
    .prepare(
      `INSERT INTO board_configs (
        id,
        monday_board_id,
        monday_account_id,
        status_column_id,
        default_approver_column,
        reminder_hours,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(monday_board_id) DO UPDATE SET
        monday_account_id = excluded.monday_account_id,
        status_column_id = excluded.status_column_id,
        default_approver_column = excluded.default_approver_column,
        reminder_hours = excluded.reminder_hours`,
    )
    .bind(
      id,
      input.boardId,
      input.accountId,
      input.statusColumnId,
      input.defaultApproverColumn,
      input.reminderHours,
      new Date().toISOString(),
    )
    .run();

  const config = await getBoardConfig(db, input.boardId, input.accountId);

  if (!config) {
    throw new Error('Failed to load board config after upsert.');
  }

  return config;
}
