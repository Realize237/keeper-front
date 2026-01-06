import {
  ICustomReminder,
  INotificationReminder,
  NotificationType,
} from '../interfaces/notifications';

export function getReminderDate(
  key: string,
  isCustom = false,
  custom?: ICustomReminder
) {
  const reminderMap: Record<
    string,
    [number, moment.unitOfTime.DurationConstructor]
  > = {
    MIN_5: [5, 'minutes'],
    MIN_10: [10, 'minutes'],
    MIN_30: [30, 'minutes'],
    HOUR_1: [1, 'hours'],
    DAY_1: [1, 'days'],
    DAY_2: [2, 'days'],
    WEEK_1: [1, 'weeks'],
    WEEK_2: [2, 'weeks'],
    WEEK_3: [3, 'weeks'],
    MONTH_1: [1, 'months'],
    MONTH_2: [2, 'months'],
    MONTH_3: [3, 'months'],
    MONTH_4: [4, 'months'],
    MONTH_5: [5, 'months'],
    MONTH_6: [6, 'months'],
    CUSTOM: [0, 'minutes'], // placeholder, will be overridden by custom
  };

  const mapped = reminderMap[key];

  if (!mapped || key === 'CUSTOM') {
    if (!isCustom || !custom?.value || !custom?.unit) {
      throw new Error('Custom reminder requires value and unit');
    }
    return { value: custom.value, unit: custom.unit };
  }

  return { value: mapped[0], unit: mapped[1] };
}

export function getReminderString(
  value: number,
  unit: moment.unitOfTime.DurationConstructor,
  notificationType?: NotificationType[]
): { combinedKeyValue: string; isCustom: boolean } {
  const types = (notificationType || ['EMAIL']).sort().join('_');
  const key = `CUSTOM_${value}_${unit}_${types}`;
  return { combinedKeyValue: key, isCustom: true };
}
export function getKeyFromValueUnit(
  value: number,
  unit: moment.unitOfTime.DurationConstructor
): string | null {
  const map: Record<string, string> = {
    '5-minutes': 'MIN_5',
    '10-minutes': 'MIN_10',
    '30-minutes': 'MIN_30',
    '1-hours': 'HOUR_1',
    '1-days': 'DAY_1',
    '2-days': 'DAY_2',
    '1-weeks': 'WEEK_1',
    '2-weeks': 'WEEK_2',
    '3-weeks': 'WEEK_3',
    '1-months': 'MONTH_1',
    '2-months': 'MONTH_2',
    '3-months': 'MONTH_3',
    '4-months': 'MONTH_4',
    '5-months': 'MONTH_5',
    '6-months': 'MONTH_6',
  };
  return map[`${value}-${unit}`] || null;
}

export const formatReminderDisplay = (
  reminder: INotificationReminder,
  t: (key: string, options?: any) => string
) => {
  if (!reminder.custom) {
    return t(`reminders.options.${reminder.value}`);
  }

  const { value, unit, type } = reminder.custom;

  // Translate unit + value (handle plural!)
  // You need proper plural handling for units
  // Simple way:
  const units = {
    minutes: t('common.units.minute', { count: value }),
    hours: t('common.units.hour', { count: value }),
    days: t('common.units.day', { count: value }),
    weeks: t('common.units.week', { count: value }),
    months: t('common.units.month', { count: value }),
  };

  const timePart = `${units[unit] || unit} ${t('reminders.before')}`;

  const types = type?.map((nt) => t(`reminders.types.${nt}`)).join(', ') || '';

  const viaPart = types ? `${t('reminders.via')} ${types}` : '';

  return [timePart, viaPart].filter(Boolean).join(', ');
};
