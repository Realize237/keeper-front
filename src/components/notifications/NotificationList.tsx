// components/notifications/NotificationList.tsx
import React from 'react';
import NotificationItem from '../../components/notifications/NotificationItem';
import type { Notification } from '../../interfaces/notifications';

type Props = {
  notifications: Notification[];
  swipedId: string | null;
  setSwipedId: (id: string | null) => void;
  selectMode: boolean;
  selectedIds: Set<string>;
  toggleSelect: (id: string) => void;
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
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
  if (notifications.length === 0) {
    return (
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-8 text-center">
        <h3 className="text-lg font-semibold text-neutral-200">No notifications</h3>
        <p className="text-sm text-neutral-400 mt-2">You're all caught up!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((n) => (
        <NotificationItem
          key={n.id}
          notification={n}
          isSwiped={swipedId === n.id}
          setSwipedId={setSwipedId}
          selectMode={selectMode}
          selected={selectedIds.has(n.id)}
          toggleSelect={() => toggleSelect(n.id)}
          onToggleRead={() => onToggleRead(n.id)}
          onDelete={() => onDelete(n.id)}
        />
      ))}
    </div>
  );
};

export default NotificationList;
