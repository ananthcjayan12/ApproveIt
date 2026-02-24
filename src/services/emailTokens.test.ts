import { describe, expect, it } from 'vitest';
import { createEmailActionToken, verifyEmailActionToken } from './emailTokens';

describe('email action tokens', () => {
  it('creates and verifies a token', async () => {
    const token = await createEmailActionToken('secret', {
      approvalId: 'apr_123',
      accountId: 10,
      actorId: 20,
      actorName: 'Approver',
      action: 'approve',
    });

    const result = await verifyEmailActionToken('secret', token);

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.payload.approvalId).toBe('apr_123');
      expect(result.payload.action).toBe('approve');
    }
  });

  it('rejects token signed with another secret', async () => {
    const token = await createEmailActionToken('secret', {
      approvalId: 'apr_123',
      accountId: 10,
      actorId: 20,
      actorName: 'Approver',
      action: 'reject',
    });

    const result = await verifyEmailActionToken('other-secret', token);
    expect(result.valid).toBe(false);
  });
});
