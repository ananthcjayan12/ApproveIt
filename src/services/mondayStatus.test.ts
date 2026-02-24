import { describe, expect, it } from 'vitest';
import { mapApprovalStatusToMondayLabel } from './mondayStatus';

describe('mapApprovalStatusToMondayLabel', () => {
  it('maps all statuses correctly', () => {
    expect(mapApprovalStatusToMondayLabel('pending')).toBe('Pending Approval');
    expect(mapApprovalStatusToMondayLabel('approved')).toBe('Approved');
    expect(mapApprovalStatusToMondayLabel('rejected')).toBe('Rejected');
    expect(mapApprovalStatusToMondayLabel('changes_requested')).toBe('Changes Requested');
  });
});
