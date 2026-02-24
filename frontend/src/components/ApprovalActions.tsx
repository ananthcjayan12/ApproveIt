import { useState } from 'react';
import type { ApprovalStatus } from '../api/client';

interface ApprovalActionsProps {
  approvalId: string;
  accountId: number;
  actorId: number;
  actorName: string;
  disabled: boolean;
  onAction: (action: 'approve' | 'reject' | 'changes', note?: string) => Promise<void>;
  currentStatus: ApprovalStatus;
}

export function ApprovalActions({
  approvalId,
  accountId,
  actorId,
  actorName,
  disabled,
  onAction,
  currentStatus,
}: ApprovalActionsProps) {
  const [note, setNote] = useState('');

  if (currentStatus !== 'pending') {
    return <p>This approval is already closed.</p>;
  }

  return (
    <section>
      <h2>Approver Actions</h2>
      <p>Approval: {approvalId}</p>
      <p>Actor: {actorName} ({actorId}) · Account: {accountId}</p>
      <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Optional note" />
      <div>
        <button type="button" disabled={disabled} onClick={() => onAction('approve', note || undefined)}>
          Approve
        </button>
        <button type="button" disabled={disabled} onClick={() => onAction('reject', note || undefined)}>
          Reject
        </button>
        <button type="button" disabled={disabled} onClick={() => onAction('changes', note || undefined)}>
          Request Changes
        </button>
      </div>
    </section>
  );
}
