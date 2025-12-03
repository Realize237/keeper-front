// components/notifications/types.ts

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  timestamp: Date;
  icon?: React.ReactNode;
  avatar?: string;
  category?: string;
  image?: string;
};
