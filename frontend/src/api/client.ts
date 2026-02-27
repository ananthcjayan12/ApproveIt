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

export class ApiClientError extends Error {
  method: string;
  path: string;
  url: string;
  status?: number;
  requestId?: string;
  responseBody?: unknown;

  constructor(
    message: string,
    details: {
      method: string;
      path: string;
      url: string;
      status?: number;
      requestId?: string;
      responseBody?: unknown;
    },
  ) {
    super(message);
    this.name = 'ApiClientError';
    this.method = details.method;
    this.path = details.path;
    this.url = details.url;
    this.status = details.status;
    this.requestId = details.requestId;
    this.responseBody = details.responseBody;
  }
}

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

function resolveApiBaseUrl(): string {
  const explicitApiBase = import.meta.env.VITE_API_BASE_URL;
  if (explicitApiBase) {
    return normalizeBaseUrl(explicitApiBase);
  }

  const workerUrl = import.meta.env.VITE_WORKER_URL;
  if (workerUrl) {
    return `${normalizeBaseUrl(workerUrl)}/api`;
  }

  return 'http://127.0.0.1:8787/api';
}

const API_BASE_URL = resolveApiBaseUrl();

function parseJsonOrText(input: string): unknown {
  if (!input) {
    return undefined;
  }

  try {
    return JSON.parse(input) as unknown;
  } catch {
    return input;
  }
}

export function formatApiError(error: unknown, fallback: string): string {
  if (!(error instanceof ApiClientError)) {
    return fallback;
  }

  if (error.requestId) {
    return `${fallback} (Request ID: ${error.requestId})`;
  }

  return `${fallback} (HTTP ${error.status ?? 'unknown'})`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const method = init?.method ?? 'GET';
  let response: Response;

  try {
    response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    });
  } catch (error) {
    console.error('[ApproveIt][API] Network error', {
      method,
      path,
      url,
      error,
    });
    throw new ApiClientError('Network error while calling ApproveIt API.', { method, path, url });
  }

  if (!response.ok) {
    const rawBody = await response.text();
    const responseBody = parseJsonOrText(rawBody);
    const requestId = response.headers.get('x-request-id') ?? undefined;

    console.error('[ApproveIt][API] Request failed', {
      method,
      path,
      url,
      status: response.status,
      requestId,
      responseBody,
    });

    throw new ApiClientError(`API request failed with status ${response.status}`, {
      method,
      path,
      url,
      status: response.status,
      requestId,
      responseBody,
    });
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
