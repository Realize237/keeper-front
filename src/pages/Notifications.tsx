// components/notifications/NotificationsPage.tsx
import React, { useMemo, useState, useCallback } from 'react';
import NotificationsHeader from '../components/notifications/NotificationsHeader';
import NotificationList from '../components/notifications/NotificationList';
import NotificationActions from '../components/notifications/NotificationActions';
import Pagination from '../components/notifications/Pagination';
import type { Notification } from '../interfaces/notifications';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion";
import { seedNotifications } from '../constants';
import { env } from '../utils/env';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    seedNotifications()
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [swipedId, setSwipedId] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = parseInt(env.PER_PAGE ?? "3");

  // Filtered + searched notifications
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return notifications;
    return notifications.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q) ||
        (n.category ?? '').toLowerCase().includes(q)
    );
  }, [notifications, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, currentPage, perPage]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  // Handlers
  const toggleRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n)));
    setSwipedId(null);
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedIds((s) => {
      const copy = new Set(s);
      copy.delete(id);
      return copy;
    });
    setSwipedId(null);
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const deleteAll = useCallback(() => {
    if (!confirm('Are you sure you want to delete all notifications?')) return;
    setNotifications([]);
    setSelectedIds(new Set());
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === currentItems.length) return new Set();
      return new Set(currentItems.map((n) => n.id));
    });
  }, [currentItems]);

  const deleteSelected = useCallback(() => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} notification(s)?`)) return;
    setNotifications((prev) => prev.filter((n) => !selectedIds.has(n.id)));
    setSelectedIds(new Set());
  }, [selectedIds]);

  const markSelectedAsRead = useCallback(
    (asRead: boolean) => {
      if (selectedIds.size === 0) return;
      setNotifications((prev) =>
        prev.map((n) => (selectedIds.has(n.id) ? { ...n, isRead: asRead } : n))
      );
      setSelectedIds(new Set());
      setSelectMode(false);
    },
    [selectedIds]
  );

  const navigate = useNavigate();

  // utility to close swipe when page changes or select mode changes
  React.useEffect(() => {
    setSwipedId(null);
  }, [page, selectMode]);

  return (
    <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -30 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="min-h-screen text-white w-full bg-[#171717]"
  >
      <div className="mx-auto w-full px-4 md:px-6 bg-[#171717] lg:px-8 py-6">
        <div className='flex items-center my-4 space-x-4'>
              <button
      onClick={() => navigate(-1)}
      className="flex items-center cursor-pointer gap-2 px-3 py-1.5 rounded-md 
       text-neutral-300 
      hover:bg-neutral-800/50 transition"
    >
      <FiChevronLeft className="w-4 h-4" />
      <span className="text-sm">Back</span>
    </button>
        </div>
        <NotificationsHeader
          title="Notifications"
          unreadCount={unreadCount}
          totalCount={notifications.length}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Left pane - list */}
          <div className="w-full">
            <div className="mb-3 flex items-center justify-between gap-3">
              <NotificationActions
                selectMode={selectMode}
                setSelectMode={setSelectMode}
                selectedCount={selectedIds.size}
                toggleSelectAll={toggleSelectAll}
                onMarkAllRead={markAllAsRead}
                onDeleteAll={deleteAll}
                onDeleteSelected={deleteSelected}
                onMarkSelectedAsRead={() => markSelectedAsRead(true)}
                onMarkSelectedAsUnread={() => markSelectedAsRead(false)}
                totalFiltered={filtered.length}
              />
            </div>

            <NotificationList
              notifications={currentItems}
              swipedId={swipedId}
              setSwipedId={setSwipedId}
              selectMode={selectMode}
              selectedIds={selectedIds}
              toggleSelect={toggleSelect}
              onToggleRead={toggleRead}
              onDelete={deleteNotification}
            />

            {notifications.length > perPage && <div className="mt-4">
              <Pagination
                current={currentPage}
                total={totalPages}
                onChange={(p) => setPage(p)}
                perPage={perPage}
                totalItems={filtered.length}
              />
            </div>}
          </div>

          {/* Right pane - summary / quick actions */}
          <aside className="w-full">
            <div className="sticky top-24 space-y-4">
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-4">
                <h4 className="text-sm text-neutral-300 font-medium mb-2">Quick stats</h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-400">Unread</span>
                    <span className="font-semibold">{unreadCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-400">Total</span>
                    <span className="font-semibold">{notifications.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-400">Current page</span>
                    <span className="font-semibold">{currentPage} / {totalPages}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsPage;