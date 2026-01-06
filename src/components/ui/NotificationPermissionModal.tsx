import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IoNotifications, IoClose } from 'react-icons/io5';
import FormButton from './FormButton';
import { useTranslation } from 'react-i18next';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-[#1a1a1a] rounded-2xl p-6 mx-4 max-w-sm w-full border border-gray-700"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#CDFF00] rounded-full flex items-center justify-center">
                  <IoNotifications className="text-black text-xl" />
                </div>
                <h3 className="text-white text-lg font-semibold">
                  {t('notifications.permission_modal.title')}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                {t('notifications.permission_modal.description')}
              </p>
            </div>

            <div className="flex gap-3">
              <FormButton
                variant="secondary"
                onClick={onClose}
                className="flex-1"
                size="sm"
              >
                {t('notifications.permission_modal.notNow')}
              </FormButton>
              <FormButton
                onClick={handleRequestPermission}
                isLoading={isRequesting}
                className="flex-1"
                size="sm"
              >
                {isRequesting
                  ? t('notifications.permission_modal.requesting')
                  : t('notifications.permission_modal.allow')}
              </FormButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
