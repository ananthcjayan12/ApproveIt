import { Flex, Heading, Text, Loader, Box, Divider } from '@vibe/core';
import type { Approval } from '../api/client';

interface ApprovalPanelProps {
  approval: Approval | null;
  isLoading: boolean;
  error: string | null;
}

function StatusBadge({ status }: { status: string }) {
  const statusLabels: Record<string, string> = {
    pending: 'Pending Approval',
    approved: 'Approved',
    rejected: 'Rejected',
    changes_requested: 'Changes Requested',
  };

  return (
    <span className={`status-badge status-${status}`}>
      {statusLabels[status] ?? status}
    </span>
  );
}

export function ApprovalPanel({ approval, isLoading, error }: ApprovalPanelProps) {
  if (isLoading) {
    return (
      <Box className="section-card">
        <Flex justify="center" align="center" style={{ minHeight: '100px' }}>
          <Loader size="small" />
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="section-card">
        <Text color="secondary">{error}</Text>
      </Box>
    );
  }

  if (!approval) {
    return (
      <Box className="section-card">
        <Flex direction="column" align="center" gap="small" className="empty-state-container">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="32" fill="#F5F6F8"/>
            <path d="M32 20C25.373 20 20 25.373 20 32C20 38.627 25.373 44 32 44C38.627 44 44 38.627 44 32C44 25.373 38.627 20 32 20ZM32 22C37.546 22 42 26.454 42 32C42 37.546 37.546 42 32 42C26.454 42 22 37.546 22 32C22 26.454 26.454 22 32 22ZM31 26V34H33V26H31ZM31 36V38H33V36H31Z" fill="#676879"/>
          </svg>
          <Heading type="h3" weight="medium">No approval yet</Heading>
          <Text type="text2" color="secondary" align="center">
            Request approval to get started with the approval workflow
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box className="section-card">
      <Flex direction="column" gap="medium">
        <Flex justify="space-between" align="center">
          <Heading type="h2" weight="medium">Approval Status</Heading>
          <StatusBadge status={approval.status} />
        </Flex>

        <Divider />

        <Flex direction="column" gap="small">
          <Flex justify="space-between">
            <Text type="text2" color="secondary">Requester</Text>
            <Text type="text2" weight="medium">{approval.requesterName}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text type="text2" color="secondary">Approver</Text>
            <Text type="text2" weight="medium">{approval.approverName}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text type="text2" color="secondary">Requested At</Text>
            <Text type="text2">{new Date(approval.requestedAt).toLocaleString()}</Text>
          </Flex>
        </Flex>

        {(approval.requesterNote || approval.approverNote) && (
          <>
            <Divider />
            <Flex direction="column" gap="small">
              {approval.requesterNote && (
                <Flex direction="column" gap="xs">
                  <Text type="text2" color="secondary">Requester Note</Text>
                  <Text type="text2">{approval.requesterNote}</Text>
                </Flex>
              )}
              {approval.approverNote && (
                <Flex direction="column" gap="xs">
                  <Text type="text2" color="secondary">Approver Note</Text>
                  <Text type="text2">{approval.approverNote}</Text>
                </Flex>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}
