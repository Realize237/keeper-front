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

    const handler = (data: SyncNotificationData) => {
      switch (data.status) {
        case 'PENDING':
          queryClient.invalidateQueries({ queryKey: userKeys.info });
          setUserAccountSyncStatus('PENDING');
          break;

        case 'SUCCESS':
          queryClient.invalidateQueries({ queryKey: userKeys.info });
          queryClient.invalidateQueries({
            queryKey: subscriptionKeys.lists(),
          });
          setUserAccountSyncStatus('SUCCESS');
          break;

        case 'FAILED':
          queryClient.invalidateQueries({ queryKey: userKeys.info });
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
