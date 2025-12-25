import { useState } from 'react';
import { getFirebaseToken } from '../config/firebase';
import { useSaveWebPushToken } from './usePushToken';
import toast from 'react-hot-toast';

export const useNotificationPermission = () => {
  const [showModal, setShowModal] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>(() => {
    return 'Notification' in window ? Notification.permission : 'default';
  });
  const { mutate: saveWebPushToken } = useSaveWebPushToken();

  const checkAndShowModal = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      setShowModal(true);
    }
  };

  const handlePermissionGranted = async () => {
    try {
      setPermission('granted');

      const fcmToken = await getFirebaseToken();
      if (fcmToken) {
        saveWebPushToken(fcmToken, {
          onSuccess: () => {
            toast.success('Notifications enabled successfully!');
          },
          onError: () => {
            toast.error('Failed to save notification token. Please try again.');
          },
        });
      } else {
        toast.error('Failed to get notification token. Please try again.');
      }

      localStorage.setItem('notificationPermissionAsked', 'true');
    } catch {
      toast.error(
        'Permission not granted. Please enable notifications in your browser settings.'
      );
      localStorage.setItem('notificationPermissionAsked', 'true');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    localStorage.setItem('notificationPermissionAsked', 'true');
  };

  const hasAskedBefore = () => {
    const asked =
      localStorage.getItem('notificationPermissionAsked') === 'true';
    return asked;
  };

  return {
    showModal,
    permission,
    checkAndShowModal,
    handlePermissionGranted,
    handleModalClose,
    hasAskedBefore,
    isSupported: 'Notification' in window,
  };
};
