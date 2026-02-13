import { motion } from 'framer-motion';
import { MdOutlineClear } from 'react-icons/md';

interface SubscriptionDetailSkeletonProps {
  onClose: () => void;
}

const SubscriptionDetailSkeleton = ({
  onClose,
}: SubscriptionDetailSkeletonProps) => {
  return (
    <motion.div
      className="min-w-sm px-4 h-dvh overflow-y-auto flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        onClick={onClose}
        className="w-10 h-10 my-2 rounded-full flex justify-center items-center self-end cursor-pointer skeleton"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MdOutlineClear className="text-sm text-foreground/60" />
      </motion.div>

      <div className="w-18 h-18 my-2 mb-8 rounded-full skeleton" />

      <div className="flex my-2 items-center gap-2">
        <div className="h-8 w-48 skeleton" />
        <div className="h-8 w-16 skeleton" />
      </div>

      <div className="flex justify-center items-center mb-4 text-lg gap-2">
        <div className="h-6 w-20 skeleton" />
        <div className="h-6 w-24 skeleton" />
      </div>

      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="w-full p-4 my-1 flex rounded-lg justify-between items-center bg-card border border-border"
        >
          <div className="h-5 w-24 skeleton" />
          <div className="h-5 w-32 skeleton" />
        </div>
      ))}

      <div className="w-full p-4 my-1 flex rounded-lg justify-between items-center bg-card border border-border">
        <div className="h-5 w-28 skeleton" />
        <div className="h-8 w-16 skeleton" />
      </div>
    </motion.div>
  );
};

export default SubscriptionDetailSkeleton;
