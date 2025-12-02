// components/notifications/NotificationItem.tsx
import React, { useRef } from "react";
import {
  FiCheckCircle,
  FiCircle,
  FiTrash2,
  FiChevronRight,
  FiCheck,
} from "react-icons/fi";
import type { Notification } from "../../interfaces/notifications";
import { MdUndo } from "react-icons/md";
import { formatTime, getTypeColor } from "../../utils";

type Props = {
  notification: Notification;
  isSwiped: boolean;
  setSwipedId: (id: string | null) => void;
  selectMode: boolean;
  selected: boolean;
  toggleSelect: () => void;
  onToggleRead: () => void;
  onDelete: () => void;
};

const NotificationItem: React.FC<Props> = ({
  notification,
  isSwiped,
  setSwipedId,
  selectMode,
  selected,
  toggleSelect,
  onToggleRead,
  onDelete,
}) => {
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setSwipedId(notification.id);
    } else if (diff < -50) {
      setSwipedId(null);
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative">
      {/* Hidden actions */}
      {isSwiped && (
        <div className="absolute inset-0 flex items-center justify-end pr-4 gap-2 pointer-events-none">
          <button
              onClick={onToggleRead}
              title={notification.isRead ? "Mark as unread":"Mark as read"}
              className="cursor-pointer p-2 rounded-lg border border-neutral-700 text-neutral-700 hover:opacity-70 pointer-events-auto"
            >
              {notification.isRead ? <MdUndo className="w-4 h-4" /> : <FiCheck className="w-4 h-4" />}
            </button>
            <button
              onClick={onDelete}
              title="Delete"
              className="cursor-pointer p-2 rounded-lg text-red-600/60 border border-red-600/60 hover:opacity-70 pointer-events-auto"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
        </div>
      )}
      {/* Card */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`relative transition-transform duration-200 transform ${
          isSwiped ? "-translate-x-24" : "translate-x-0"
        } rounded-xl border p-4 ${
          notification.isRead
            ? "bg-neutral-900/40 border-neutral-800"
            : getTypeColor(notification.type) + " border"
        } overflow-hidden`}
      >
        <div className="flex items-start gap-4">
          {selectMode ? (
            <button onClick={toggleSelect} className="mt-1 shrink-0">
              {selected ? (
                <FiCheckCircle className="w-6 h-6 text-blue-400" />
              ) : (
                <FiCircle className="w-6 h-6 text-neutral-500" />
              )}
            </button>
          ) : null}

          {/* icon */}
          <div className="shrink-0 mt-1">
            <div className="w-10 h-10 rounded-lg bg-neutral-800/30 flex items-center justify-center text-white">
              {/* placeholder icon */}
              <span className="text-sm font-semibold">
                {notification.title?.slice(0, 1)}
              </span>
            </div>
          </div>

          {/* content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4
                className={`font-semibold truncate ${
                  notification.isRead ? "text-neutral-300" : "text-white"
                }`}
              >
                {notification.title}
              </h4>
              <div className="text-xs text-neutral-400 ml-2 whitespace-nowrap">
                {formatTime(notification.timestamp)}
              </div>
            </div>
            <p
              className={`text-sm mt-1 line-clamp-2 ${
                notification.isRead ? "text-neutral-400" : "text-neutral-200"
              }`}
            >
              {notification.message}
            </p>

            {notification.category && (
              <div className="mt-3">
                <span className="inline-block text-xs bg-neutral-800/40 px-3 py-1 rounded-full text-neutral-300">
                  {notification.category}
                </span>
              </div>
            )}
          </div>

          {/* actions chevron */}
          <div className="shrink-0 ml-2">
            {!selectMode && (
              <button
                onClick={() => setSwipedId(isSwiped ? null : notification.id)}
                className="p-2 rounded-lg hover:bg-neutral-800/50"
              >
                <FiChevronRight
                  className={`w-5 h-5 text-neutral-400 cursor-pointer transition-transform ${
                    isSwiped ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>
        {!isSwiped && (
          <div className="flex items-center justify-end pr-4 gap-2 pointer-events-none">
            <button
              onClick={onToggleRead}
              title={notification.isRead ? "Mark as unread":"Mark as read"}
              className="cursor-pointer p-2 rounded-lg border border-neutral-700 text-neutral-700 hover:opacity-70 pointer-events-auto"
            >
              {notification.isRead ? <MdUndo className="w-4 h-4" /> : <FiCheck className="w-4 h-4" />}
            </button>
            <button
              onClick={onDelete}
              title="Delete"
              className="cursor-pointer p-2 rounded-lg text-red-600/60 border border-red-600/60 hover:opacity-70 pointer-events-auto"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
