import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import BottomSheet from '../ui/BottomSheet';
import { useDeviceType } from '../../hooks/useDeviceType';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title: string;
  message: string;

  confirmText?: string;
  cancelText?: string;

  confirmButtonClass?: string;
  confirmButtonHoverClass?: string;
  isDestructive?: boolean;
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonClass = 'bg-blue-600',
  confirmButtonHoverClass = 'shadow-lg shadow-blue-500/40',
  isDestructive = true,
}: ConfirmationDialogProps) {
  const { isMobile } = useDeviceType();

  const finalConfirmClass = isDestructive ? 'bg-red-500' : confirmButtonClass;

  const finalHoverClass = isDestructive
    ? 'shadow-lg shadow-red-500/40'
    : confirmButtonHoverClass;

  const content = (
    <motion.div>
      <div className="flex font-medium text-white justify-center items-center border-b border-white pb-4 pt-8">
        {title}
      </div>

      <div className="flex flex-col space-y-8">
        <p className="text-center mt-8 text-white/70">{message}</p>

        <div className="flex justify-center gap-10">
          <motion.button
            onClick={onClose}
            className="rounded-full text-white cursor-pointer border p-4 border-white"
            whileHover={{ scale: 1.05, backgroundColor: '#ffffff10' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {cancelText}
          </motion.button>

          <motion.button
            onClick={onConfirm}
            className={`rounded-full cursor-pointer p-4 text-white ${finalConfirmClass}`}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 8px 20px ${finalHoverClass.includes('shadow-') ? finalHoverClass : 'rgba(0,0,0,0.3)'}`,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {confirmText}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {isMobile ? (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
          {content}
        </BottomSheet>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          {content}
        </Modal>
      )}
    </>
  );
}
