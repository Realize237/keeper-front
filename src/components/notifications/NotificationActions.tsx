// components/notifications/NotificationActions.tsx
import React from 'react';
import NotificationFilterToggle from './NotificationFilterToggle';
import { useTranslation } from 'react-i18next';

type Props = {
  selectMode: boolean;
  setSelectMode: (v: boolean) => void;
  selectedCount: number;
  toggleSelectAll: () => void;
  onMarkAllRead: () => void;
  onDeleteAll: () => void;
  onDeleteSelected: () => void;
  toggleStatus: () => void;
  onChangeFilter: (filter: string) => void;
};

const NotificationActions: React.FC<Props> = ({
  selectMode,
  setSelectMode,
  selectedCount,
  toggleSelectAll,
  onMarkAllRead,
  onDeleteAll,
  onDeleteSelected,
  toggleStatus,
  onChangeFilter,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-wrap gap-2 items-center">
      {selectMode ? (
        <>
          <button
            onClick={() => setSelectMode(false)}
            className="px-3 py-2 rounded-full bg-neutral-800/50 text-sm border border-neutral-700"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={toggleSelectAll}
            className="px-3 py-2 rounded-full bg-neutral-800/50 text-sm border border-neutral-700"
          >
            {t('notifications.actions.toggle_select_page')}
          </button>

          {selectedCount > 0 && (
            <>
              <button
                onClick={toggleStatus}
                className="px-3 py-2 rounded-full bg-green-600/20 text-sm border border-green-600"
              >
                {t('notifications.actions.toggle_status')}
              </button>
              <button
                onClick={onDeleteSelected}
                className="px-3 py-2 rounded-full bg-red-600/20 text-sm border border-red-600"
              >
                {t('notifications.actions.delete_selected', {
                  count: selectedCount,
                })}
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectMode(true)}
            className="px-3 py-2 rounded-full bg-neutral-800/50 text-sm border border-neutral-700"
          >
            {t('notifications.actions.select')}
          </button>
          <button
            onClick={onMarkAllRead}
            className="px-3 py-2 rounded-full bg-green-600/20 text-sm border border-green-600"
          >
            {t('notifications.actions.mark_all_read')}
          </button>
          <button
            onClick={onDeleteAll}
            className="px-3 py-2 rounded-full bg-red-600/20 text-sm border border-red-600"
          >
            {t('notifications.actions.delete_all')}
          </button>
        </>
      )}
      <div className="hidden md:flex w-full md:w-2/12">
        <NotificationFilterToggle onChange={onChangeFilter} />
      </div>
    </div>
  );
};

export default NotificationActions;
