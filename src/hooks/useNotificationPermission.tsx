import { useState } from 'react';
import { getFirebaseToken } from '../config/firebase';
import { useSaveWebPushToken } from './usePushToken';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { storage } from '../utils/storage';

export const useNotificationPermission = () => {
  const { t } = useTranslation();
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
            toast.success(t('notifications.enabled_success'));
          },
          onError: () => {
            toast.error(t('notifications.save_token_error'));
          },
        });
      } else {
        toast.error(t('notifications.get_token_error'));
      }

      storage.set('notificationPermissionAsked', 'true');
    } catch {
      toast.error(t('notifications.get_token_error'));
      storage.set('notificationPermissionAsked', 'true');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    storage.set('notificationPermissionAsked', 'true');
  };

  const hasAskedBefore = () => {
    const asked = storage.get<string>('notificationPermissionAsked') === 'true';
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
