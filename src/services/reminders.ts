import type { Env } from '../types';
import { sendMondayNotification } from './mondayNotifications';

interface PendingApprovalRow {
  id: string;
  monday_account_id: number;
  monday_item_id: number;
  requester_name: string;
  approver_id: number;
  approver_name: string;
  requested_at: string;
}

function hoursSince(timestamp: string): number {
  return (Date.now() - Date.parse(timestamp)) / (1000 * 60 * 60);
}

async function hasReminderEvent(db: D1Database, approvalId: string, action: 'reminded_24h' | 'reminded_48h'): Promise<boolean> {
  const row = await db
    .prepare(
      `SELECT id
       FROM audit_log
       WHERE approval_id = ? AND action = ?
       LIMIT 1`,
    )
    .bind(approvalId, action)
    .first<{ id: string }>();

  return Boolean(row?.id);
}

async function writeReminderAudit(db: D1Database, approvalId: string, action: 'reminded_24h' | 'reminded_48h'): Promise<void> {
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
      ) VALUES (?, ?, ?, 0, 'ApproveIt System', NULL, ?)`,
    )
    .bind(`aud_${crypto.randomUUID()}`, approvalId, action, new Date().toISOString())
    .run();
}

export async function runReminderSweep(env: Env): Promise<{ remindersSent: number; failures: number }> {
  const pending = await env.DB
    .prepare(
      `SELECT
        id,
        monday_account_id,
        monday_item_id,
        requester_name,
        approver_id,
        approver_name,
        requested_at
      FROM approvals
      WHERE status = 'pending'`,
    )
    .all<PendingApprovalRow>();

  let remindersSent = 0;
  let failures = 0;

  for (const approval of pending.results ?? []) {
    const elapsed = hoursSince(approval.requested_at);
    const reminderAction = elapsed >= 48 ? 'reminded_48h' : elapsed >= 24 ? 'reminded_24h' : null;

    if (!reminderAction) {
      continue;
    }

    const alreadySent = await hasReminderEvent(env.DB, approval.id, reminderAction);
    if (alreadySent) {
      continue;
    }

    try {
      await sendMondayNotification(env, {
        recipientUserId: approval.approver_id,
        targetItemId: approval.monday_item_id,
        template: reminderAction === 'reminded_48h' ? 'reminder_48h' : 'reminder_24h',
        requesterName: approval.requester_name,
        approverName: approval.approver_name,
      });

      await writeReminderAudit(env.DB, approval.id, reminderAction);
      remindersSent += 1;
    } catch {
      failures += 1;
      console.error(
        JSON.stringify({
          level: 'error',
          event: 'reminder_send_failed',
          approvalId: approval.id,
          accountId: approval.monday_account_id,
          reminderAction,
        }),
      );
    }
  }

  return {
    remindersSent,
    failures,
  };
}
