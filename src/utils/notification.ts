import { NotificationPayload } from '../interfaces/notifications';

const notificationMap = new Map<string, { count: number; toastId: string }>();

export function getNotificationKey(n: NotificationPayload) {
  return `${n.type}:${n.title}:${n.message}`;
}

export function incrementNotification(key: string) {
  const entry = notificationMap.get(key);
  if (entry) {
    entry.count += 1;
    return entry;
  }
  return null;
}

export function setNotification(key: string, toastId: string, count = 1) {
  notificationMap.set(key, { toastId, count });
}

export function clearNotification(key: string) {
  notificationMap.delete(key);
}
