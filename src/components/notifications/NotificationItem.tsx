import React, { useRef } from 'react';
import {
  FiCheckCircle,
  FiCircle,
  FiTrash2,
  FiCheck,
  FiMoreHorizontal,
  FiMessageCircle,
} from 'react-icons/fi';
import {
  NotificationStatus,
  NotificationType,
  type Notification,
} from '../../interfaces/notifications';
import { MdEmail, MdSecurity, MdUndo, MdWhatsapp } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { formatTimeFromNow } from '../../utils';

type Props = {
  notification: Notification;
  isSwiped: boolean;
  setSwipedId: (id: number | null) => void;
  selectMode: boolean;
  selected: boolean;
  toggleSelect: () => void;
  onToggleRead: () => void;
  onDelete: () => void;
};

const NotificationItem: React.FC<Props> = ({
  notification,
  isSwiped,
  setSwipedId,
  selectMode,
  selected,
  toggleSelect,
  onToggleRead,
  onDelete,
}) => {
  const touchStartX = useRef<number | null>(null);
  const { t } = useTranslation();

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const [showImagePreview, setShowImagePreview] = React.useState(false);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setSwipedId(notification.id);
    } else if (diff < -50) {
      setSwipedId(null);
    }
    touchStartX.current = null;
  };

  const iconMap = {
    [NotificationType.SYSTEM]: <MdSecurity className="w-7 h-7" />,
    [NotificationType.EMAIL]: <MdEmail className="w-7 h-7" />,
    [NotificationType.SMS]: <FiMessageCircle className="w-7 h-7" />,
    [NotificationType.WHATSAPP]: <MdWhatsapp className="w-7 h-7" />,
  };

  return (
    <div className="relative w-full">
      {(isSwiped || showImagePreview) && (
        <div className="absolute inset-0 flex items-center justify-end pr-4 gap-2 pointer-events-none">
          <button
            onClick={onToggleRead}
            title={
              notification.status === NotificationStatus.READ
                ? t('notifications.actions.mark_unread')
                : t('notifications.actions.mark_read')
            }
            className="cursor-pointer p-2 rounded-lg border border-border text-foreground hover:opacity-70 pointer-events-auto"
          >
            {notification.status === NotificationStatus.READ ? (
              <MdUndo className="w-4 h-4" />
            ) : (
              <FiCheck className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onDelete}
            title="Delete"
            className="cursor-pointer p-2 rounded-lg text-danger/60 border border-danger/60 hover:opacity-70 pointer-events-auto"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      )}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`relative transition-transform duration-200 transform ${
          isSwiped ? '-translate-x-24' : 'translate-x-0'
        } rounded-3xl p-4 ${
          notification.status === NotificationStatus.READ
            ? 'border border-border'
            : 'bg-muted'
        } overflow-hidden`}
      >
        <div className="flex items-start gap-4">
          {selectMode ? (
            <button onClick={toggleSelect} className="mt-1 shrink-0">
              {selected ? (
                <FiCheckCircle className="w-6 h-6 text-accent" />
              ) : (
                <FiCircle className="w-6 h-6 text-foreground" />
              )}
            </button>
          ) : null}

          <div className="shrink-0 mt-1">
            <div
              className={`w-14 h-14 rounded-full ${
                notification.status === NotificationStatus.READ
                  ? 'bg-neutral-800'
                  : 'bg-[#171717]'
              } flex items-center justify-center text-white`}
            >
              {iconMap[notification.notificationType]}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4
                className={`font-semibold truncate ${
                  notification.status === NotificationStatus.READ
                    ? 'text-neutral-300'
                    : 'text-white'
                }`}
              >
                {notification.title}
              </h4>
              <div className="text-xs text-neutral-400 ml-2 whitespace-nowrap">
                {formatTimeFromNow(notification.createdAt)}
              </div>
            </div>
            <p
              className={`text-sm mt-1 line-clamp-2 ${
                notification.status === NotificationStatus.READ
                  ? 'text-neutral-400'
                  : 'text-neutral-200'
              }`}
            >
              {notification.message}
            </p>
            {showImagePreview && notification.image && (
              <div
                className="
                w-full md:w-4/12 overflow-hidden rounded-xl 
                aspect-video my-5 
              "
              >
                <img
                  src={notification.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="shrink-0 ml-2">
            {!selectMode && (
              <button
                onClick={() => {
                  if (notification.image) {
                    setShowImagePreview((prev) => !prev); // toggle image preview
                  } else {
                    setSwipedId(isSwiped ? null : notification.id); // default behavior
                  }
                }}
                className="p-2 rounded-lg hover:bg-neutral-800/50"
              >
                <FiMoreHorizontal
                  className={`w-5 h-5 text-neutral-400 cursor-pointer transition-transform ${
                    isSwiped ? 'rotate-180' : ''
                  }`}
                />
              </button>
            )}
          </div>
        </div>
        {!isSwiped && (
          <div className="hidden md:flex items-center justify-end pr-4 gap-2 pointer-events-none">
            <button
              onClick={onToggleRead}
              title={
                notification.status === NotificationStatus.READ
                  ? t('notifications.actions.mark_unread')
                  : t('notifications.actions.mark_read')
              }
              className="cursor-pointer p-2 rounded-lg border border-neutral-700 text-neutral-700 hover:opacity-70 pointer-events-auto"
            >
              {notification.status === NotificationStatus.READ ? (
                <MdUndo className="w-4 h-4" />
              ) : (
                <FiCheck className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onDelete}
              title={t('common.delete')}
              className="cursor-pointer p-2 rounded-lg text-red-600/60 border border-red-600/60 hover:opacity-70 pointer-events-auto"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
