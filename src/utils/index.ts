import { IMAGES } from '../assets';
import { NavItems } from '../constants/NavItems';
import type { BillingResult } from '../interfaces/billings';
import type { Value } from '../interfaces/calendar';
import type { Subscription } from '../interfaces/subscription';
import { dateLocales } from './dateLocales';
import i18n from './i18n';
import { formatDistanceToNow } from 'date-fns';

// Helper function to format days into a human-readable string
export const formatDaysRemaining = (days: number): string => {
  if (days === 0) return i18n.t('billing.due_tootday');
  if (days === 1) return i18n.t('billing.due_in_one_day');

  // For less than 30 days, just show days
  if (days < 30) {
    return i18n.t('billing.due_in_days', { count: days });
  }

  // For 30+ days, show months and days
  const months = Math.floor(days / 30);
  const remainingDays = days % 30;

  if (remainingDays === 0) {
    return i18n.t('billing.due_in_months', { count: months });
  }

  // For combined months and days, we need separate translations for singular/plural
  const monthsText = i18n.t('billing.months', { count: months });
  const daysText = i18n.t('billing.days', { count: remainingDays });

  return i18n.t('billing.due_in_time', {
    months: monthsText,
    days: daysText,
  });
};

// Helper to check if a subscription should be included in monthly totals
export const shouldIncludeInMonthlyTotal = (
  subscription: Subscription,
  viewingDate: Date = new Date()
): boolean => {
  const endDate = subscription.details.endDate
    ? new Date(subscription.details.endDate)
    : null;

  if (!endDate) return false;

  // Only include if viewing month/year matches end date month/year
  const endMonth = endDate.getMonth();
  const endYear = endDate.getFullYear();
  const viewingMonth = viewingDate.getMonth();
  const viewingYear = viewingDate.getFullYear();

  return endMonth === viewingMonth && endYear === viewingYear;
};

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

export const getNextBillingDate = (
  startDate: Date,
  endDate: Date | null,
  fromDate: Date = new Date()
): BillingResult => {
  // Normalize dates to midnight
  const normalize = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const start = normalize(startDate);
  const end = endDate ? normalize(endDate) : new Date(2099, 11, 31);
  const today = normalize(fromDate);

  // Helper to compute days remaining from today to end date
  const computeDaysLeft = (target: Date): number =>
    Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Check if today is before subscription starts
  if (today < start) {
    const daysLeft = computeDaysLeft(start);
    return {
      date: start,
      status: 'ACTIVE',
      daysRemaining: daysLeft,
      formattedTimeRemaining: formatDaysRemaining(daysLeft),
    };
  }

  // Check if today is after subscription ends
  if (today > end) {
    return {
      date: null,
      status: 'EXPIRED',
      daysRemaining: null,
      formattedTimeRemaining: undefined,
    };
  }

  // Subscription is active - show days until end date
  const isDueToday = today.getTime() === end.getTime();
  const daysLeft = isDueToday ? 0 : computeDaysLeft(end);

  return {
    date: end,
    status: isDueToday ? 'DUE_TODAY' : 'ACTIVE',
    daysRemaining: daysLeft,
    formattedTimeRemaining: formatDaysRemaining(daysLeft),
  };
};

export const isEmpty = (object: Record<string | number, unknown>): boolean => {
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

export const formatToReadableDate = (
  dateInput: string | Date,
  locale: string = 'fr-FR'
): string => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
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
export const processError = (err: unknown, fallbackMessage?: string) => {
  const error = err as {
    response?: {
      data?: {
        message?: string;
        error?: { code?: string };
      };
    };
    message?: string;
  };

  const defaultMessage =
    fallbackMessage || i18n.t('common.errors.requestFailed', 'Request failed');

  const errorMessage =
    error?.response?.data?.message || error?.message || defaultMessage;
  const errorCode = error?.response?.data?.error?.code;

  const customError = new Error(errorMessage) as Error & { code?: string };
  if (errorCode) {
    customError.code = errorCode;
  }

  throw customError;
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

export const formatTimeFromNow = (date: string | Date | number): string => {
  const locale = dateLocales[i18n.language] || dateLocales.fr;
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale,
  });
};

export const activeNavItems = NavItems.filter((item) => item.visible);

export const pluralize = (count: number, singular: string, plural: string) =>
  `${count} ${count === 1 ? singular : plural}`;

export function groupClassNames(
  ...classes: (string | undefined | null | false)[]
) {
  return classes.filter(Boolean).join(' ');
}

export const currentYear = new Date().getFullYear();

export const homeAnchor = (id: string) => `/#${id}`;
