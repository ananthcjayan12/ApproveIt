import { useState } from 'react';
import { Flex, Heading, Text, Button, TextArea, Box, Divider } from '@vibe/core';
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
  disabled,
  onAction,
  currentStatus,
}: ApprovalActionsProps) {
  const [note, setNote] = useState('');

  if (currentStatus !== 'pending') {
    return (
      <Box className="section-card">
        <Text type="text1" color="secondary">This approval is already closed.</Text>
      </Box>
    );
  }

  return (
    <Box className="section-card">
      <Flex direction="column" gap="medium">
        <Heading type="h2" weight="medium">Take Action</Heading>

        <Divider />

        <TextArea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Add a note (optional)"
          size="small"
          aria-label="Approval note"
        />

        <Flex gap="small" className="action-buttons">
          <Button
            color="positive"
            disabled={disabled}
            onClick={() => onAction('approve', note || undefined)}
          >
            Approve
          </Button>
          <Button
            color="negative"
            disabled={disabled}
            onClick={() => onAction('reject', note || undefined)}
          >
            Reject
          </Button>
          <Button
            kind="secondary"
            disabled={disabled}
            onClick={() => onAction('changes', note || undefined)}
          >
            Request Changes
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
