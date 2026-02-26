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
    const handler = (data: SyncNotificationData) => {
      switch (data.status) {
        case 'PENDING':
          setUserAccountSyncStatus('PENDING');
          queryClient.refetchQueries({
            queryKey: userKeys.info,
            type: 'active',
          });
          break;

        case 'SUCCESS':
          setUserAccountSyncStatus('SUCCESS');
          queryClient.refetchQueries({
            queryKey: userKeys.info,
            type: 'active',
          });
          queryClient.invalidateQueries({
            queryKey: subscriptionKeys.lists(),
          });
          setTimeout(() => setUserAccountSyncStatus('SUCCESS'), 1000);
          break;

        case 'FAILED':
          setUserAccountSyncStatus('FAILED');
          queryClient.refetchQueries({
            queryKey: userKeys.info,
            type: 'active',
          });
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
