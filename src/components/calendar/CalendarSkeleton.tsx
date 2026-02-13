import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export const CalendarSkeleton = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full mt-4"
    >
      <div className="w-40 h-6 skeleton mb-4" />

      <div className="grid grid-cols-7 gap-2 mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-4 skeleton opacity-70" />
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <motion.div
            key={i}
            variants={item}
            className="w-full h-10 skeleton"
          />
        ))}
      </div>
    </motion.div>
  );
};

export const MonthlyHeaderSkeleton = () => (
  <div className="w-40 h-6 skeleton mt-4 mb-2" />
);
