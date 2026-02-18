import React, { useMemo, useState, useCallback } from 'react';
import NotificationsHeader from '../components/notifications/NotificationsHeader';
import NotificationList from '../components/notifications/NotificationList';
import NotificationActions from '../components/notifications/NotificationActions';
import Pagination from '../components/notifications/Pagination';
import { NotificationStatus } from '../interfaces/notifications';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NotificationFilterToggle from '../components/notifications/NotificationFilterToggle';
import {
  useUpdateNotification,
  useDeleteNotifications,
  useUserNotifications,
} from '../hooks/useNotifications';
import NotificationSkeletonLoader from '../components/notifications/SkeletonLoader';
import { useTranslation } from 'react-i18next';

const NotificationsPage: React.FC<unknown> = () => {
  const { data: notifications, isLoading } = useUserNotifications();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [swipedId, setSwipedId] = useState<number | null>(null);

  const updateNotificationMutation = useUpdateNotification();
  const deleteNotificationMutation = useDeleteNotifications();

  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 3;

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return notifications;
    if (!notifications) return [];
    return notifications.filter(
      (notification) =>
        notification.title.toLowerCase().includes(q) ||
        notification.message.toLowerCase().includes(q)
    );
  }, [notifications, searchQuery]);

  const [filter, setFilter] = useState<string>(NotificationStatus.UNREAD);

  const filteredByRead = useMemo(() => {
    if (!filtered) return [];
    return filtered?.filter((notification) => notification.status === filter);
  }, [filtered, filter]);

  const totalPages = Math.max(
    1,
    Math.ceil((filteredByRead?.length ?? 0) / ROWS_PER_PAGE)
  );
  const currentPage = Math.min(page, totalPages);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredByRead?.slice(start, start + ROWS_PER_PAGE);
  }, [filteredByRead, currentPage, ROWS_PER_PAGE]);

  const totalFiltered = filteredByRead?.length ?? 0;

  const unreadCount = useMemo(
    () =>
      notifications?.filter(
        (notification) => notification.status === NotificationStatus.UNREAD
      ).length,
    [notifications]
  );

  const toggleRead = useCallback(
    (id: number) => {
      updateNotificationMutation.mutate({ ids: [id], all: false });
      setSwipedId(null);
    },
    [updateNotificationMutation]
  );

  const deleteNotification = useCallback(
    (id: number) => {
      deleteNotificationMutation.mutate({ ids: [id], all: false });
      setSwipedId(null);
    },
    [deleteNotificationMutation]
  );

  const markAllAsRead = useCallback(() => {
    if (notifications) {
      updateNotificationMutation.mutate({
        ids: notifications.map((notification) => notification.id),
        all: true,
      });
    }
  }, [updateNotificationMutation, notifications]);

  const deleteAll = useCallback(() => {
    if (!confirm(t('notifications.confirm_delete_all'))) return;
    if (notifications) {
      deleteNotificationMutation.mutate({
        ids: notifications?.map((notification) => notification.id),
        all: true,
      });
    }
    setSelectedIds(new Set());
  }, [deleteNotificationMutation, notifications, t]);

  const toggleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === currentItems?.length) return new Set();
      return new Set(currentItems?.map((notification) => notification.id));
    });
  }, [currentItems]);

  const deleteSelected = useCallback(() => {
    if (selectedIds.size === 0) return;
    t('notifications.confirm_delete_selected', {
      count: selectedIds.size,
    });
    if (selectedIds) {
      deleteNotificationMutation.mutate({ ids: [...selectedIds], all: false });
    }
    setSelectedIds(new Set());
  }, [selectedIds, deleteNotificationMutation, t]);

  const toggleSelectedStatus = useCallback(() => {
    if (selectedIds.size === 0) return;
    const selectedNotifications = notifications?.filter((notification) =>
      selectedIds.has(notification.id)
    );
    if (selectedNotifications) {
      updateNotificationMutation.mutate({
        ids: selectedNotifications.map((notification) => notification.id),
        all: false,
      });
    }
    setSelectedIds(new Set());
    setSelectMode(false);
  }, [selectedIds, updateNotificationMutation, notifications]);

  const navigate = useNavigate();

  React.useEffect(() => {
    setSwipedId(null);
  }, [page, selectMode]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="min-h-screen text-foreground w-full "
    >
      <div className="mx-auto w-full px-4 md:px-6  lg:px-8 py-6">
        <div className="flex items-center my-4 space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer gap-2 px-3 py-1.5 rounded-md 
       text-foreground 
      hover:bg-muted transition"
          >
            <FiChevronLeft className="w-4 h-4" />
            <span className="text-sm capitalize">{t('common.back')}</span>
          </button>
        </div>
        <NotificationsHeader
          title={t('notifications.title')}
          unreadCount={unreadCount!}
          totalCount={notifications?.length ?? 0}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />

        <div className="mt-4">
          <div className="w-full">
            <div className="mb-3 hidden md:flex items-center justify-between gap-3">
              <NotificationActions
                selectMode={selectMode}
                setSelectMode={setSelectMode}
                selectedCount={selectedIds.size}
                toggleSelectAll={toggleSelectAll}
                onMarkAllRead={markAllAsRead}
                onDeleteAll={deleteAll}
                onDeleteSelected={deleteSelected}
                toggleStatus={toggleSelectedStatus}
                onChangeFilter={setFilter}
              />
            </div>
            <div className="flex w-full md:w-4/12 mb-5 md:hidden">
              <NotificationFilterToggle style="p-3" onChange={setFilter} />
            </div>

            {isLoading ? (
              <div className="flex space-y-4">
                <NotificationSkeletonLoader />
              </div>
            ) : (
              <NotificationList
                notifications={currentItems!}
                swipedId={swipedId}
                setSwipedId={setSwipedId}
                selectMode={selectMode}
                selectedIds={selectedIds}
                toggleSelect={toggleSelect}
                onToggleRead={toggleRead}
                onDelete={deleteNotification}
              />
            )}

            {totalFiltered > ROWS_PER_PAGE && (
              <div className="mt-4">
                <Pagination
                  current={currentPage}
                  total={totalPages}
                  onChange={(p) => setPage(p)}
                  itemsPerPage={ROWS_PER_PAGE}
                  totalItems={totalFiltered}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsPage;
