import { describe, expect, it } from 'vitest';
import { validateCreateApprovalPayload, validateTransitionApprovalPayload } from './validation';

describe('validation service', () => {
  it('rejects invalid create payload IDs', () => {
    const result = validateCreateApprovalPayload({
      itemId: 0,
      boardId: -1,
      accountId: 'bad',
    });

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('accepts valid create payload', () => {
    const result = validateCreateApprovalPayload({
      itemId: 1,
      boardId: 2,
      accountId: 3,
      requesterId: 4,
      requesterName: 'Requester',
      approverId: 5,
      approverName: 'Approver',
      statusColumnId: 'status',
      note: 'Please review',
    });

    expect(result.valid).toBe(true);
    expect(result.data?.statusColumnId).toBe('status');
  });

  it('rejects overlong transition note', () => {
    const result = validateTransitionApprovalPayload({
      accountId: 1,
      actorId: 2,
      actorName: 'Approver',
      note: 'x'.repeat(2001),
    });

    expect(result.valid).toBe(false);
    expect(result.errors.some((error) => error.includes('note exceeds max length'))).toBe(true);
  });
});
