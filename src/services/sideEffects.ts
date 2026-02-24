import type { Env } from '../types';

interface QueueSideEffectInput {
  key: string;
  payload: Record<string, unknown>;
  errorCode: string;
}

export async function queueSideEffectFailure(env: Env, input: QueueSideEffectInput): Promise<void> {
  const retryKey = `side_effect_retry:${Date.now()}:${input.key}`;

  const payload = {
    createdAt: new Date().toISOString(),
    errorCode: input.errorCode,
    payload: input.payload,
  };

  await env.USAGE.put(retryKey, JSON.stringify(payload));
}

export function logSideEffectFailure(input: {
  operation: string;
  approvalId: string;
  accountId: number;
  errorCode: string;
}): void {
  console.error(
    JSON.stringify({
      level: 'error',
      event: 'monday_side_effect_failed',
      operation: input.operation,
      approvalId: input.approvalId,
      accountId: input.accountId,
      errorCode: input.errorCode,
    }),
  );
}
