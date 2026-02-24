export interface Env {
  DB: D1Database;
  USAGE: KVNamespace;
  MONDAY_API_TOKEN: string;
  MONDAY_SIGNING_SECRET: string;
  MONDAY_CLIENT_ID: string;
  MONDAY_API_VERSION: string;
}

export const APPROVAL_STATUSES = ['pending', 'approved', 'rejected', 'changes_requested'] as const;

export type ApprovalStatus = (typeof APPROVAL_STATUSES)[number];

export interface CreateApprovalRequest {
  itemId: number;
  boardId: number;
  accountId: number;
  requesterId: number;
  requesterName: string;
  approverId: number;
  approverName: string;
  note?: string;
  statusColumnId: string;
}

export interface ValidationErrorResponse {
  error: {
    code: 'VALIDATION_ERROR';
    message: string;
    details: string[];
  };
}