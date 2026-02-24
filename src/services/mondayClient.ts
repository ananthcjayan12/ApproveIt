import type { Env } from '../types';

const MONDAY_API_URL = 'https://api.monday.com/v2';
const MAX_RETRIES = 2;
const RETRY_DELAYS_MS = [250, 750];

interface GraphQLErrorItem {
  message: string;
}

interface MondayGraphQLResponse<T> {
  data?: T;
  errors?: GraphQLErrorItem[];
}

export interface MondayRequestOptions {
  operationName: string;
  retryOnTransient?: boolean;
}

export class MondayApiError extends Error {
  code: string;
  status?: number;
  isTransient: boolean;

  constructor(message: string, code: string, isTransient: boolean, status?: number) {
    super(message);
    this.name = 'MondayApiError';
    this.code = code;
    this.status = status;
    this.isTransient = isTransient;
  }
}

function isTransientStatus(status: number): boolean {
  return status === 429 || status >= 500;
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mondayGraphqlRequest<TData, TVariables extends object>(
  env: Env,
  query: string,
  variables: TVariables,
  options: MondayRequestOptions,
): Promise<TData> {
  const retryOnTransient = options.retryOnTransient ?? true;
  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    let response: Response;

    try {
      response = await fetch(MONDAY_API_URL, {
        method: 'POST',
        headers: {
          Authorization: env.MONDAY_API_TOKEN,
          'API-Version': env.MONDAY_API_VERSION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });
    } catch {
      const canRetry = retryOnTransient && attempt < MAX_RETRIES;

      if (canRetry) {
        await sleep(RETRY_DELAYS_MS[attempt] ?? RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - 1]);
        attempt += 1;
        continue;
      }

      throw new MondayApiError('Network error while calling monday API.', 'MONDAY_NETWORK_ERROR', true);
    }

    if (!response.ok) {
      const transient = isTransientStatus(response.status);
      const canRetry = retryOnTransient && transient && attempt < MAX_RETRIES;

      if (canRetry) {
        await sleep(RETRY_DELAYS_MS[attempt] ?? RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - 1]);
        attempt += 1;
        continue;
      }

      throw new MondayApiError(
        `monday API request failed with status ${response.status}.`,
        'MONDAY_HTTP_ERROR',
        transient,
        response.status,
      );
    }

    const parsed = (await response.json()) as MondayGraphQLResponse<TData>;

    if (parsed.errors && parsed.errors.length > 0) {
      const message = parsed.errors.map((error) => error.message).join('; ');
      const transient = /timeout|temporar|rate limit|too many requests|internal/i.test(message);
      const canRetry = retryOnTransient && transient && attempt < MAX_RETRIES;

      if (canRetry) {
        await sleep(RETRY_DELAYS_MS[attempt] ?? RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - 1]);
        attempt += 1;
        continue;
      }

      throw new MondayApiError('monday GraphQL returned errors.', 'MONDAY_GRAPHQL_ERROR', transient);
    }

    if (!parsed.data) {
      throw new MondayApiError('monday GraphQL response did not include data.', 'MONDAY_EMPTY_RESPONSE', false);
    }

    return parsed.data;
  }

  throw new MondayApiError('monday API request failed after retries.', 'MONDAY_RETRY_EXHAUSTED', true);
}
