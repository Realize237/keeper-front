import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';
import { useQueryClient } from '@tanstack/react-query';
import { userKeys } from '../queryKeys/userKeys';
import { subscriptionKeys } from '../queryKeys/subscriptionKeys';
import { SOCKET_EVENTS } from '../constants/sockets.events';
import { PlaidSynchronizationStatus } from '../interfaces/users';

type SyncNotificationData = {
  status: PlaidSynchronizationStatus;
  message?: string;
};

export const usePlaidSyncEvents = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const [userAccountSyncStatus, setUserAccountSyncStatus] =
    useState<PlaidSynchronizationStatus>('IDLE');

  useEffect(() => {
    if (!socket) return;
    socket.off(SOCKET_EVENTS.RECEIVE_SYNCHRONIZATION_NOTIFICATION);
    const handler = async (data: SyncNotificationData) => {
      switch (data.status) {
        case 'PENDING':
          queryClient.invalidateQueries({ queryKey: userKeys.info });
          setUserAccountSyncStatus('PENDING');
          break;

        case 'SUCCESS':
          await queryClient.cancelQueries({ queryKey: userKeys.info });

          await Promise.all([
            queryClient.refetchQueries({
              queryKey: userKeys.lists(),
              type: 'all',
            }),
            queryClient.refetchQueries({
              queryKey: subscriptionKeys.lists(),
              type: 'all',
            }),
          ]);

          const fresh = queryClient.getQueryData(userKeys.info);
          console.log('[After refetch] userKeys.info cache:', fresh);

          setUserAccountSyncStatus('SUCCESS');
          break;

        case 'FAILED':
          queryClient.refetchQueries({ queryKey: userKeys.info, type: 'all' });
          setUserAccountSyncStatus('FAILED');
          break;
      }
    };

    socket.on(SOCKET_EVENTS.RECEIVE_SYNCHRONIZATION_NOTIFICATION, handler);

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVE_SYNCHRONIZATION_NOTIFICATION, handler);
    };
  }, [socket, queryClient]);

  return { userAccountSyncStatus };
};
