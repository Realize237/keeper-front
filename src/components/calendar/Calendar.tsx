import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { getMonthMatrixMondayFirst, normalizedDate } from '../../utils';
import SubscriptionCard from '../subscriptions/SubscriptionCard';
import type { SubscriptionsGroupedByDay } from '../../interfaces/subscription';
import type { Value } from '../../interfaces/calendar';

interface CalendarProps {
  date: Value | Date;
  getDaySubscriptions: (day: number) => void;
  groupedMonthlySubscriptions: SubscriptionsGroupedByDay;
}

export default function Calendar({
  date,
  getDaySubscriptions,
  groupedMonthlySubscriptions,
}: CalendarProps) {
  const monthMatrix = useMemo(
    () => getMonthMatrixMondayFirst(normalizedDate(date)),
    [date]
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="w-full h-auto grid grid-cols-7 gap-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {monthMatrix.map((week, weekIndex) =>
        week.map((day, dayIndex) => (
          <motion.div
            key={`${weekIndex}-${dayIndex}`}
            className={`w-12 h-14 md:w-full mr-1 flex flex-col ${groupedMonthlySubscriptions[Number(day)] ? 'justify-between' : 'justify-end'} items-center bg-surface rounded-lg cursor-pointer hover:bg-muted`}
            variants={itemVariants}
            whileHover={{
              scale: 0.95,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (day) {
                getDaySubscriptions(Number(day));
              }
            }}
          >
            {groupedMonthlySubscriptions[Number(day)] && (
              <SubscriptionCard
                subscriptions={groupedMonthlySubscriptions[Number(day)]}
              />
            )}
            <span className="text-surface-foreground text-sm mb-1">{day}</span>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
