// components/notifications/NotificationActions.tsx
import React from 'react';

type Props = {
  selectMode: boolean;
  setSelectMode: (v: boolean) => void;
  selectedCount: number;
  toggleSelectAll: () => void;
  onMarkAllRead: () => void;
  onDeleteAll: () => void;
  onDeleteSelected: () => void;
  onMarkSelectedAsRead: () => void;
  onMarkSelectedAsUnread: () => void;
  totalFiltered: number;
};

const NotificationActions: React.FC<Props> = ({
  selectMode,
  setSelectMode,
  selectedCount,
  toggleSelectAll,
  onMarkAllRead,
  onDeleteAll,
  onDeleteSelected,
  onMarkSelectedAsRead,
  onMarkSelectedAsUnread,
  totalFiltered,
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {selectMode ? (
        <>
          <button onClick={() => setSelectMode(false)} className="px-3 py-2 rounded-lg bg-neutral-800/50 text-sm border border-neutral-700">
            Cancel
          </button>
          <button onClick={toggleSelectAll} className="px-3 py-2 rounded-lg bg-neutral-800/50 text-sm border border-neutral-700">
            Toggle Select Page
          </button>

          {selectedCount > 0 && (
            <>
              <button onClick={onMarkSelectedAsRead} className="px-3 py-2 rounded-lg bg-green-600/20 text-sm border border-green-600">
                Mark Read
              </button>
              <button onClick={onMarkSelectedAsUnread} className="px-3 py-2 rounded-lg bg-blue-600/20 text-sm border border-blue-600">
                Mark Unread
              </button>
              <button onClick={onDeleteSelected} className="px-3 py-2 rounded-lg bg-red-600/20 text-sm border border-red-600">
                Delete ({selectedCount})
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <button onClick={() => setSelectMode(true)} className="px-3 py-2 rounded-lg bg-neutral-800/50 text-sm border border-neutral-700">
            Select
          </button>
          <button onClick={onMarkAllRead} className="px-3 py-2 rounded-lg bg-green-600/20 text-sm border border-green-600">
            Mark All Read
          </button>
          <button onClick={onDeleteAll} className="px-3 py-2 rounded-lg bg-red-600/20 text-sm border border-red-600">
            Delete All
          </button>
          <div className="ml-2 text-sm text-neutral-400">Showing {totalFiltered} results</div>
        </>
      )}
    </div>
  );
};

export default NotificationActions;
