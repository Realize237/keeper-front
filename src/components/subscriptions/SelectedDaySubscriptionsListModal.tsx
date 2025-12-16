import { CiCircleRemove } from 'react-icons/ci';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  SubscriptionModalTypes,
  type Subscription,
  type SubscriptionModalType,
} from '../../interfaces/subscription';

import { formatToReadableDate } from '../../utils';
interface SelectedDaySubscriptionsListModalProps {
  selectedSubsciptionsByDay: Subscription[];
  closeSubscriptionModals: (type: SubscriptionModalType) => void;
  setSelectSubscriptionDetails: (Subscription: Subscription) => void;
  selectedDay: Date | null;
}

export default function SelectedDaySubscriptionsListModal({
  selectedSubsciptionsByDay,
  closeSubscriptionModals,
  setSelectSubscriptionDetails,
  selectedDay,
}: SelectedDaySubscriptionsListModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const getTotal = (selectedSubsciptionsByDay: Subscription[]) => {
    const sum = selectedSubsciptionsByDay.reduce((total, curr) => {
      return total + curr.price;
    }, 0);

    return sum;
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    }),
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.2,
      },
    },
  };

  const subscriptionItemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + custom * 0.08,
        duration: 0.5,
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    }),
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`h-screen z-20 flex flex-col justify-center items-center absolute bg-[#000000e0]`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleClose}
        >
          <motion.div
            className="min-w-sm h-11/12 flex flex-1 flex-col justify-center items-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={() =>
                closeSubscriptionModals(SubscriptionModalTypes.LIST)
              }
              className="w-8 h-8 mb-2 rounded-full flex justify-center items-center cursor-pointer"
              variants={itemVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <CiCircleRemove className="text-red-500 shadow-lg" size={28} />
            </motion.button>

            <motion.div
              className="w-auto h-auto bg-[#2f2f2f] p-2 rounded-full flex mb-2"
              variants={itemVariants}
              custom={1}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <span className="text-[#848484] text-sm">TOTAL:</span>
              <span className="text-white text-sm ml-2">
                ${getTotal(selectedSubsciptionsByDay)}
              </span>
            </motion.div>

            <motion.div
              className="w-3/4 h-auto p-2 py-8 bg-[#2f2f2f] rounded-[45px] flex flex-col justify-center items-center"
              variants={itemVariants}
              custom={2}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {selectedSubsciptionsByDay?.length &&
                selectedSubsciptionsByDay.map((subscription, index) => (
                  <motion.div
                    key={index}
                    className="w-[85%] px-2 h-16 bg-[#1c1b1be0] my-1 rounded-full flex items-center justify-around"
                    variants={subscriptionItemVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ scale: 1.02, backgroundColor: '#2a2a2ae0' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectSubscriptionDetails(subscription);
                      closeSubscriptionModals(SubscriptionModalTypes.LIST);
                    }}
                  >
                    <img
                      src={subscription.details.iconUrl}
                      className="w-8 h-8 rounded-md"
                    />
                    <p className="text-white text-xl font-bold">
                      {subscription.details.name}
                    </p>
                    <span className="text-[#848484] text-xl font-bold">
                      ${subscription.price}
                    </span>
                  </motion.div>
                ))}

              <motion.div
                variants={itemVariants}
                custom={2 + selectedSubsciptionsByDay?.length}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-[#848484] text-sm mt-6"
              >
                {selectedDay &&
                  formatToReadableDate(new Date(selectedDay).toDateString())}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
