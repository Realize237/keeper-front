import { motion } from "framer-motion";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  return isOpen ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-100 flex justify-center items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className="w-full max-w-md bg-[#1f1f1f] rounded-t-3xl p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto my-2"></div>
        {children}
      </motion.div>
    </motion.div>
  ) : null;
};

export default BottomSheet;
