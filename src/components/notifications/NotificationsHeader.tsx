import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  title?: string;
  unreadCount: number;
  totalCount: number;
  searchQuery: string;
  onSearch: (q: string) => void;
};

const NotificationsHeader: React.FC<Props> = ({
  title = 'Notifications',
  unreadCount,
  totalCount,
  searchQuery,
  onSearch,
}) => {
  const { t } = useTranslation();
  return (
    <div className="border border-border text-foreground rounded-xl px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          <span className="font-medium text-foreground">{unreadCount}</span>{' '}
          {t('notifications.stats.unread')} •{' '}
          <span className="text-foreground">{totalCount}</span>{' '}
          {t('notifications.stats.total')}
        </p>
      </div>

      <div className="w-full md:w-1/2">
        <label htmlFor="notif-search" className="relative block">
          <span className="sr-only">{t('notifications.search.label')}</span>
          <input
            id="notif-search"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={t('notifications.search.placeholder')}
            className="w-full rounded-lg bg-surface border border-border px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
      </div>
    </div>
  );
};

export default NotificationsHeader;
