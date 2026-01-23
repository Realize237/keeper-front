import { ToastOptions } from 'react-hot-toast';
import { ReminderOptionType } from '../interfaces/notifications';

export const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export const monthsOfYear: Record<number, string> = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
} as const;

export const ReminderOptions: ReminderOptionType[] = [
  { value: 'MIN_5', subscriptionType: 'BOTH' },
  { value: 'MIN_10', subscriptionType: 'BOTH' },
  { value: 'MIN_30', subscriptionType: 'BOTH' },
  { value: 'HOUR_1', subscriptionType: 'BOTH' },
  { value: 'DAY_1', subscriptionType: 'BOTH' },
  { value: 'DAY_2', subscriptionType: 'BOTH' },
  { value: 'WEEK_1', subscriptionType: 'BOTH' },
  { value: 'WEEK_2', subscriptionType: 'BOTH' },
  { value: 'WEEK_3', subscriptionType: 'BOTH' },
  { value: 'MONTH_1', subscriptionType: 'YEARLY' },
  { value: 'MONTH_2', subscriptionType: 'YEARLY' },
  { value: 'MONTH_3', subscriptionType: 'YEARLY' },
  { value: 'MONTH_4', subscriptionType: 'YEARLY' },
  { value: 'MONTH_5', subscriptionType: 'YEARLY' },
  { value: 'MONTH_6', subscriptionType: 'YEARLY' },
  { value: 'CUSTOM', subscriptionType: 'BOTH' },
];

export const SOCKET_OPTIONS = {
  transports: ['websocket'],
  autoConnect: true,
  withCredentials: true,
};

export const TOASTER_OPTIONS: ToastOptions = {
  duration: 5000,
  position: 'top-right',
};

export const PRIVACY_POLICY_URL = '/legal/privacy-policy';
export const TERMS_OF_SERVICE_URL = '/legal/terms-of-service';
