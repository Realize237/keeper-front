import React from 'react';
import NotificationItem from '../../components/notifications/NotificationItem';
import type { Notification } from '../../interfaces/notifications';
import { useTranslation } from 'react-i18next';

type Props = {
  notifications: Notification[];
  swipedId: number | null;
  setSwipedId: (id: number | null) => void;
  selectMode: boolean;
  selectedIds: Set<number>;
  toggleSelect: (id: number) => void;
  onToggleRead: (id: number) => void;
  onDelete: (id: number) => void;
};

const NotificationList: React.FC<Props> = ({
  notifications,
  swipedId,
  setSwipedId,
  selectMode,
  selectedIds,
  toggleSelect,
  onToggleRead,
  onDelete,
}) => {
  const { t } = useTranslation();
  if (!notifications || !notifications.length) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <h3 className="text-lg font-semibold text-surface-foreground">
          {t('notifications.empty.title')}
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          {t('notifications.empty.subtitle')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          isSwiped={swipedId === notification.id}
          setSwipedId={setSwipedId}
          selectMode={selectMode}
          selected={selectedIds.has(notification.id)}
          toggleSelect={() => toggleSelect(notification.id)}
          onToggleRead={() => onToggleRead(notification.id)}
          onDelete={() => onDelete(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationList;
