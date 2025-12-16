import { motion } from 'framer-motion';

const CalendarSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-7 gap-2 mt-4">
      {Array.from({ length: 35 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-full h-10 bg-[#3a3a3a] rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
};

export default CalendarSkeleton;

export const MonthlyHeaderSkeleton = () => (
  <div className="w-full h-6 bg-[#3a3a3a] rounded-lg animate-pulse mt-4 mb-2"></div>
);
