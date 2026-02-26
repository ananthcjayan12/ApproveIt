import { Flex, Heading, Text, Loader, Box, Divider } from '@vibe/core';
import type { AuditEvent } from '../api/client';

interface AuditTrailProps {
  events: AuditEvent[];
  isLoading: boolean;
  error: string | null;
}

function ActionBadge({ action }: { action: string }) {
  const actionLabels: Record<string, string> = {
    request: 'Requested',
    approve: 'Approved',
    reject: 'Rejected',
    changes: 'Changes Requested',
  };

  const actionColors: Record<string, string> = {
    request: 'status-pending',
    approve: 'status-approved',
    reject: 'status-rejected',
    changes: 'status-changes_requested',
  };

  return (
    <span className={`status-badge ${actionColors[action] ?? ''}`}>
      {actionLabels[action] ?? action}
    </span>
  );
}

export function AuditTrail({ events, isLoading, error }: AuditTrailProps) {
  if (isLoading) {
    return (
      <Box className="section-card">
        <Flex justify="center" align="center" style={{ minHeight: '80px' }}>
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

  if (events.length === 0) {
    return (
      <Box className="section-card">
        <Flex direction="column" gap="medium">
          <Heading type="h2" weight="medium">Audit Trail</Heading>
          <Divider />
          <Flex direction="column" align="center" gap="small" style={{ padding: 'var(--spacing-medium)' }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill="#F5F6F8"/>
              <path d="M28 18H20C18.9 18 18 18.9 18 20V28C18 29.1 18.9 30 20 30H28C29.1 30 30 29.1 30 28V20C30 18.9 29.1 18 28 18ZM28 28H20V20H28V28Z" fill="#676879"/>
            </svg>
            <Text type="text2" color="secondary">No activity yet</Text>
          </Flex>
        </Flex>
      </Box>
    );
  }

  return (
    <Box className="section-card">
      <Flex direction="column" gap="medium">
        <Heading type="h2" weight="medium">Audit Trail</Heading>
        
        <Divider />

        <ul className="audit-timeline">
          {events.map((event) => (
            <li key={event.id} className="audit-item">
              <Flex direction="column" gap="xs">
                <Flex justify="space-between" align="center">
                  <ActionBadge action={event.action} />
                  <Text type="text2" color="secondary">
                    {new Date(event.timestamp).toLocaleString()}
                  </Text>
                </Flex>
                <Flex gap="xs" align="center">
                  <Text type="text2" weight="medium">{event.actorName}</Text>
                </Flex>
                {event.note && (
                  <Text type="text2" color="secondary">{event.note}</Text>
                )}
              </Flex>
            </li>
          ))}
        </ul>
      </Flex>
    </Box>
  );
}
