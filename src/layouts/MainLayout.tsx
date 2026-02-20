import { Outlet, useNavigate } from 'react-router-dom';
import useIsChromeExtension from '../hooks/useIsChromeExtension';
import { getBrowserDimensions } from '../utils/environment';
import { useSocket } from '../hooks/useSocket';
import { showNotification } from '../components/ui/NotificationToast';
import { PATHS } from '../routes/paths';
import { useEffect } from 'react';
import { SOCKET_EVENTS } from '../constants/sockets.events';

export default function MainLayout() {
  const isChromeExtension = useIsChromeExtension();
  const { socket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    socket.off(SOCKET_EVENTS.RECEIVE_NOTIFICATION);

    const handler = (data: {
      title?: string;
      message?: string;
      type?: 'info' | 'success' | 'error';
    }) => {
      showNotification({
        title: data?.title ?? 'Notification',
        message: data.message ?? '',
        type: data.type ?? 'info',
        actionLabel: 'View',
        onAction: () => navigate(PATHS.APP.NOTIFICATIONS),
      });
    };

    socket.on(SOCKET_EVENTS.RECEIVE_NOTIFICATION, handler);

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVE_NOTIFICATION, handler);
    };
  }, [socket]);

  return (
    <div
      className={`${
        isChromeExtension ? 'rounded-2xl overflow-hidden' : ''
      } ${getBrowserDimensions(isChromeExtension)} flex flex-col   bg-background`}
    >
      <Outlet />
    </div>
  );
}
