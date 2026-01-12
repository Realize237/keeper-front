import { motion, AnimatePresence } from 'framer-motion';
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 z-999 backdrop-blur-sm flex items-center justify-center h-dvh"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-[#171717] text-gray-100 w-full mx-4 ${width} rounded-2xl p-6 shadow-xl z-50`}
          >
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-red-600"
            >
              <IoClose size={20} />
            </button>
            {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
