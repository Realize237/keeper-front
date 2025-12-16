import { Subscription } from './subscription';

export const NotificationType = {
  SYSTEM: 'SYSTEM',
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  WHATSAPP: 'WHATSAPP',
};

export const NotificationStatus = {
  UNREAD: 'UNREAD',
  READ: 'READ',
};

export type NotifStatus = keyof typeof NotificationStatus;
export type NotificationType = keyof typeof NotificationType;

export interface Notification {
  id: number;
  title: string;
  message: string;
  notificationType: NotificationType;
  status: NotifStatus;
  icon?: React.ReactNode;
  image?: string;
  to: number;
  from?: string | 'SYSTEM';
  broadcast: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationRequest {
  ids: number[];
  all: boolean;
}

export const CustomUnits = {
  MINS: 'minutes',
  HOURS: 'hours',
  DAYS: 'days',
  WEEKS: 'weeks',
};

export type CustomUnitType = moment.unitOfTime.DurationConstructor;

export interface ReminderOptionType {
  value: string;
  subscriptionType: 'BOTH' | 'YEARLY';
}

export interface ICustomReminder {
  type: NotificationType[];
  value: number;
  unit: CustomUnitType;
}

export interface INotificationReminder {
  id: string;
  value: string;
  custom?: ICustomReminder;
}

export interface IReminderRequest {
  unit: string;
  value: number;
  notificationType?: NotificationType[];
  subscriptionId: number;
}

export interface IReminderUpdate extends IReminderRequest {
  id: number;
}

export interface ISubscriptionRemindersUpdate {
  updatedReminders: IReminderRequest[];
  subscriptionId: number;
}

export interface IReminderResponse extends IReminderUpdate {
  subscription: Subscription;
}
