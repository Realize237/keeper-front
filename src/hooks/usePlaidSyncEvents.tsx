import { useCallback, useEffect } from 'react';
import { useSocket } from './useSocket';
import { useQueryClient } from '@tanstack/react-query';
import { userKeys } from '../queryKeys/userKeys';
import { subscriptionKeys } from '../queryKeys/subscriptionKeys';
import { showNotification } from '../components/ui/NotificationToast';
import { useTranslation } from 'react-i18next';
import { SOCKET_EVENTS } from '../constants/sockets.events';
import { PlaidSynchronizationStatus } from '../interfaces/users';

type SyncNotificationData = {
  status: PlaidSynchronizationStatus;
  message?: string;
};

export const usePlaidSyncEvents = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const listenToPlaidSyncEvents = useCallback(() => {
    socket?.on(
      SOCKET_EVENTS.RECEIVE_SYNCHRONIZATION_NOTIFICATION,
      (data: SyncNotificationData) => {
        switch (data.status) {
          case 'PENDING':
            queryClient.invalidateQueries({ queryKey: userKeys.info });
            break;

          case 'SUCCESS':
            queryClient.invalidateQueries({ queryKey: userKeys.info });
            queryClient.invalidateQueries({
              queryKey: subscriptionKeys.lists(),
            });

            showNotification({
              title: t('sync.success.title'),
              message: data.message || t('sync.success.message'),
              type: 'success',
            });
            break;

          case 'FAILED':
            queryClient.invalidateQueries({ queryKey: userKeys.info });

            showNotification({
              title: t('sync.failed.title'),
              message: data.message || t('sync.failed.message'),
              type: 'error',
            });
            break;

          case 'IDLE':
            break;
        }
      }
    );
  }, [socket, queryClient, t]);

  useEffect(() => {
    listenToPlaidSyncEvents();

    return () => {
      socket?.off(SOCKET_EVENTS.RECEIVE_SYNCHRONIZATION_NOTIFICATION);
    };
  }, [listenToPlaidSyncEvents, socket]);
};
