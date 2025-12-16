import { IMAGES } from '../assets';
import { NavItems } from '../constants/NavItems';
import type { BillingResult } from '../interfaces/billings';
import type { Value } from '../interfaces/calendar';
import { ICustomReminder, NotifType } from '../interfaces/notifications';
import type { Subscription } from '../interfaces/subscription';
import moment from 'moment';

export const getMonthMatrixMondayFirst = (date: Date): string[][] => {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11

  const firstDay = new Date(year, month, 1);
  const jsWeekday = firstDay.getDay();

  const firstWeekday = (jsWeekday + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: string[][] = [];
  let currentWeek: string[] = [];

  for (let i = 0; i < firstWeekday; i++) {
    currentWeek.push('');
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(String(day));

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push('');
    }
    weeks.push(currentWeek);
  }

  return weeks;
};

export const isSubscriptionActiveThisMonth = (
  startDate: Date,
  endDate: Date,
  currentDate: Date
) => {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const isAfterStart =
    currentYear > startYear ||
    (currentYear === startYear && currentMonth >= startMonth);
  const isBeforeEnd =
    currentYear < endYear ||
    (currentYear === endYear && currentMonth <= endMonth);

  return isAfterStart && isBeforeEnd;
};

const addMonthsSafe = (d: Date, months: number): Date => {
  const copy = new Date(d);
  const targetMonth = copy.getMonth() + months;
  copy.setMonth(targetMonth);
  while (copy.getMonth() !== ((targetMonth % 12) + 12) % 12) {
    copy.setDate(copy.getDate() - 1);
  }
  return copy;
};

const addYearsSafe = (d: Date, years: number): Date => {
  const copy = new Date(d);
  const targetYear = copy.getFullYear() + years;
  copy.setFullYear(targetYear);
  if (copy.getMonth() !== d.getMonth()) {
    copy.setMonth(d.getMonth() + 1, 0);
  }
  return copy;
};

export const getNextBillingDate = (
  startDate: Date,
  endDate: Date | null,
  type: 'MONTHLY' | 'YEARLY',
  fromDate: Date = new Date()
): BillingResult => {
  // Normalize dates to midnight
  const normalize = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const start = normalize(startDate);
  const end = endDate ? normalize(endDate) : new Date(2099, 11, 31); // Default to year 2099
  const today = normalize(fromDate);

  // Check if subscription has expired (today is past endDate)
  if (today > end) {
    return { date: null, status: 'EXPIRED', daysRemaining: null };
  }

  // Check if startDate is after endDate (invalid)
  if (start > end) {
    return { date: null, status: 'EXPIRED', daysRemaining: null };
  }

  // Helper to compute days remaining
  const computeDaysLeft = (target: Date): number =>
    Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Find the next billing date starting from startDate
  let nextBilling = new Date(start);
  let i = 0;

  while (nextBilling <= end) {
    // If this billing date is today or in the future
    if (nextBilling >= today) {
      const isDueToday = nextBilling.getTime() === today.getTime();
      const daysLeft = isDueToday ? 0 : computeDaysLeft(nextBilling);

      return {
        date: nextBilling,
        status: isDueToday ? 'DUE TODAY' : 'ACTIVE',
        daysRemaining: daysLeft,
      };
    }

    // Move to next billing cycle
    i++;
    nextBilling =
      type === 'MONTHLY' ? addMonthsSafe(start, i) : addYearsSafe(start, i);
  }

  // No future billing date found within subscription period
  return {
    date: null,
    status: 'EXPIRED',
    daysRemaining: null,
  };
};

export const isEmpty = (object: Record<string | number, any>): boolean => {
  return Object.keys(object).length === 0;
};

export const normalizedDate = (value: Value): Date => {
  if (value instanceof Date) return value;
  if (Array.isArray(value) && value[0] instanceof Date) return value[0];
  return new Date(); // fallback to today
};

export const getSubscriptionCardImage = (
  subscription: Subscription | undefined
) => {
  if (!subscription) return IMAGES.Visa; // default fallback

  switch (subscription.card) {
    case 'MASTER':
      return IMAGES.MasterCard;
    case 'PAYPAL':
      return IMAGES.Paypal;
    default:
      return IMAGES.Visa;
  }
};

export const formatToReadableDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const updateCurrentDateToSelectedDate = (
  currentDate: Date,
  clickedDay: number
): Date => {
  // Validate inputs
  if (!(currentDate instanceof Date) || isNaN(currentDate.getTime())) {
    throw new Error('Invalid currentDate: must be a valid Date object');
  }

  if (!Number.isInteger(clickedDay) || clickedDay < 1 || clickedDay > 31) {
    throw new Error('Invalid clickedDay: must be an integer between 1 and 31');
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const newDate = new Date(year, month, clickedDay);

  if (newDate.getMonth() !== month) {
    throw new Error(`Invalid day ${clickedDay} for month ${month + 1}`);
  }

  return newDate;
};

// to format api error message
export const processError = (err: unknown) => {
  throw new Error(
    err?.response?.data?.message || err.message || 'Request failed'
  );
};

export const getAvatarInitials = (name?: string | null): string => {
  if (!name?.trim()) {
    return '?';
  }

  const words = name
    .trim()
    .replace(/[^a-zA-ZÀ-ÿ\s]/g, '') // Keep letters and accented characters
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) {
    return '?';
  }

  const first = words[0][0];

  if (words.length === 1) {
    const secondChar = words[0][1];
    return (first + (secondChar || '')).toUpperCase();
  }

  const second = words[1][0];
  return (first + second).toUpperCase();
};

export const formatTime = (date: string | Date | number) => {
  return moment(date).fromNow();
};

export function getReminderDate(
  reminder: string,
  isCustom = false,
  custom?: ICustomReminder
) {
  const reminderMap: Record<
    string,
    [number, moment.unitOfTime.DurationConstructor]
  > = {
    '5 minutes before': [5, 'minutes'],
    '10 minutes before': [10, 'minutes'],
    '30 minutes before': [30, 'minutes'],
    '1 hour before': [1, 'hours'],
    '1 day before': [1, 'days'],
    '2 days before': [2, 'days'],
    '1 week before': [1, 'weeks'],
    '2 weeks before': [2, 'weeks'],
    '3 weeks before': [3, 'weeks'],
    '1 month before': [1, 'months'],
    '2 months before': [2, 'months'],
    '3 months before': [3, 'months'],
    '4 months before': [4, 'months'],
    '5 months before': [5, 'months'],
    '6 months before': [6, 'months'],
  };

  const mapped = reminderMap[reminder];
  if (!mapped) {
    if (!custom || !custom.value || (!custom.unit && isCustom)) {
      throw new Error(
        "Couldn't add reminder select atleast date and time of custom reminder."
      );
    }
    return { unit: custom.unit, value: custom.value };
  }

  const [value, unit] = mapped;
  return { value, unit };
}

export function getReminderString(
  value: number,
  unit: moment.unitOfTime.DurationConstructor,
  notificationType?: NotifType[]
): { combinedKeyValue: string; isCustom: boolean } {
  const reverseReminderMap: Record<string, string> = {
    '5-minutes': '5 minutes',
    '10-minutes': '10 minutes',
    '30-minutes': '30 minutes',
    '1-hours': '1 hour',
    '1-days': '1 day',
    '2-days': '2 days',
    '1-weeks': '1 week',
    '2-weeks': '2 weeks',
    '3-weeks': '3 weeks',
    '1-months': '1 month',
    '2-months': '2 months',
    '3-months': '3 months',
    '4-months': '4 months',
    '5-months': '5 months',
    '6-months': '6 months',
  };

  const key = `${value}-${unit}`;
  const reminder = reverseReminderMap[key];

  if (!reminder) {
    const combinedKey = `${value} ${unit} before, via ${
      notificationType?.join(',') ?? 'EMAIL'
    }`;
    return { combinedKeyValue: combinedKey, isCustom: true };
  }

  return { combinedKeyValue: `${reminder} before`, isCustom: false };
}

export const activeNavItems = NavItems.filter((item) => item.visible);

export const pluralize = (count: number, singular: string, plural: string) =>
  `${count} ${count === 1 ? singular : plural}`;

export function groupClassNames(
  ...classes: (string | undefined | null | false)[]
) {
  return classes.filter(Boolean).join(' ');
}
