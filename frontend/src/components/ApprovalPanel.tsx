import type { Approval } from '../api/client';

interface ApprovalPanelProps {
  approval: Approval | null;
  isLoading: boolean;
  error: string | null;
}

export function ApprovalPanel({ approval, isLoading, error }: ApprovalPanelProps) {
  if (isLoading) {
    return <p>Loading approval details…</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!approval) {
    return <p>No approval exists for this item yet. Request approval to get started.</p>;
  }

  return (
    <section>
      <h2>Approval Status</h2>
      <p>Status: {approval.status}</p>
      <p>Requester: {approval.requesterName}</p>
      <p>Approver: {approval.approverName}</p>
      <p>Requested At: {new Date(approval.requestedAt).toLocaleString()}</p>
      <p>Requester Note: {approval.requesterNote ?? '—'}</p>
      <p>Approver Note: {approval.approverNote ?? '—'}</p>
    </section>
  );
}
