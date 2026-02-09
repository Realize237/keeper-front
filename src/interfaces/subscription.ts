import type { CARD_TYPES } from './cards';
import { IReminderResponse } from './notifications';
import type { UserResponse } from './users';

export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  BASIC: 'basic',
  PREMIUM: 'premium',
};

export const SUBSCRIPTION_TYPES = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

export const SUBSCRIPTION_TYPES_CONFIG: Record<
  keyof typeof SUBSCRIPTION_TYPES,
  { color: string }
> = {
  MONTHLY: { color: 'bg-green-700' },
  YEARLY: { color: 'bg-blue-700' },
};

export interface SubscriptionDetails {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  iconUrl: string;
  category: string;
  subCategory: string;
  merchant_name: string;
}

export interface Subscription {
  id: number;
  plan: keyof typeof SUBSCRIPTION_PLANS;
  type: keyof typeof SUBSCRIPTION_TYPES;
  price: number;
  reccurring: boolean;
  card: keyof typeof CARD_TYPES;
  calendarLink?: string;
  details: SubscriptionDetails;
  user: UserResponse;
  reminders: IReminderResponse[];
  created_at: string;
  updated_at: string;
}

export type SubscriptionsGroupedByDay = Record<number, Subscription[]>;

export const SubscriptionModalTypes = {
  DETAILS: 'SubscriptionDetailModal',
  LIST: 'SelectedDaySubscriptionListModal',
} as const;

export type SubscriptionModalType =
  (typeof SubscriptionModalTypes)[keyof typeof SubscriptionModalTypes];

export interface IAddToCalendar {
  title: string;
  description: string;
}
