import { useState } from 'react';
import { IoNotifications } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import { Button } from './Button';

interface NotificationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPermissionGranted?: () => Promise<void> | void;
}

export default function NotificationPermissionModal({
  isOpen,
  onClose,
  onPermissionGranted,
}: NotificationPermissionModalProps) {
  const [isRequesting, setIsRequesting] = useState(false);
  const { t } = useTranslation();

  const handleRequestPermission = async () => {
    setIsRequesting(true);

    try {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        onPermissionGranted?.();
        onClose();
      } else {
        onClose();
      }
    } catch {
      onClose();
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-deep-teal rounded-full flex items-center justify-center">
            <IoNotifications className="text-white text-xl" />
          </div>
          <h3 className="text-white text-lg font-semibold">
            {t('notifications.permission_modal.title')}
          </h3>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-gray-300 text-sm leading-relaxed">
          {t('notifications.permission_modal.description')}
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          variant="secondary-dark"
          onClick={onClose}
          className="flex-1"
          size="sm"
        >
          {t('notifications.permission_modal.notNow')}
        </Button>
        <Button
          onClick={handleRequestPermission}
          isLoading={isRequesting}
          className="flex-1"
          size="sm"
        >
          {isRequesting
            ? t('notifications.permission_modal.requesting')
            : t('notifications.permission_modal.allow')}
        </Button>
      </div>
    </Modal>
  );
}
