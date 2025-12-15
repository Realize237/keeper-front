import { motion } from "framer-motion";
import { MdOutlineClear } from "react-icons/md";

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
        className="w-10 h-10 my-2 bg-[#2f2f2f] rounded-full flex justify-center items-center self-end float-right cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MdOutlineClear className="text-md text-white" />
      </motion.div>

      <div className="w-18 h-18 my-2 mb-8 rounded-full bg-neutral-800 animate-pulse" />

      <div className="flex my-2 items-center gap-2">
        <div className="h-8 w-48 bg-neutral-800 rounded animate-pulse" />
        <div className="h-8 w-16 bg-neutral-800 rounded animate-pulse" />
      </div>

      <div className="flex justify-center items-center mb-4 text-lg gap-2">
        <div className="h-6 w-20 bg-neutral-800 rounded animate-pulse" />
        <div className="h-6 w-24 bg-neutral-800 rounded animate-pulse" />
      </div>

      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="w-full h-auto p-4 my-1 flex rounded-lg text-lg bg-[#333232] justify-between items-center"
        >
          <div className="h-5 w-24 bg-neutral-800 rounded animate-pulse" />
          <div className="h-5 w-32 bg-neutral-800 rounded animate-pulse" />
        </div>
      ))}

      <div className="w-full h-auto p-4 my-1 flex rounded-lg text-lg bg-[#333232] justify-between items-center">
        <div className="h-5 w-28 bg-neutral-800 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionDetailSkeleton;
