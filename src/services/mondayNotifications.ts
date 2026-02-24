import type { ApprovalStatus, Env } from '../types';
import { mondayGraphqlRequest } from './mondayClient';

interface CreateNotificationData {
  create_notification: {
    text: string;
  };
}

interface CreateNotificationVariables {
  userId: number;
  targetId: number;
  text: string;
}

export type NotificationTemplate = 'requested' | Exclude<ApprovalStatus, 'pending'>;

const CREATE_NOTIFICATION_MUTATION = `
mutation CreateNotification($userId: ID!, $targetId: ID!, $text: String!) {
  create_notification(user_id: $userId, target_id: $targetId, text: $text, target_type: Project) {
    text
  }
}
`;

function buildNotificationMessage(input: {
  template: NotificationTemplate;
  requesterName: string;
  approverName: string;
  itemId: number;
}): string {
  if (input.template === 'requested') {
    return `${input.requesterName} requested your approval for item ${input.itemId}.`;
  }

  if (input.template === 'approved') {
    return `${input.approverName} approved your request for item ${input.itemId}.`;
  }

  if (input.template === 'rejected') {
    return `${input.approverName} rejected your request for item ${input.itemId}.`;
  }

  return `${input.approverName} requested changes for item ${input.itemId}.`;
}

export async function sendMondayNotification(
  env: Env,
  params: {
    recipientUserId: number;
    targetItemId: number;
    template: NotificationTemplate;
    requesterName: string;
    approverName: string;
  },
): Promise<{ text: string }> {
  const message = buildNotificationMessage({
    template: params.template,
    requesterName: params.requesterName,
    approverName: params.approverName,
    itemId: params.targetItemId,
  });

  const data = await mondayGraphqlRequest<CreateNotificationData, CreateNotificationVariables>(
    env,
    CREATE_NOTIFICATION_MUTATION,
    {
      userId: params.recipientUserId,
      targetId: params.targetItemId,
      text: message,
    },
    {
      operationName: 'create_notification',
      retryOnTransient: true,
    },
  );

  return {
    text: data.create_notification.text,
  };
}
