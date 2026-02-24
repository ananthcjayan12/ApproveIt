import { useEffect, useState } from 'react';
import { apiClient, type Approval } from '../api/client';
import { loadMondayContext, type MondayContext } from '../lib/monday';

export function BoardViewPage() {
  const [context, setContext] = useState<MondayContext | null>(null);
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showMine, setShowMine] = useState(false);
  const [statusColumnId, setStatusColumnId] = useState('status');
  const [defaultApproverColumn, setDefaultApproverColumn] = useState('person');
  const [reminderHours, setReminderHours] = useState('24');
  const [configMessage, setConfigMessage] = useState<string | null>(null);

  const now = Date.now();

  const filteredApprovals = showMine && context?.user?.id
    ? approvals.filter((approval) => approval.approverId === context.user?.id)
    : approvals;

  const pending = filteredApprovals.filter((approval) => approval.status === 'pending');
  const recentApproved = filteredApprovals
    .filter((approval) => approval.status === 'approved')
    .sort((left, right) => Date.parse(right.requestedAt) - Date.parse(left.requestedAt))
    .slice(0, 10);
  const recentRejected = filteredApprovals
    .filter((approval) => approval.status === 'rejected')
    .sort((left, right) => Date.parse(right.requestedAt) - Date.parse(left.requestedAt))
    .slice(0, 10);

  const isOverdue = (approval: Approval) => {
    return approval.status === 'pending' && now - Date.parse(approval.requestedAt) > 24 * 60 * 60 * 1000;
  };

  useEffect(() => {
    loadMondayContext().then((ctx) => {
      setContext(ctx);

      if (!ctx.accountId || !ctx.boardId) {
        return;
      }

      apiClient
        .listApprovals({ accountId: ctx.accountId, boardId: ctx.boardId })
        .then((response) => setApprovals(response.data))
        .catch(() => setError('Unable to load approvals for this board.'));

      apiClient
        .getBoardConfig(ctx.boardId, ctx.accountId)
        .then((response) => {
          if (!response.data) {
            return;
          }

          setStatusColumnId(response.data.statusColumnId ?? 'status');
          setDefaultApproverColumn(response.data.defaultApproverColumn ?? 'person');
          setReminderHours(String(response.data.reminderHours));
        })
        .catch(() => setConfigMessage('Unable to load board settings.'));
    });
  }, []);

  const saveConfig = async () => {
    if (!context?.accountId || !context.boardId) {
      return;
    }

    if (!statusColumnId.trim() || !defaultApproverColumn.trim()) {
      setConfigMessage('Status and approver column IDs are required.');
      return;
    }

    const parsedReminderHours = Number(reminderHours);
    if (!Number.isInteger(parsedReminderHours) || parsedReminderHours < 1 || parsedReminderHours > 168) {
      setConfigMessage('Reminder hours must be an integer between 1 and 168.');
      return;
    }

    try {
      await apiClient.saveBoardConfig(context.boardId, {
        accountId: context.accountId,
        statusColumnId: statusColumnId.trim(),
        defaultApproverColumn: defaultApproverColumn.trim(),
        reminderHours: parsedReminderHours,
      });

      setConfigMessage('Board settings saved.');
    } catch {
      setConfigMessage('Unable to save board settings.');
    }
  };

  return (
    <main>
      <h1>ApproveIt Board View</h1>
      <p>Board ID: {context?.boardId ?? 'Unavailable'}</p>
      <section>
        <h2>Board Settings</h2>
        <label>
          Status Column ID
          <input value={statusColumnId} onChange={(event) => setStatusColumnId(event.target.value)} />
        </label>
        <label>
          Default Approver Column
          <input value={defaultApproverColumn} onChange={(event) => setDefaultApproverColumn(event.target.value)} />
        </label>
        <label>
          Reminder Hours
          <input value={reminderHours} onChange={(event) => setReminderHours(event.target.value)} />
        </label>
        <button type="button" onClick={saveConfig}>
          Save Board Settings
        </button>
        {configMessage && <p>{configMessage}</p>}
      </section>
      <label>
        <input
          type="checkbox"
          checked={showMine}
          onChange={(event) => setShowMine(event.target.checked)}
        />
        My Approvals ({context?.user?.id ? approvals.filter((approval) => approval.approverId === context.user?.id).length : 0})
      </label>
      {error && <p>{error}</p>}
      {!error && filteredApprovals.length === 0 && <p>No approvals found for this board.</p>}
      {filteredApprovals.length > 0 && (
        <>
          <section>
            <h2>Pending</h2>
            {pending.length === 0 && <p>No pending approvals.</p>}
            {pending.length > 0 && (
              <ul>
                {pending.map((approval) => (
                  <li key={approval.id}>
                    item {approval.itemId} · approver: {approval.approverName}
                    {isOverdue(approval) ? ' · OVERDUE' : ''}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h2>Recently Approved</h2>
            {recentApproved.length === 0 && <p>No recent approved approvals.</p>}
            {recentApproved.length > 0 && (
              <ul>
                {recentApproved.map((approval) => (
                  <li key={approval.id}>item {approval.itemId} · requester: {approval.requesterName}</li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h2>Recently Rejected</h2>
            {recentRejected.length === 0 && <p>No recent rejected approvals.</p>}
            {recentRejected.length > 0 && (
              <ul>
                {recentRejected.map((approval) => (
                  <li key={approval.id}>item {approval.itemId} · requester: {approval.requesterName}</li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}
