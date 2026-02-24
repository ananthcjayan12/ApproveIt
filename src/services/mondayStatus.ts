import type { ApprovalStatus, Env } from '../types';
import { mondayGraphqlRequest } from './mondayClient';

interface ChangeStatusMutationData {
  change_simple_column_value: {
    id: string;
  };
}

interface ChangeStatusMutationVariables {
  boardId: number;
  itemId: number;
  columnId: string;
  value: string;
}

const CHANGE_STATUS_MUTATION = `
mutation ChangeSimpleColumnValue($boardId: ID!, $itemId: ID!, $columnId: String!, $value: String!) {
  change_simple_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
    id
  }
}
`;

export function mapApprovalStatusToMondayLabel(status: ApprovalStatus): string {
  switch (status) {
    case 'pending':
      return 'Pending Approval';
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    case 'changes_requested':
      return 'Changes Requested';
    default:
      return 'Pending Approval';
  }
}

export async function updateMondayStatus(
  env: Env,
  params: {
    boardId: number;
    itemId: number;
    statusColumnId: string;
    status: ApprovalStatus;
  },
): Promise<{ itemId: string }> {
  const data = await mondayGraphqlRequest<ChangeStatusMutationData, ChangeStatusMutationVariables>(
    env,
    CHANGE_STATUS_MUTATION,
    {
      boardId: params.boardId,
      itemId: params.itemId,
      columnId: params.statusColumnId,
      value: mapApprovalStatusToMondayLabel(params.status),
    },
    {
      operationName: 'change_simple_column_value',
      retryOnTransient: true,
    },
  );

  return {
    itemId: data.change_simple_column_value.id,
  };
}
