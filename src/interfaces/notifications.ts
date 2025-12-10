export const NotificationType = {
  SYSTEM: "SYSTEM",
  EMAIL: "EMAIL",
  SMS: "SMS",
  WHATSAPP: "WHATSAPP",
};

export const NotificationStatus = {
  UNREAD: "UNREAD",
  READ: "READ",
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
  from?: string | "SYSTEM";
  broadcast: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationRequest {
  ids: number[];
  all: boolean;
}

export const CustomUnits = {
  MINS: "minutes",
  HOURS: "hours",
  DAYS: "days",
  WEEKS: "weeks",
};

export type CustomUnitType = moment.unitOfTime.DurationConstructor;

export interface ReminderOptionType {
  value: string;
  subscriptionType: "BOTH" | "YEARLY";
}

export const ReminderOptions: ReminderOptionType[] = [
  { value: "5 minutes before", subscriptionType: "BOTH" },
  { value: "10 minutes before", subscriptionType: "BOTH" },
  { value: "30 minutes before", subscriptionType: "BOTH" },
  { value: "1 hour before", subscriptionType: "BOTH" },
  { value: "1 day before", subscriptionType: "BOTH" },
  { value: "2 days before", subscriptionType: "BOTH" },
  { value: "1 week", subscriptionType: "BOTH" },
  { value: "2 weeks", subscriptionType: "BOTH" },
  { value: "3 weeks", subscriptionType: "BOTH" },
  { value: "1 month", subscriptionType: "YEARLY" },
  { value: "2 months", subscriptionType: "YEARLY" },
  { value: "3 months", subscriptionType: "YEARLY" },
  { value: "4 months", subscriptionType: "YEARLY" },
  { value: "5 months", subscriptionType: "YEARLY" },
  { value: "6 months", subscriptionType: "YEARLY" },
  { value: "Custom", subscriptionType: "BOTH" },
];

export interface ICustomReminder {
  type: NotifType[];
  value: number;
  unit: CustomUnitType;
}

export interface INotificationReminder {
  id: string;
  value: string;
  custom?: ICustomReminder;
}

export type IReminderRequest = Omit<INotificationReminder, "id">;
