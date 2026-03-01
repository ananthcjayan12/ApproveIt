import type { Env } from '../types';
import { mondayGraphqlRequest } from './mondayClient';

interface ItemColumnValue {
  id: string;
  text: string | null;
  value: string | null;
}

interface GetItemPeopleColumnData {
  items: Array<{
    id: string;
    column_values: ItemColumnValue[];
  }>;
}

interface GetItemPeopleColumnVariables {
  itemIds: number[];
  columnIds: string[];
}

const GET_ITEM_PEOPLE_COLUMN_QUERY = `
query GetItemPeopleColumn($itemIds: [ID!], $columnIds: [String!]) {
  items(ids: $itemIds) {
    id
    column_values(ids: $columnIds) {
      id
      text
      value
    }
  }
}
`;

function parsePeopleColumnValue(rawValue: string | null): { userId?: number } {
  if (!rawValue) {
    return {};
  }

  try {
    const parsed = JSON.parse(rawValue) as {
      personsAndTeams?: Array<{ id?: number | string; kind?: string }>;
    };
    const firstPerson = Array.isArray(parsed.personsAndTeams)
      ? parsed.personsAndTeams.find((entry) => entry?.kind === 'person' || entry?.kind === undefined)
      : undefined;

    if (!firstPerson?.id) {
      return {};
    }

    const userId = Number(firstPerson.id);
    if (!Number.isInteger(userId) || userId <= 0) {
      return {};
    }

    return { userId };
  } catch {
    return {};
  }
}

export async function getApproverFromPeopleColumn(
  env: Env,
  params: {
    itemId: number;
    peopleColumnId: string;
  },
): Promise<{ userId?: number; userName?: string }> {
  const data = await mondayGraphqlRequest<GetItemPeopleColumnData, GetItemPeopleColumnVariables>(
    env,
    GET_ITEM_PEOPLE_COLUMN_QUERY,
    {
      itemIds: [params.itemId],
      columnIds: [params.peopleColumnId],
    },
    {
      operationName: 'items',
      retryOnTransient: true,
    },
  );

  const item = data.items[0];
  const column = item?.column_values[0];
  if (!column) {
    return {};
  }

  const parsed = parsePeopleColumnValue(column.value);
  return {
    userId: parsed.userId,
    userName: column.text?.trim() || undefined,
  };
}
