import { useTranslation } from 'react-i18next';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdEmail, MdNotifications } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import {
  INotificationReminder,
  NotificationType,
} from '../../../interfaces/notifications';
import Spinner from '../../ui/Spinner';

interface ReminderCardProps {
  reminder: INotificationReminder;
  index: number;
  displayText: string;
  notificationTypes: NotificationType[];
  isDeleting: boolean;
  isUpdating: boolean;
  isAnyMutationLoading: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const ReminderCard = ({
  index,
  displayText,
  notificationTypes,
  isDeleting,
  isUpdating,
  isAnyMutationLoading,
  onEdit,
  onDelete,
}: ReminderCardProps) => {
  const { t } = useTranslation();

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'EMAIL':
        return <MdEmail className="text-sm" />;
      case 'SMS':
        return <BiMessageDetail className="text-sm" />;
      case 'WHATSAPP':
        return <FaWhatsapp className="text-sm" />;
      case 'SYSTEM':
        return <MdNotifications className="text-sm" />;
      default:
        return null;
    }
  };

  const getNotificationStyle = (type: NotificationType) => {
    switch (type) {
      case 'EMAIL':
        return 'bg-yellow-500 text-black';
      case 'SMS':
        return 'bg-blue-600 text-white';
      case 'WHATSAPP':
        return 'bg-green-600 text-white';
      case 'SYSTEM':
        return 'bg-orange-700 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="flex items-start">
      <div className="relative flex-1 bg-muted/60 rounded-2xl p-5 shadow-md">
        <div className="absolute left-3 top-4 bottom-4 w-1 rounded-full bg-primary" />

        <div className="pl-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-base font-semibold">
                {t('reminders.text.reminder')} {index}
              </p>
              <span className="text-xs text-muted-foreground">
                {displayText}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onEdit}
                title={t('reminders.actions.edit', 'Edit reminder')}
                disabled={isAnyMutationLoading}
                className="bg-accent text-white p-2 rounded-full hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isUpdating ? (
                  <Spinner className="border-primary" />
                ) : (
                  <FaEdit className="text-xs" />
                )}
              </button>

              {isDeleting ? (
                <Spinner className="border-primary" />
              ) : (
                <button
                  onClick={onDelete}
                  title={t('reminders.actions.delete', 'Delete reminder')}
                  disabled={isAnyMutationLoading}
                  className="bg-danger text-white p-2 rounded-full hover:bg-danger/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <FaTrash className="text-xs" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-4">
            <span className="text-xs text-muted-foreground">
              {t('reminders.text.notification_medium', 'Notification medium')}
            </span>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {notificationTypes.map((type) => (
                <span
                  key={type}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${getNotificationStyle(
                    type
                  )}`}
                >
                  {getNotificationIcon(type)}
                  <span>{type}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
