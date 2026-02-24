import { APPROVAL_STATUSES, type ApprovalStatus, type CreateApprovalRequest } from '../types';

const MAX_NOTE_LENGTH = 2000;

function isPositiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

export function isApprovalStatus(value: unknown): value is ApprovalStatus {
  return typeof value === 'string' && APPROVAL_STATUSES.includes(value as ApprovalStatus);
}

export function validateCreateApprovalPayload(payload: unknown): {
  valid: boolean;
  errors: string[];
  data?: CreateApprovalRequest;
} {
  const errors: string[] = [];

  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Payload must be a JSON object.'] };
  }

  const input = payload as Record<string, unknown>;

  if (!isPositiveInteger(input.itemId)) errors.push('itemId must be a positive integer.');
  if (!isPositiveInteger(input.boardId)) errors.push('boardId must be a positive integer.');
  if (!isPositiveInteger(input.accountId)) errors.push('accountId must be a positive integer.');
  if (!isPositiveInteger(input.requesterId)) errors.push('requesterId must be a positive integer.');
  if (!isPositiveInteger(input.approverId)) errors.push('approverId must be a positive integer.');

  if (typeof input.requesterName !== 'string' || !input.requesterName.trim()) {
    errors.push('requesterName is required.');
  }

  if (typeof input.approverName !== 'string' || !input.approverName.trim()) {
    errors.push('approverName is required.');
  }

  if (typeof input.statusColumnId !== 'string' || !input.statusColumnId.trim()) {
    errors.push('statusColumnId is required.');
  }

  if (input.note !== undefined && typeof input.note !== 'string') {
    errors.push('note must be a string when provided.');
  }

  if (typeof input.note === 'string' && input.note.length > MAX_NOTE_LENGTH) {
    errors.push(`note exceeds max length of ${MAX_NOTE_LENGTH}.`);
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: {
      itemId: input.itemId as number,
      boardId: input.boardId as number,
      accountId: input.accountId as number,
      requesterId: input.requesterId as number,
      requesterName: (input.requesterName as string).trim(),
      approverId: input.approverId as number,
      approverName: (input.approverName as string).trim(),
      note: typeof input.note === 'string' ? input.note : undefined,
      statusColumnId: (input.statusColumnId as string).trim(),
    },
  };
}