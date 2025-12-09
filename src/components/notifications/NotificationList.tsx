import React from 'react';
import NotificationItem from '../../components/notifications/NotificationItem';
import type { Notification } from '../../interfaces/notifications';

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
  if (!notifications || !notifications.length) {
    return (
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-8 text-center">
        <h3 className="text-lg font-semibold text-neutral-200">No notifications</h3>
        <p className="text-sm text-neutral-400 mt-2">You're all caught up!</p>
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
