import type { Env } from '../types';

const FREE_TIER_LIMIT = 100;

function getUsageKey(accountId: number, date = new Date()): string {
  const month = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
  return `usage:${accountId}:${month}`;
}

export async function incrementResolvedUsage(env: Env, accountId: number): Promise<number> {
  const key = getUsageKey(accountId);
  const currentRaw = await env.USAGE.get(key);
  const current = currentRaw ? Number(currentRaw) : 0;
  const next = Number.isFinite(current) ? current + 1 : 1;
  await env.USAGE.put(key, String(next));
  return next;
}

export async function getMonthlyUsage(env: Env, accountId: number): Promise<{ count: number; limit: number; key: string }> {
  const key = getUsageKey(accountId);
  const currentRaw = await env.USAGE.get(key);
  const count = currentRaw ? Number(currentRaw) : 0;

  return {
    count: Number.isFinite(count) ? count : 0,
    limit: FREE_TIER_LIMIT,
    key,
  };
}

export async function checkFreeTierLimit(env: Env, accountId: number): Promise<{ allowed: boolean; count: number; limit: number }> {
  const usage = await getMonthlyUsage(env, accountId);

  return {
    allowed: usage.count < usage.limit,
    count: usage.count,
    limit: usage.limit,
  };
}
