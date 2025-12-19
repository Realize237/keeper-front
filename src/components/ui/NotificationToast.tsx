/* eslint-disable react-refresh/only-export-components */
import { toast } from 'react-hot-toast';
import { FiBell, FiCheckCircle, FiAlertTriangle, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import {
  getNotificationKey,
  incrementNotification,
  setNotification,
} from '../../utils/notification';
import {
  NotificationPayload,
  ToastContentProps,
} from '../../interfaces/notifications';

const iconMap = {
  info: <FiBell />,
  success: <FiCheckCircle />,
  warning: <FiAlertTriangle />,
  error: <FiAlertTriangle />,
};

const SWIPE_THRESHOLD = 120;
let toastStackCounter = 0;

const ToastContent = ({
  title,
  message,
  type,
  count,
  actionLabel,
  onAction,
  t,
  stackIndex,
}: ToastContentProps) => {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.x > SWIPE_THRESHOLD) {
          toast.dismiss(t.id);
        }
      }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`
        relative w-80 bg-[#1f1f1f] text-white rounded-xl p-4
        flex items-start space-x-3 shadow-lg cursor-grab
        active:cursor-grabbing mb-3
      `}
      style={{
        pointerEvents: t.visible ? 'auto' : 'none',
        zIndex: 1000 + stackIndex,
      }}
    >
      <div className="mt-1 text-[#CDFF00] text-lg">{iconMap[type]}</div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm">{title}</p>

          {count > 1 && (
            <span className="ml-2 text-xs bg-gray-700 px-2 py-0.5 rounded-full">
              ×{count}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-1">{message}</p>

        {actionLabel && onAction && (
          <button
            onClick={() => {
              onAction();
              toast.dismiss(t.id);
            }}
            className="mt-2 text-xs text-[#CDFF00] hover:underline"
          >
            {actionLabel}
          </button>
        )}
      </div>

      <button
        onClick={() => toast.dismiss(t.id)}
        className="text-gray-400 hover:text-white"
      >
        <FiX size={16} />
      </button>
    </motion.div>
  );
};

export function showNotification(payload: NotificationPayload) {
  const notification = {
    ...payload,
    type: payload.type ?? 'info',
    id: crypto.randomUUID(),
  };

  const key = getNotificationKey(notification);
  const existing = incrementNotification(key);

  toastStackCounter += 1;

  if (existing) {
    toast.custom(
      (t) => (
        <ToastContent
          {...notification}
          count={existing.count}
          t={t}
          stackIndex={toastStackCounter}
        />
      ),
      { id: existing.toastId }
    );
    return;
  }

  const toastId = toast.custom((t) => (
    <ToastContent
      {...notification}
      count={1}
      t={t}
      stackIndex={toastStackCounter}
    />
  ));

  setNotification(key, toastId);
}
