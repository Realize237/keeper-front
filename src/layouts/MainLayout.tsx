import { Outlet, useNavigate } from 'react-router-dom';
import useIsChromeExtension from '../hooks/useIsChromeExtension';
import { getBrowserDimensions } from '../utils/environment';
import { useSocket } from '../hooks/useSocket';
import { useCallback, useEffect } from 'react';
import { showNotification } from '../components/ui/NotificationToast';

export default function MainLayout() {
  const isChromeExtension = useIsChromeExtension();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const listenToRealtimeNotifications = useCallback(() => {
    socket?.on('receiveNotification', (data) => {
      showNotification({
        title: data.title,
        message: data.message,
        type: data.type ?? 'info',
        actionLabel: 'View',
        onAction: () => {
          navigate('/notifications');
        },
      });
    });
  }, [socket, navigate]);

  useEffect(() => {
    listenToRealtimeNotifications();
    return () => {
      socket?.off('receiveNotification');
    };
  }, [listenToRealtimeNotifications, socket]);
  return (
    <div
      className={`${
        isChromeExtension ? 'rounded-2xl overflow-hidden' : ''
      } ${getBrowserDimensions(isChromeExtension)} flex flex-col   `}
    >
      <Outlet />
    </div>
  );
}
