import { motion, AnimatePresence, Variants } from 'framer-motion';
import React, { type ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string;
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 26 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 24,
    transition: { duration: 0.18, ease: 'easeInOut' },
  },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = 'max-w-xl',
}) => {
  useLockBodyScroll(isOpen, { restorePrevious: true });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-999 bg-black/50 backdrop-blur-sm flex items-center justify-center h-dvh"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-app text-gray-100 w-full mx-4 ${width}
              max-h-[90dvh] rounded-2xl shadow-xl
              flex flex-col overflow-hidden`}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              {title && <h2 className="text-xl font-semibold">{title}</h2>}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="px-6 pb-6 overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
