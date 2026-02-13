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
            className="px-3 py-2 rounded-full bg-surface text-surface-foreground text-sm border border-border"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={toggleSelectAll}
            className="px-3 py-2 rounded-full bg-surface text-surface-foreground text-sm border border-border"
          >
            {t('notifications.actions.toggle_select_page')}
          </button>

          {selectedCount > 0 && (
            <>
              <button
                onClick={toggleStatus}
                className="px-3 py-2 rounded-full bg-accent/20 text-sm border border-accent"
              >
                {t('notifications.actions.toggle_status')}
              </button>
              <button
                onClick={onDeleteSelected}
                className="px-3 py-2 rounded-full bg-danger/20 text-sm border border-danger"
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
            className="px-3 py-2 rounded-full text-surface-foreground bg-surface text-sm border border-border"
          >
            {t('notifications.actions.select')}
          </button>
          <button
            onClick={onMarkAllRead}
            className="px-3 py-2 rounded-full text-accent-foreground bg-accent text-sm border border-accent"
          >
            {t('notifications.actions.mark_all_read')}
          </button>
          <button
            onClick={onDeleteAll}
            className="px-3 py-2 rounded-full bg-danger text-sm text-primary-foreground border border-border"
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
