import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  formatToReadableDate,
  getNextBillingDate,
  getSubscriptionCardImage,
} from "../../utils";
import { MdOutlineClear } from "react-icons/md";
import SubscriptionTypeAndDot from "../ui/SubscriptionTypeAndDot";
import {
  SubscriptionModalTypes,
  type Subscription,
  type SubscriptionModalType,
} from "../../interfaces/subscription";
import type { BillingResult } from "../../interfaces/billings";
import NotificationReminder from "../notifications/Reminder";

interface SubscriptionDetailModalProps {
  selectedSubscriptionDetails: Subscription;
  closeSubscriptionModals: (type: SubscriptionModalType) => void;
}

export default function SubscriptionDetailModal({
  selectedSubscriptionDetails,
  closeSubscriptionModals,
}: SubscriptionDetailModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const nextBillingResult: BillingResult = getNextBillingDate(
    new Date(selectedSubscriptionDetails.details.startDate),
    new Date(selectedSubscriptionDetails.details.endDate),
    selectedSubscriptionDetails.type
  );

  const getFormattedNextBillingDate = () => {
    switch (nextBillingResult.status) {
      case "ACTIVE":
        return formatToReadableDate(
          new Date(nextBillingResult.date as Date).toDateString()
        );
      case "DUE TODAY":
      default:
        return nextBillingResult.status;
    }
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
        type: "spring" as const,
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
        type: "spring" as const,
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={` z-20 flex flex-col justify-center items-center absolute bg-[#000000e0]`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleClose}
        >
          <motion.div
            className="min-w-sm px-4 h-11/12 flex flex-col items-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              onClick={() => {
                setIsOpen(false);
                closeSubscriptionModals(SubscriptionModalTypes.DETAILS);
              }}
              className="w-10 h-10 my-2 bg-[#2f2f2f] rounded-full flex justify-center items-center self-end float-right cursor-pointer"
              variants={itemVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MdOutlineClear className="text-md text-white" />
            </motion.div>

            <motion.img
              src={selectedSubscriptionDetails.details.iconUrl}
              className="w-18 h-18 my-2 mb-8 rounded-full object-cover"
              variants={itemVariants}
              custom={1}
              initial="hidden"
              animate="visible"
              exit="exit"
            />

            <motion.div
              className="flex my-2"
              variants={itemVariants}
              custom={2}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p className="text-white text-3xl">
                {selectedSubscriptionDetails?.details?.name}
              </p>
              <div className="p-1 px-2 ml-2 flex rounded-lg justify-center items-centers bg-[#bbcdcc]">
                <span className="text-green-800 text-lg]">
                  ${selectedSubscriptionDetails.price}
                </span>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center items-center mb-4 text-lg"
              variants={itemVariants}
              custom={3}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <span className="mr-2 text-[#838383] font-bold">Next bill: </span>
              <span className="text-white">
                {getFormattedNextBillingDate()}
              </span>
            </motion.div>

            <motion.div
              className="w-full h-auto p-4 my-1 flex rounded-lg text-lg bg-[#333232] justify-between items-center"
              variants={itemVariants}
              custom={4}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ backgroundColor: "#3d3d3d" }}
            >
              <span className="text-[#838383] font-bold">Payment method </span>
              <div className="flex justify-center items-center">
                <img
                  src={getSubscriptionCardImage(selectedSubscriptionDetails)}
                  className="w-10 h-6 rounded-md object-cover mr-2"
                />
                <span className="text-white">5064</span>
              </div>
            </motion.div>

            {nextBillingResult.daysRemaining && (
              <motion.div
                className="w-full h-auto p-4 my-1 flex rounded-lg text-lg bg-[#333232] justify-between items-center"
                variants={itemVariants}
                custom={5}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ backgroundColor: "#3d3d3d" }}
              >
                <span className="text-[#838383] font-bold">Remaining</span>
                <div className="p-1 px-2 ml-2 flex rounded-lg justify-center items-centers bg-[#cdbbbb]">
                  <span className="text-red-800 text-lg]">
                    {nextBillingResult.daysRemaining} days
                  </span>
                </div>
              </motion.div>
            )}

            <motion.div
              className="w-full h-auto p-4 my-1 flex rounded-lg text-lg bg-[#333232] justify-between items-center"
              variants={itemVariants}
              custom={6}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ backgroundColor: "#3d3d3d" }}
            >
              <span className="text-[#838383] font-bold">Period </span>
              <SubscriptionTypeAndDot
                value={selectedSubscriptionDetails.type}
              />
            </motion.div>

            <motion.div
              className="w-full h-auto p-4 my-1 flex rounded-lg text-lg bg-[#333232] justify-between items-center"
              variants={itemVariants}
              custom={7}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ backgroundColor: "#3d3d3d" }}
            >
              <span className="text-[#838383] font-bold">Plan </span>
              <span className="text-white">
                {selectedSubscriptionDetails.plan}
              </span>
            </motion.div>

            <motion.div
              className="w-full h-auto p-4 my-1 flex rounded-lg text-lg bg-[#333232] justify-between items-start"
              variants={itemVariants}
              custom={8}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ backgroundColor: "#3d3d3d" }}
            >
              <span className="text-[#838383] font-bold">Remind me </span>
              <NotificationReminder subscription={selectedSubscriptionDetails} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
