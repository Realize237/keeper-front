// components/notifications/NotificationsHeader.tsx
import React from 'react';

type Props = {
  title?: string;
  unreadCount: number;
  totalCount: number;
  searchQuery: string;
  onSearch: (q: string) => void;
};

const NotificationsHeader: React.FC<Props> = ({ title = 'Notifications', unreadCount, totalCount, searchQuery, onSearch }) => {
  return (
    <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
        <p className="text-sm text-neutral-400 mt-1">
          <span className="font-medium text-white">{unreadCount}</span> unread • <span className="text-neutral-300">{totalCount}</span> total
        </p>
      </div>

      <div className="w-full md:w-1/2">
        <label htmlFor="notif-search" className="relative block">
          <span className="sr-only">Search notifications</span>
          <input
            id="notif-search"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search notifications..."
            className="w-full rounded-lg bg-neutral-800/60 border border-neutral-700 px-4 py-2 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
    </div>
  );
};

export default NotificationsHeader;
