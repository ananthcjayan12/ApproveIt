import { useEffect, useState } from 'react';
import { Flex, Heading, Text, Loader, Box, Divider, Button, TextField, Toggle, AttentionBox } from '@vibe/core';
import { apiClient, formatApiError, type Approval } from '../api/client';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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
        setIsLoading(false);
        return;
      }

      Promise.all([
        apiClient.listApprovals({ accountId: ctx.accountId, boardId: ctx.boardId }),
        apiClient.getBoardConfig(ctx.boardId, ctx.accountId),
      ])
        .then(([approvalsRes, configRes]) => {
          setApprovals(approvalsRes.data);
          if (configRes.data) {
            setStatusColumnId(configRes.data.statusColumnId ?? 'status');
            setDefaultApproverColumn(configRes.data.defaultApproverColumn ?? 'person');
            setReminderHours(String(configRes.data.reminderHours));
          }
        })
        .catch((err) => {
          console.error('[ApproveIt][BoardView] Failed to load board data', {
            context: ctx,
            error: err,
          });
          setError(formatApiError(err, 'Unable to load approvals for this board.'));
        })
        .finally(() => setIsLoading(false));
    });
  }, []);

  const saveConfig = async () => {
    if (!context?.accountId || !context.boardId) {
      setConfigMessage('Missing monday context (account or board). Refresh the board and try again.');
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

    setIsSaving(true);
    try {
      await apiClient.saveBoardConfig(context.boardId, {
        accountId: context.accountId,
        statusColumnId: statusColumnId.trim(),
        defaultApproverColumn: defaultApproverColumn.trim(),
        reminderHours: parsedReminderHours,
      });

      setConfigMessage('Board settings saved.');
    } catch (err) {
      console.error('[ApproveIt][BoardView] Failed to save board settings', {
        context,
        payload: {
          accountId: context.accountId,
          boardId: context.boardId,
          statusColumnId: statusColumnId.trim(),
          defaultApproverColumn: defaultApproverColumn.trim(),
          reminderHours: parsedReminderHours,
        },
        error: err,
      });
      setConfigMessage(formatApiError(err, 'Unable to save board settings.'));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box style={{ padding: 'var(--spacing-xl)' }}>
        <Flex justify="center" align="center" style={{ minHeight: '200px' }}>
          <Loader size="medium" />
        </Flex>
      </Box>
    );
  }

  const myApprovalCount = context?.user?.id
    ? approvals.filter((approval) => approval.approverId === context.user?.id).length
    : 0;

  return (
    <Box style={{ padding: 'var(--spacing-large)' }}>
      <Flex direction="column" gap="large">
        <Flex direction="column" gap="small">
          <Heading type="h1" weight="bold">ApproveIt Dashboard</Heading>
          <Text type="text2" color="secondary">
            Board {context?.boardId ?? '—'}
          </Text>
        </Flex>

        {/* Board Settings */}
        <Box className="section-card">
          <Flex direction="column" gap="medium">
            <Heading type="h2" weight="medium">Board Settings</Heading>
            <Divider />
            <Flex direction="column" gap="medium">
              <TextField
                title="Status Column ID"
                value={statusColumnId}
                onChange={(value) => setStatusColumnId(value)}
                placeholder="e.g., status"
                size="medium"
              />
              <TextField
                title="Default Approver Column"
                value={defaultApproverColumn}
                onChange={(value) => setDefaultApproverColumn(value)}
                placeholder="e.g., person"
                size="medium"
              />
              <TextField
                title="Reminder Hours"
                value={reminderHours}
                onChange={(value) => setReminderHours(value)}
                placeholder="e.g., 24"
                size="medium"
              />
            </Flex>
            {configMessage && (
              <AttentionBox
                type={configMessage.includes('saved') ? 'success' : 'danger'}
                text={configMessage}
                compact
              />
            )}
            <Button onClick={saveConfig} loading={isSaving} disabled={isSaving}>
              Save Board Settings
            </Button>
          </Flex>
        </Box>

        {/* Filter Toggle */}
        <Box className="section-card">
          <Flex justify="space-between" align="center">
            <Flex gap="small" align="center">
              <Toggle
                isSelected={showMine}
                onChange={() => setShowMine(!showMine)}
                aria-label="Show only my approvals"
              />
              <Text type="text1">My Approvals</Text>
            </Flex>
            <Text type="text2" color="secondary">
              {myApprovalCount} assigned to you
            </Text>
          </Flex>
          <Text type="text2" color="secondary">
            Local filter only. This does not enable or disable board automations.
          </Text>
        </Box>

        {error && (
          <AttentionBox type="danger" text={error} />
        )}

        {!error && filteredApprovals.length === 0 && (
          <Box className="section-card">
            <Flex justify="center" align="center" style={{ padding: 'var(--spacing-large)' }}>
              <Text type="text1" color="secondary">No approvals found for this board.</Text>
            </Flex>
          </Box>
        )}

        {filteredApprovals.length > 0 && (
          <>
            {/* Pending Approvals */}
            <Box className="section-card">
              <Flex direction="column" gap="medium">
                <Flex justify="space-between" align="center">
                  <Heading type="h2" weight="medium">Pending</Heading>
                  <span className="status-badge status-pending">{pending.length}</span>
                </Flex>
                <Divider />
                {pending.length === 0 ? (
                  <Text type="text2" color="secondary">No pending approvals.</Text>
                ) : (
                  <ul className="approval-list">
                    {pending.map((approval) => (
                      <li key={approval.id} className="approval-list-item">
                        <Flex justify="space-between" align="center">
                          <Flex direction="column" gap="xs">
                            <Text type="text1" weight="medium">Item {approval.itemId}</Text>
                            <Text type="text2" color="secondary">Approver: {approval.approverName}</Text>
                          </Flex>
                          {isOverdue(approval) && (
                            <span className="overdue-indicator">OVERDUE</span>
                          )}
                        </Flex>
                      </li>
                    ))}
                  </ul>
                )}
              </Flex>
            </Box>

            {/* Recently Approved */}
            <Box className="section-card">
              <Flex direction="column" gap="medium">
                <Flex justify="space-between" align="center">
                  <Heading type="h2" weight="medium">Recently Approved</Heading>
                  <span className="status-badge status-approved">{recentApproved.length}</span>
                </Flex>
                <Divider />
                {recentApproved.length === 0 ? (
                  <Text type="text2" color="secondary">No recent approved approvals.</Text>
                ) : (
                  <ul className="approval-list">
                    {recentApproved.map((approval) => (
                      <li key={approval.id} className="approval-list-item">
                        <Flex direction="column" gap="xs">
                          <Text type="text1" weight="medium">Item {approval.itemId}</Text>
                          <Text type="text2" color="secondary">Requester: {approval.requesterName}</Text>
                        </Flex>
                      </li>
                    ))}
                  </ul>
                )}
              </Flex>
            </Box>

            {/* Recently Rejected */}
            <Box className="section-card">
              <Flex direction="column" gap="medium">
                <Flex justify="space-between" align="center">
                  <Heading type="h2" weight="medium">Recently Rejected</Heading>
                  <span className="status-badge status-rejected">{recentRejected.length}</span>
                </Flex>
                <Divider />
                {recentRejected.length === 0 ? (
                  <Text type="text2" color="secondary">No recent rejected approvals.</Text>
                ) : (
                  <ul className="approval-list">
                    {recentRejected.map((approval) => (
                      <li key={approval.id} className="approval-list-item">
                        <Flex direction="column" gap="xs">
                          <Text type="text1" weight="medium">Item {approval.itemId}</Text>
                          <Text type="text2" color="secondary">Requester: {approval.requesterName}</Text>
                        </Flex>
                      </li>
                    ))}
                  </ul>
                )}
              </Flex>
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
}
