import type { ApprovalStatus, CreateApprovalRequest, TransitionApprovalRequest } from '../types';

export interface CreateApprovalSuccess {
  ok: true;
  approvalId: string;
  status: 'pending';
}

export interface CreateApprovalDuplicate {
  ok: false;
  reason: 'duplicate_pending';
  existingApprovalId: string;
}

export interface CreateApprovalFailure {
  ok: false;
  reason: 'storage_error';
}

export type CreateApprovalResult =
  | CreateApprovalSuccess
  | CreateApprovalDuplicate
  | CreateApprovalFailure;

export type TransitionAction = 'approve' | 'reject' | 'changes';

interface ApprovalRecord {
  id: string;
  status: ApprovalStatus;
  monday_account_id: number;
  monday_item_id: number;
  monday_board_id: number;
  status_column_id: string | null;
  requester_id: number;
  requester_name: string;
  approver_id: number;
  approver_name: string;
}

export interface TransitionApprovalSuccess {
  ok: true;
  approvalId: string;
  status: Exclude<ApprovalStatus, 'pending'>;
  itemId: number;
  boardId: number;
  statusColumnId: string | null;
  requesterId: number;
  requesterName: string;
  approverId: number;
  approverName: string;
  accountId: number;
}

export interface TransitionApprovalNotFound {
  ok: false;
  reason: 'not_found';
}

export interface TransitionApprovalForbidden {
  ok: false;
  reason: 'forbidden_actor';
}

export interface TransitionApprovalClosed {
  ok: false;
  reason: 'already_closed';
  currentStatus: ApprovalStatus;
}

export interface TransitionApprovalFailure {
  ok: false;
  reason: 'storage_error';
}

export type TransitionApprovalResult =
  | TransitionApprovalSuccess
  | TransitionApprovalNotFound
  | TransitionApprovalForbidden
  | TransitionApprovalClosed
  | TransitionApprovalFailure;

export interface ListApprovalsQuery {
  accountId: number;
  boardId?: number;
  approverId?: number;
  status?: ApprovalStatus;
  limit: number;
  offset: number;
}

export interface ApprovalListItem {
  id: string;
  itemId: number;
  boardId: number;
  accountId: number;
  requesterId: number;
  requesterName: string;
  approverId: number;
  approverName: string;
  status: ApprovalStatus;
  requesterNote: string | null;
  approverNote: string | null;
  statusColumnId: string | null;
  requestedAt: string;
  resolvedAt: string | null;
  createdAt: string;
}

interface ApprovalListRow {
  id: string;
  monday_item_id: number;
  monday_board_id: number;
  monday_account_id: number;
  requester_id: number;
  requester_name: string;
  approver_id: number;
  approver_name: string;
  status: ApprovalStatus;
  requester_note: string | null;
  approver_note: string | null;
  status_column_id: string | null;
  requested_at: string;
  resolved_at: string | null;
  created_at: string;
}

interface AuditLogRow {
  id: string;
  action: string;
  actor_id: number;
  actor_name: string;
  note: string | null;
  timestamp: string;
}

export interface ApprovalAuditEvent {
  id: string;
  action: string;
  actorId: number;
  actorName: string;
  note: string | null;
  timestamp: string;
}

function mapActionToStatus(action: TransitionAction): Exclude<ApprovalStatus, 'pending'> {
  if (action === 'approve') {
    return 'approved';
  }

  if (action === 'reject') {
    return 'rejected';
  }

  return 'changes_requested';
}

function generateId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

export async function createApprovalRequest(
  db: D1Database,
  payload: CreateApprovalRequest,
): Promise<CreateApprovalResult> {
  const existingPending = await db
    .prepare(
      `SELECT id
       FROM approvals
       WHERE monday_item_id = ?
         AND monday_board_id = ?
         AND monday_account_id = ?
         AND approver_id = ?
         AND status = 'pending'
       LIMIT 1`,
    )
    .bind(payload.itemId, payload.boardId, payload.accountId, payload.approverId)
    .first<{ id: string }>();

  if (existingPending?.id) {
    return {
      ok: false,
      reason: 'duplicate_pending',
      existingApprovalId: existingPending.id,
    };
  }

  const approvalId = generateId('apr');
  const auditId = generateId('aud');
  const nowIso = new Date().toISOString();

  try {
    await db
      .prepare(
        `INSERT INTO approvals (
          id,
          monday_item_id,
          monday_board_id,
          monday_account_id,
          requester_id,
          requester_name,
          approver_id,
          approver_name,
          status,
          requester_note,
          status_column_id,
          requested_at,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)` ,
      )
      .bind(
        approvalId,
        payload.itemId,
        payload.boardId,
        payload.accountId,
        payload.requesterId,
        payload.requesterName,
        payload.approverId,
        payload.approverName,
        payload.note ?? null,
        payload.statusColumnId,
        nowIso,
        nowIso,
      )
      .run();

    await db
      .prepare(
        `INSERT INTO audit_log (
          id,
          approval_id,
          action,
          actor_id,
          actor_name,
          note,
          timestamp
        ) VALUES (?, ?, 'requested', ?, ?, ?, ?)`,
      )
      .bind(auditId, approvalId, payload.requesterId, payload.requesterName, payload.note ?? null, nowIso)
      .run();

    return {
      ok: true,
      approvalId,
      status: 'pending',
    };
  } catch {
    await db.prepare('DELETE FROM approvals WHERE id = ?').bind(approvalId).run().catch(() => undefined);

    return {
      ok: false,
      reason: 'storage_error',
    };
  }
}

export async function transitionApproval(
  db: D1Database,
  approvalId: string,
  action: TransitionAction,
  payload: TransitionApprovalRequest,
): Promise<TransitionApprovalResult> {
  const existing = await db
    .prepare(
      `SELECT
         id,
         status,
         monday_account_id,
         monday_item_id,
         monday_board_id,
         status_column_id,
         requester_id,
         requester_name,
         approver_id,
         approver_name
       FROM approvals
       WHERE id = ?
       LIMIT 1`,
    )
    .bind(approvalId)
    .first<ApprovalRecord>();

  if (!existing || existing.monday_account_id !== payload.accountId) {
    return { ok: false, reason: 'not_found' };
  }

  if (existing.approver_id !== payload.actorId) {
    return { ok: false, reason: 'forbidden_actor' };
  }

  if (existing.status !== 'pending') {
    return {
      ok: false,
      reason: 'already_closed',
      currentStatus: existing.status,
    };
  }

  const nextStatus = mapActionToStatus(action);
  const auditId = generateId('aud');
  const nowIso = new Date().toISOString();

  try {
    const updateResult = await db
      .prepare(
        `UPDATE approvals
         SET status = ?, approver_note = ?, resolved_at = ?
         WHERE id = ? AND status = 'pending'`,
      )
      .bind(nextStatus, payload.note ?? null, nowIso, approvalId)
      .run();

    if ((updateResult.meta.changes ?? 0) === 0) {
      return {
        ok: false,
        reason: 'already_closed',
        currentStatus: existing.status,
      };
    }

    await db
      .prepare(
        `INSERT INTO audit_log (
          id,
          approval_id,
          action,
          actor_id,
          actor_name,
          note,
          timestamp
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(auditId, approvalId, nextStatus, payload.actorId, payload.actorName, payload.note ?? null, nowIso)
      .run();

    return {
      ok: true,
      approvalId,
      status: nextStatus,
      itemId: existing.monday_item_id,
      boardId: existing.monday_board_id,
      statusColumnId: existing.status_column_id,
      requesterId: existing.requester_id,
      requesterName: existing.requester_name,
      approverId: existing.approver_id,
      approverName: existing.approver_name,
      accountId: existing.monday_account_id,
    };
  } catch {
    return {
      ok: false,
      reason: 'storage_error',
    };
  }
}

export async function listApprovals(
  db: D1Database,
  query: ListApprovalsQuery,
): Promise<{ rows: ApprovalListItem[]; hasMore: boolean; nextOffset: number | null }> {
  const whereClauses: string[] = ['monday_account_id = ?'];
  const params: Array<number | string> = [query.accountId];

  if (query.boardId !== undefined) {
    whereClauses.push('monday_board_id = ?');
    params.push(query.boardId);
  }

  if (query.approverId !== undefined) {
    whereClauses.push('approver_id = ?');
    params.push(query.approverId);
  }

  if (query.status !== undefined) {
    whereClauses.push('status = ?');
    params.push(query.status);
  }

  const sql = `SELECT
      id,
      monday_item_id,
      monday_board_id,
      monday_account_id,
      requester_id,
      requester_name,
      approver_id,
      approver_name,
      status,
      requester_note,
      approver_note,
      status_column_id,
      requested_at,
      resolved_at,
      created_at
    FROM approvals
    WHERE ${whereClauses.join(' AND ')}
    ORDER BY requested_at DESC
    LIMIT ? OFFSET ?`;

  const limitPlusOne = query.limit + 1;
  const result = await db
    .prepare(sql)
    .bind(...params, limitPlusOne, query.offset)
    .all<ApprovalListRow>();

  const rawRows = result.results ?? [];
  const hasMore = rawRows.length > query.limit;
  const rows = rawRows.slice(0, query.limit).map((row) => ({
    id: row.id,
    itemId: row.monday_item_id,
    boardId: row.monday_board_id,
    accountId: row.monday_account_id,
    requesterId: row.requester_id,
    requesterName: row.requester_name,
    approverId: row.approver_id,
    approverName: row.approver_name,
    status: row.status,
    requesterNote: row.requester_note,
    approverNote: row.approver_note,
    statusColumnId: row.status_column_id,
    requestedAt: row.requested_at,
    resolvedAt: row.resolved_at,
    createdAt: row.created_at,
  }));

  return {
    rows,
    hasMore,
    nextOffset: hasMore ? query.offset + query.limit : null,
  };
}

export async function getApprovalAuditTimeline(
  db: D1Database,
  approvalId: string,
  accountId: number,
): Promise<{ found: boolean; events: ApprovalAuditEvent[] }> {
  const approval = await db
    .prepare(
      `SELECT id
       FROM approvals
       WHERE id = ? AND monday_account_id = ?
       LIMIT 1`,
    )
    .bind(approvalId, accountId)
    .first<{ id: string }>();

  if (!approval) {
    return { found: false, events: [] };
  }

  const eventsResult = await db
    .prepare(
      `SELECT id, action, actor_id, actor_name, note, timestamp
       FROM audit_log
       WHERE approval_id = ?
       ORDER BY timestamp ASC`,
    )
    .bind(approvalId)
    .all<AuditLogRow>();

  const events = (eventsResult.results ?? []).map((event) => ({
    id: event.id,
    action: event.action,
    actorId: event.actor_id,
    actorName: event.actor_name,
    note: event.note,
    timestamp: event.timestamp,
  }));

  return {
    found: true,
    events,
  };
}
