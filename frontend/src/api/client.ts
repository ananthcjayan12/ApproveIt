export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'changes_requested';

export interface Approval {
  id: string;
  itemId: number;
  boardId: number;
  accountId: number;
  requesterId: number;
  requesterName: string;
  approverId: number;
  approverName: string;
  status: ApprovalStatus;
  requesterNote: string | null;
  approverNote: string | null;
  statusColumnId: string | null;
  requestedAt: string;
  resolvedAt: string | null;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  action: string;
  actorId: number;
  actorName: string;
  note: string | null;
  timestamp: string;
}

export interface CreateApprovalPayload {
  itemId: number;
  boardId: number;
  accountId: number;
  requesterId: number;
  requesterName: string;
  approverId: number;
  approverName: string;
  statusColumnId: string;
  note?: string;
}

export interface TransitionApprovalPayload {
  accountId: number;
  actorId: number;
  actorName: string;
  note?: string;
}

export interface BoardConfig {
  id: string;
  boardId: number;
  accountId: number;
  statusColumnId: string | null;
  defaultApproverColumn: string | null;
  reminderHours: number;
  createdAt: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8787/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export const apiClient = {
  listApprovals: (params: { accountId: number; boardId?: number; approverId?: number; status?: ApprovalStatus }) => {
    const query = new URLSearchParams({ accountId: String(params.accountId) });

    if (params.boardId) query.set('boardId', String(params.boardId));
    if (params.approverId) query.set('approverId', String(params.approverId));
    if (params.status) query.set('status', params.status);

    return request<{ data: Approval[] }>(`/approvals?${query.toString()}`);
  },
  getAuditTimeline: (approvalId: string, accountId: number) => {
    return request<{ data: { approvalId: string; events: AuditEvent[] } }>(
      `/approvals/${approvalId}/audit?accountId=${accountId}`,
    );
  },
  createApproval: (payload: CreateApprovalPayload) => {
    return request<{ data: { id: string; status: ApprovalStatus } }>(`/approvals`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  transitionApproval: (
    approvalId: string,
    action: 'approve' | 'reject' | 'changes',
    payload: TransitionApprovalPayload,
  ) => {
    return request<{ data: { id: string; status: ApprovalStatus } }>(`/approvals/${approvalId}/${action}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  getBoardConfig: (boardId: number, accountId: number) => {
    return request<{ data: BoardConfig | null }>(`/boards/${boardId}/config?accountId=${accountId}`);
  },
  saveBoardConfig: (boardId: number, payload: {
    accountId: number;
    statusColumnId: string;
    defaultApproverColumn: string;
    reminderHours: number;
  }) => {
    return request<{ data: BoardConfig }>(`/boards/${boardId}/config`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },
};
