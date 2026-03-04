import { useTranslation } from 'react-i18next';
import { INotificationReminder } from '../../../interfaces/notifications';
import { formatReminderDisplay } from '../../../utils/reminders';
import {
  calculateReminderDate,
  formatDate,
} from '../../../utils/reminderHelpers';
import Spinner from '../../ui/Spinner';
import { ReminderCard } from './ReminderCard';

interface ReminderListProps {
  reminders: INotificationReminder[];
  endDate: Date | string;
  isFetching: boolean;
  isAnyMutationLoading: boolean;
  deletingReminderId: string | null;
  editingReminderId: string | null;
  onEdit: (reminder: INotificationReminder) => void;
  onDelete: (id: string) => void;
}

export const ReminderList = ({
  reminders,
  endDate,
  isFetching,
  isAnyMutationLoading,
  deletingReminderId,
  editingReminderId,
  onEdit,
  onDelete,
}: ReminderListProps) => {
  const { t } = useTranslation();

  // Group reminders by date
  const remindersByDate = new Map<string, INotificationReminder[]>();

  reminders.forEach((reminder) => {
    if (!endDate) return;

    let reminderDate: Date;

    if (reminder.custom) {
      reminderDate = calculateReminderDate(
        new Date(endDate),
        reminder.custom.value,
        reminder.custom.unit
      );
    } else {
      // Parse quick option (DAY_1, DAY_2, WEEK_1, WEEK_2)
      const match = reminder.value.match(/(DAY|WEEK)_(\d+)/);
      if (match) {
        const [, unit, value] = match;
        const numValue = parseInt(value);
        const unitType = unit === 'DAY' ? 'days' : 'weeks';
        reminderDate = calculateReminderDate(
          new Date(endDate),
          numValue,
          unitType as 'days' | 'weeks'
        );
      } else {
        reminderDate = new Date(endDate);
      }
    }

    const dateKey = formatDate(reminderDate);
    if (!remindersByDate.has(dateKey)) {
      remindersByDate.set(dateKey, []);
    }
    remindersByDate.get(dateKey)!.push(reminder);
  });

  let globalIndex = 0;

  return (
    <div className="mt-8 space-y-6 relative">
      {isFetching && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
          <Spinner className="border-primary" />
        </div>
      )}

      {Array.from(remindersByDate.entries()).map(([date, dateReminders]) => (
        <div key={date} className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {date}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          {dateReminders.map((reminder) => {
            const currentIndex = ++globalIndex;
            const displayText = reminder.custom
              ? formatReminderDisplay(
                  reminder as INotificationReminder & {
                    custom: NonNullable<INotificationReminder['custom']>;
                  },
                  t
                )
              : t(`reminders.options.${reminder.value}`);

            const notificationTypes = reminder.custom?.type || ['EMAIL'];

            return (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                index={currentIndex}
                displayText={displayText}
                notificationTypes={notificationTypes}
                isDeleting={deletingReminderId === reminder.id}
                isUpdating={editingReminderId === reminder.id}
                isAnyMutationLoading={isAnyMutationLoading}
                onEdit={() => onEdit(reminder)}
                onDelete={() => onDelete(reminder.id)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
