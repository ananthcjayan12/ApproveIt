import mondaySdk from 'monday-sdk-js';

export interface MondayContext {
  boardId?: number;
  itemId?: number;
  accountId?: number;
  user?: {
    id?: number;
    name?: string;
  };
}

const monday = mondaySdk();
monday.setToken('');

export function getMondaySdk() {
  return monday;
}

function toOptionalNumber(value: unknown): number | undefined {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}

function normalizeContext(raw: Record<string, unknown>): MondayContext {
  const accountFromObject =
    raw.account && typeof raw.account === 'object'
      ? toOptionalNumber((raw.account as Record<string, unknown>).id)
      : undefined;
  const userFromObject =
    raw.user && typeof raw.user === 'object' ? (raw.user as Record<string, unknown>) : undefined;

  const boardId =
    toOptionalNumber(raw.boardId) ??
    (Array.isArray(raw.boardIds) ? toOptionalNumber(raw.boardIds[0]) : undefined);
  const itemId =
    toOptionalNumber(raw.itemId) ??
    (Array.isArray(raw.itemIds) ? toOptionalNumber(raw.itemIds[0]) : undefined);

  return {
    boardId,
    itemId,
    accountId: toOptionalNumber(raw.accountId) ?? accountFromObject,
    user: {
      id: toOptionalNumber(raw.userId) ?? toOptionalNumber(userFromObject?.id),
      name:
        (typeof raw.userName === 'string' && raw.userName.trim()) ||
        (typeof userFromObject?.name === 'string' && userFromObject.name.trim()) ||
        undefined,
    },
  };
}

export async function loadMondayContext(): Promise<MondayContext> {
  return new Promise((resolve) => {
    monday.get('context').then((res: { data?: unknown }) => {
      if (!res?.data || typeof res.data !== 'object') {
        resolve({});
        return;
      }

      resolve(normalizeContext(res.data as Record<string, unknown>));
    });
  });
}
