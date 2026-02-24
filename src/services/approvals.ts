import type { CreateApprovalRequest } from '../types';

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
