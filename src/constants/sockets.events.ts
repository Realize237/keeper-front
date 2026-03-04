export const SOCKET_EVENTS = {
  RECEIVE_SYNCHRONIZATION_NOTIFICATION: 'receiveSynchronizationNotification',
  RECEIVE_NOTIFICATION: 'receiveNotification',
} as const;

export type SocketEvent = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];
