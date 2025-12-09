// components/notifications/NotificationsPage.tsx
import React, { useMemo, useState, useCallback } from "react";
import NotificationsHeader from "../components/notifications/NotificationsHeader";
import NotificationList from "../components/notifications/NotificationList";
import NotificationActions from "../components/notifications/NotificationActions";
import Pagination from "../components/notifications/Pagination";
import { NotificationStatus } from "../interfaces/notifications";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { env } from "../utils/env";
import NotificationFilterToggle from "../components/notifications/NotificationFilterToggle";
import {
  useUpdateNotification,
  useDeleteNotifications,
  useUserNotifications,
} from "../hooks/useNotifications";
import NotificationSkeletonLoader from "../components/notifications/SkeletonLoader";

const NotificationsPage: React.FC = () => {
  const { data: notifications, isLoading } = useUserNotifications();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [swipedId, setSwipedId] = useState<number | null>(null);

  const updateNotificationMutation = useUpdateNotification();
  const deleteNotificationMutation = useDeleteNotifications();

  const [page, setPage] = useState(1);
  const perPage = parseInt(env.PER_PAGE ?? "3");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return notifications;
    if (!notifications) return [];
    return notifications.filter(
      (n) =>
        n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q)
    );
  }, [notifications, searchQuery]);

  const [filter, setFilter] = useState<string>(NotificationStatus.UNREAD);

  // 1. Filter read/unread BEFORE pagination
  const filteredByRead = useMemo(() => {
    if (!filtered) return [];
    return filtered?.filter((n) => n.status === filter);
  }, [filtered, filter]);

  // 2. Correct pagination
  const totalPages = Math.max(
    1,
    Math.ceil((filteredByRead?.length ?? 0) / perPage)
  );
  const currentPage = Math.min(page, totalPages);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredByRead?.slice(start, start + perPage);
  }, [filteredByRead, currentPage, perPage]);

  const totalFiltered = filteredByRead?.length ?? 0;

  const unreadCount = useMemo(
    () =>
      notifications?.filter((n) => n.status === NotificationStatus.UNREAD)
        .length,
    [notifications]
  );

  // Handlers
  const toggleRead = useCallback(
    (id: number) => {
      updateNotificationMutation.mutate({ids: [id], all:false});
      setSwipedId(null);
    },
    [updateNotificationMutation]
  );

  const deleteNotification = useCallback(
    (id: number) => {
        deleteNotificationMutation.mutate({ids: [id], all: false});
        setSwipedId(null);
    },
    [deleteNotificationMutation]
  );

  const markAllAsRead = useCallback(() => {
    if (notifications) {
      updateNotificationMutation.mutate({ids:notifications.map(not => not.id), all: true});
    }
  }, [updateNotificationMutation, notifications]);

  const deleteAll = useCallback(() => {
    if (!confirm("Are you sure you want to delete all notifications?")) return;
    if (notifications) {
      deleteNotificationMutation.mutate({ids: notifications?.map(not => not.id), all: true});
    }
    setSelectedIds(new Set());
  }, [deleteNotificationMutation, notifications]);

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
      return new Set(currentItems?.map((n) => n.id));
    });
  }, [currentItems]);

  const deleteSelected = useCallback(() => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} notification(s)?`)) return;
    if (selectedIds) {
      deleteNotificationMutation.mutate({ids: [...selectedIds], all: false});
    }
    setSelectedIds(new Set());
  }, [selectedIds, deleteNotificationMutation]);

  const toggleSelectedStatus = useCallback(
    () => {
      if (selectedIds.size === 0) return;
      const selectedNotifications = notifications
        ?.filter((not) => selectedIds.has(not.id))
      if (selectedNotifications) {
        updateNotificationMutation.mutate({ids: selectedNotifications.map(not => not.id), all: false});
      }
      setSelectedIds(new Set());
      setSelectMode(false);
    },
    [selectedIds, updateNotificationMutation, notifications]
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
        <div className="flex items-center my-4 space-x-4">
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
          unreadCount={unreadCount!}
          totalCount={notifications?.length ?? 0}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />

        <div className="mt-4">
          {/* Left pane - list */}
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

            {
              isLoading ?
              <div className="flex space-y-4">
                <NotificationSkeletonLoader />
              </div>
              :
              <NotificationList
              notifications={currentItems!}
              swipedId={swipedId}
              setSwipedId={setSwipedId}
              selectMode={selectMode}
              selectedIds={selectedIds}
              toggleSelect={toggleSelect}
              onToggleRead={toggleRead}
              onDelete={deleteNotification}
            />}

            {totalFiltered > perPage && (
              <div className="mt-4">
                <Pagination
                  current={currentPage}
                  total={totalPages}
                  onChange={(p) => setPage(p)}
                  perPage={perPage}
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
