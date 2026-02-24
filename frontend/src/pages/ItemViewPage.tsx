import { useEffect, useState } from 'react';
import { apiClient, type Approval, type AuditEvent, type CreateApprovalPayload } from '../api/client';
import { loadMondayContext, type MondayContext } from '../lib/monday';
import { ApprovalPanel } from '../components/ApprovalPanel';
import { RequestModal } from '../components/RequestModal';
import { ApprovalActions } from '../components/ApprovalActions';
import { AuditTrail } from '../components/AuditTrail';

export function ItemViewPage() {
  const [context, setContext] = useState<MondayContext | null>(null);
  const [approval, setApproval] = useState<Approval | null>(null);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [auditError, setAuditError] = useState<string | null>(null);

  const loadItemApproval = async (ctx: MondayContext) => {
    if (!ctx.accountId || !ctx.itemId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.listApprovals({ accountId: ctx.accountId, boardId: ctx.boardId });
      const itemApprovals = response.data
        .filter((entry) => entry.itemId === ctx.itemId)
        .sort((left, right) => Date.parse(right.requestedAt) - Date.parse(left.requestedAt));

      const latest = itemApprovals[0] ?? null;
      setApproval(latest);
      setError(null);

      if (latest) {
        const auditResponse = await apiClient.getAuditTimeline(latest.id, ctx.accountId);
        setAuditEvents(auditResponse.data.events);
        setAuditError(null);
      } else {
        setAuditEvents([]);
      }
    } catch {
      setError('Unable to load approvals for this item.');
      setAuditEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMondayContext().then((ctx) => {
      setContext(ctx);
      loadItemApproval(ctx).catch(() => setError('Unable to load approvals for this item.'));
    });
  }, []);

  const handleCreateApproval = async (payload: CreateApprovalPayload) => {
    setIsSubmitting(true);

    try {
      await apiClient.createApproval(payload);

      if (context) {
        await loadItemApproval(context);
      }
    } catch {
      setError('Unable to create approval request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTransition = async (action: 'approve' | 'reject' | 'changes', note?: string) => {
    if (!context?.accountId || !approval || !context.user?.id || !context.user?.name) {
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.transitionApproval(approval.id, action, {
        accountId: context.accountId,
        actorId: context.user.id,
        actorName: context.user.name,
        note,
      });

      await loadItemApproval(context);
    } catch {
      setError('Unable to update approval status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>ApproveIt Item View</h1>
      <p>Item ID: {context?.itemId ?? 'Unavailable'}</p>
      <p>Board ID: {context?.boardId ?? 'Unavailable'}</p>
      <ApprovalPanel approval={approval} isLoading={isLoading} error={error} />
      {context?.accountId && context.boardId && context.itemId && context.user?.id && context.user?.name && !approval && (
        <RequestModal
          accountId={context.accountId}
          boardId={context.boardId}
          itemId={context.itemId}
          requesterId={context.user.id}
          requesterName={context.user.name}
          isSubmitting={isSubmitting}
          onSubmit={handleCreateApproval}
        />
      )}
      {approval && context?.accountId && context.user?.id && context.user?.name && (
        <ApprovalActions
          approvalId={approval.id}
          accountId={context.accountId}
          actorId={context.user.id}
          actorName={context.user.name}
          disabled={isSubmitting}
          currentStatus={approval.status}
          onAction={handleTransition}
        />
      )}
      <AuditTrail events={auditEvents} isLoading={isLoading} error={auditError} />
    </main>
  );
}
