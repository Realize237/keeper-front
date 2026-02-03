import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import BottomSheet from '../ui/BottomSheet';
import { useDeviceType } from '../../hooks/useDeviceType';
import Button from '../ui/Button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title: string;
  message: string;

  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmationDialogProps) {
  const { isMobile } = useDeviceType();

  const content = (
    <motion.div>
      <div className="flex font-medium text-white justify-center items-center border-b border-white pb-4 pt-8">
        {title}
      </div>

      <div className="flex flex-col space-y-8">
        <p className="text-center mt-8 text-white/70">{message}</p>

        <div className="flex justify-center gap-10">
          <Button variant="secondary-dark" onClick={onClose}>
            {cancelText}
          </Button>

          <Button variant="destructive" onClick={onConfirm}>
            {confirmText}
          </Button>
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
