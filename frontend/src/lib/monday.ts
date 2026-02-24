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

export async function loadMondayContext(): Promise<MondayContext> {
  return new Promise((resolve) => {
    monday.get('context').then((res: { data?: unknown }) => {
      if (!res?.data || typeof res.data !== 'object') {
        resolve({});
        return;
      }

      resolve(res.data as MondayContext);
    });
  });
}
