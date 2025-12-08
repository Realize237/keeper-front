// components/notifications/types.ts
export const NotificationType = {
  SYSTEM: 'SYSTEM',
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  WHATSAPP: 'WHATSAPP'
};

export const NotificationStatus = {
  UNREAD: 'UNREAD',
  READ: 'READ'
};

export type NotifStatus = keyof typeof NotificationStatus;
export type NotifType = keyof typeof NotificationType;

export interface Notification {
  id: number;
  title: string;
  message: string;
  notificationType: NotifType;
  status: NotifStatus;
  icon?: React.ReactNode;
  image?: string;
  to: number;
  from?: string | 'SYSTEM';
  broadcast: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface NotificationRequest {
    ids: number[];
    all: boolean;
};