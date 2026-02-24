import { useState } from 'react';
import type { CreateApprovalPayload } from '../api/client';

interface RequestModalProps {
  accountId: number;
  boardId: number;
  itemId: number;
  requesterId: number;
  requesterName: string;
  isSubmitting: boolean;
  onSubmit: (payload: CreateApprovalPayload) => Promise<void>;
}

export function RequestModal({
  accountId,
  boardId,
  itemId,
  requesterId,
  requesterName,
  isSubmitting,
  onSubmit,
}: RequestModalProps) {
  const [approverId, setApproverId] = useState('');
  const [approverName, setApproverName] = useState('');
  const [statusColumnId, setStatusColumnId] = useState('status');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    const parsedApproverId = Number(approverId);

    if (!Number.isInteger(parsedApproverId) || parsedApproverId <= 0) {
      setError('Approver ID must be a positive integer.');
      return;
    }

    if (!approverName.trim()) {
      setError('Approver name is required.');
      return;
    }

    if (!statusColumnId.trim()) {
      setError('Status column ID is required.');
      return;
    }

    setError(null);

    await onSubmit({
      accountId,
      boardId,
      itemId,
      requesterId,
      requesterName,
      approverId: parsedApproverId,
      approverName: approverName.trim(),
      statusColumnId: statusColumnId.trim(),
      note: note.trim() || undefined,
    });
  };

  return (
    <section>
      <h2>Request Approval</h2>
      <label>
        Approver ID
        <input value={approverId} onChange={(event) => setApproverId(event.target.value)} />
      </label>
      <label>
        Approver Name
        <input value={approverName} onChange={(event) => setApproverName(event.target.value)} />
      </label>
      <label>
        Status Column ID
        <input value={statusColumnId} onChange={(event) => setStatusColumnId(event.target.value)} />
      </label>
      <label>
        Note (optional)
        <textarea value={note} onChange={(event) => setNote(event.target.value)} />
      </label>
      {error && <p>{error}</p>}
      <button type="button" onClick={submit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Request Approval'}
      </button>
    </section>
  );
}
