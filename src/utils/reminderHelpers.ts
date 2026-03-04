import { CustomUnitType } from '../interfaces/notifications';

export const calculateReminderDate = (
  endDate: Date,
  value: number,
  unit: CustomUnitType
): Date => {
  const reminderDate = new Date(endDate);

  switch (unit) {
    case 'days':
      reminderDate.setDate(reminderDate.getDate() - value);
      break;
    case 'weeks':
      reminderDate.setDate(reminderDate.getDate() - value * 7);
      break;
    case 'months':
      reminderDate.setMonth(reminderDate.getMonth() - value);
      break;
    default:
      break;
  }

  return reminderDate;
};

export const formatDate = (date: Date): string => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const getDaysUntilEnd = (endDate: Date): number => {
  const now = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getWeekInfo = (endDate: Date, t: (key: string) => string) => {
  const date = new Date(endDate);

  const days = [
    t('calendar.days_of_week.0'),
    t('calendar.days_of_week.1'),
    t('calendar.days_of_week.2'),
    t('calendar.days_of_week.3'),
    t('calendar.days_of_week.4'),
    t('calendar.days_of_week.5'),
    t('calendar.days_of_week.6'),
  ];

  const weekDays = [];
  const startOfWeek = new Date(date);
  // Get Monday of the week (1 = Monday, 0 = Sunday)
  const dayOfWeek = date.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startOfWeek.setDate(date.getDate() + diff);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDays.push({
      label: days[i],
      date: day.getDate(),
      fullDate: day,
      active: day.toDateString() === date.toDateString(),
    });
  }

  return weekDays;
};

export const getQuickReminderOptions = (
  daysUntilEnd: number,
  t: (key: string, defaultValue?: string) => string
) => {
  const options = [];

  if (daysUntilEnd >= 1) {
    options.push({
      value: 'DAY_1',
      label: t('reminders.options.DAY_1') || '1 day before',
      days: 1,
    });
  }
  if (daysUntilEnd >= 2) {
    options.push({
      value: 'DAY_2',
      label: t('reminders.options.DAY_2') || '2 days before',
      days: 2,
    });
  }
  if (daysUntilEnd >= 7) {
    options.push({
      value: 'WEEK_1',
      label: t('reminders.options.WEEK_1') || '1 week before',
      days: 7,
    });
  }
  if (daysUntilEnd >= 14) {
    options.push({
      value: 'WEEK_2',
      label: t('reminders.options.WEEK_2') || '2 weeks before',
      days: 14,
    });
  }

  return options;
};

export const getMaxCustomValue = (
  daysUntilEnd: number,
  unit: CustomUnitType
): number => {
  if (unit === 'days') {
    return Math.max(1, daysUntilEnd);
  } else if (unit === 'weeks') {
    return Math.floor(daysUntilEnd / 7);
  } else if (unit === 'months') {
    return Math.floor(daysUntilEnd / 30);
  }
  return 1;
};
