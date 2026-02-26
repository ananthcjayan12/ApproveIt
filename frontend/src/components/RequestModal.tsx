import { useState } from 'react';
import { Flex, Heading, Text, Button, TextField, TextArea, Box, Divider, AttentionBox } from '@vibe/core';
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
    <Box className="section-card">
      <Flex direction="column" gap="medium">
        <Heading type="h2" weight="medium">Request Approval</Heading>
        
        <Divider />

        <Flex direction="column" gap="medium">
          <TextField
            title="Approver ID"
            value={approverId}
            onChange={(value) => setApproverId(value)}
            placeholder="Enter approver user ID"
            size="medium"
            required
          />
          <TextField
            title="Approver Name"
            value={approverName}
            onChange={(value) => setApproverName(value)}
            placeholder="Enter approver name"
            size="medium"
            required
          />
          <TextField
            title="Status Column ID"
            value={statusColumnId}
            onChange={(value) => setStatusColumnId(value)}
            placeholder="e.g., status"
            size="medium"
            required
          />
          <Flex direction="column" gap="xs">
            <Text type="text2" weight="medium">Note (optional)</Text>
            <TextArea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Add context for the approver"
              size="small"
              aria-label="Request note"
            />
          </Flex>
        </Flex>

        {error && (
          <AttentionBox
            type="danger"
            text={error}
            compact
          />
        )}

        <Button
          onClick={submit}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Submitting…' : 'Request Approval'}
        </Button>
      </Flex>
    </Box>
  );
}
