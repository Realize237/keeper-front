import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  getNextBillingDate,
  getSubscriptionCardImage,
  pluralize,
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
import { FaCalendarPlus, FaEye, FaTrash } from "react-icons/fa";
import {
  useAddSubscriptionToGoogleCalendar,
  useRemoveSubscriptionFromGoogleCalendar,
  useSubscriptionsDetails,
} from "../../hooks/useSubscriptions";
import {
  useGoogleCalendarAccess,
  useConnectGoogleCalendar,
} from "../../hooks/useGoogleCalendar";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import SubscriptionDetailSkeleton from "./SubscriptionDetailSkeleton";
import ErrorState from "../common/ErrorState";

interface SubscriptionDetailModalProps {
  selectedSubscriptionDetails: Subscription;
  closeSubscriptionModals: (type: SubscriptionModalType) => void;
}

export default function SubscriptionDetailModal({
  selectedSubscriptionDetails,
  closeSubscriptionModals,
}: SubscriptionDetailModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const {
    data: subscriptionDetails,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useSubscriptionsDetails(selectedSubscriptionDetails.id);

  const { data: hasGoogleCalendarAccess, isLoading: isCheckingAccess } =
    useGoogleCalendarAccess();
  const { mutate: connectGoogleCalendar, isPending: isConnecting } =
    useConnectGoogleCalendar();

  const nextBillingResult: BillingResult | null = subscriptionDetails?.type
    ? getNextBillingDate(
        new Date(subscriptionDetails.details.startDate || new Date()),
        new Date(subscriptionDetails.details.endDate || new Date()),
        subscriptionDetails.type
      )
    : null;

  function formatToReadableDate(date: string | Date) {
    const d = typeof date === "string" ? new Date(date) : date;

    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const { mutate: addToGoogleCalendar, isPending: isAddingPending } =
    useAddSubscriptionToGoogleCalendar();
  const { mutate: removeFromGoogleCalendar, isPending: isRemoving } =
    useRemoveSubscriptionFromGoogleCalendar();

  const getFormattedNextBillingDate = () => {
    if (!nextBillingResult) return "Loading...";

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

  const title = `${
    subscriptionDetails?.details.name
  } — $${subscriptionDetails?.price.toFixed(2)}`;

  const next = nextBillingResult
    ? nextBillingResult.status === "EXPIRED"
      ? "expired"
      : nextBillingResult.status === "ACTIVE"
      ? formatToReadableDate(nextBillingResult.date!)
      : nextBillingResult.status.toLowerCase()
    : "loading";

  const description = `${
    subscriptionDetails?.details.name
  } — $${subscriptionDetails?.price.toFixed(
    2
  )} ${subscriptionDetails?.type?.toLowerCase()} plan, ${
    nextBillingResult?.status === "EXPIRED"
      ? `subscription expired on ${formatToReadableDate(
          subscriptionDetails?.details.endDate || new Date()
        )}`
      : `billed next on ${next}`
  }, paid with ${
    subscriptionDetails?.card
  } ending in 5064, valid from ${formatToReadableDate(
    subscriptionDetails?.details?.startDate || new Date()
  )} to ${formatToReadableDate(
    subscriptionDetails?.details?.endDate || new Date()
  )}.`;

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const addSubscriptionToCalendar = () => {
    addToGoogleCalendar(
      {
        data: { title, description },
        subscriptionId: selectedSubscriptionDetails.id,
      },
      {
        onSuccess: () =>
          toast.success("Your subscription is now on Google Calendar."),
        onError: (error: Error) =>
          toast.error(
            error?.message || "Failed to add subscription to Google Calendar."
          ),
      }
    );
  };

  const onAddToGoogleCalendar = () => {
    if (isCheckingAccess || isConnecting || isAddingPending) {
      return;
    }

    if (!hasGoogleCalendarAccess) {
      connectGoogleCalendar(undefined, {
        onSuccess: () => {
          toast.success("Google Calendar connected");
          addSubscriptionToCalendar();
        },
        onError: (error: Error) => {
          toast.error(error?.message || "Failed to connect Google Calendar");
        },
      });
      return;
    }

    addSubscriptionToCalendar();
  };

  const onRemoveFromGoogleCalendar = () => {
    removeFromGoogleCalendar(
      {
        subscriptionId: selectedSubscriptionDetails.id,
      },
      {
        onSuccess: () =>
          toast.success("Subscription removed from Google Calendar."),
        onError: (error: Error) =>
          toast.error(
            error.message ||
              "Failed to remove subscription from Google Calendar. Please try again."
          ),
      }
    );
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
            className="min-w-sm px-4 h-dvh overflow-y-auto flex flex-col items-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <SubscriptionDetailSkeleton
                onClose={() => {
                  setIsOpen(false);
                  closeSubscriptionModals(SubscriptionModalTypes.DETAILS);
                }}
              />
            ) : error ? (
              <div className="w-full h-full flex flex-col">
                <motion.div
                  onClick={() => {
                    setIsOpen(false);
                    closeSubscriptionModals(SubscriptionModalTypes.DETAILS);
                  }}
                  className="w-10 h-10 my-2 bg-[#2f2f2f] rounded-full flex justify-center items-center self-end float-right cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MdOutlineClear className="text-md text-white" />
                </motion.div>
                <div className="flex-1 flex items-center justify-center">
                  <ErrorState
                    message="Failed to load subscription details"
                    onRetry={() => refetch()}
                  />
                </div>
              </div>
            ) : (
              <>
                {isFetching && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full flex justify-center mb-2"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#2f2f2f] rounded-full">
                      <Spinner />
                      <span className="text-white text-sm">Updating...</span>
                    </div>
                  </motion.div>
                )}

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
                  src={subscriptionDetails?.details?.iconUrl}
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
                    {subscriptionDetails?.details?.name}
                  </p>
                  <div className="p-1 px-2 ml-2 flex rounded-lg justify-center items-centers bg-[#bbcdcc]">
                    <span className="text-green-800 text-lg]">
                      ${subscriptionDetails?.price}
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
                  <span className="mr-2 text-[#838383] font-bold">
                    Next bill:{" "}
                  </span>
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
                  <span className="text-[#838383] font-bold">
                    Payment method{" "}
                  </span>
                  <div className="flex justify-center items-center">
                    <img
                      src={getSubscriptionCardImage(subscriptionDetails)}
                      className="w-10 h-6 rounded-md object-cover mr-2"
                    />
                    <span className="text-white">5064</span>
                  </div>
                </motion.div>

                {nextBillingResult?.daysRemaining && (
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
                        {nextBillingResult?.daysRemaining
                          ? pluralize(
                              nextBillingResult.daysRemaining,
                              "day",
                              "days"
                            )
                          : ""}
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
                    value={subscriptionDetails?.type || "MONTHLY"}
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
                    {subscriptionDetails?.plan}
                  </span>
                </motion.div>

                <motion.div
                  className="w-full h-auto p-4 my-1 flex rounded-lg text-lg bg-[#333232] justify-between items-start items-center"
                  variants={itemVariants}
                  custom={8}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ backgroundColor: "#3d3d3d" }}
                >
                  <span className="text-[#838383] font-bold">Remind me </span>
                  <NotificationReminder
                    subscription={selectedSubscriptionDetails}
                  />
                </motion.div>
                <motion.div
                  className="w-full h-auto p-4 my-1 flex rounded-lg text-lg bg-[#333232] justify-between items-center gap-4"
                  variants={itemVariants}
                  custom={9}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ backgroundColor: "#3d3d3d" }}
                >
                  <span className="text-[#838383] font-bold">
                    Sync to Google Calendar
                  </span>
                  <div className="flex gap-2">
                    {!subscriptionDetails?.calendarLink ? (
                      <button
                        onClick={onAddToGoogleCalendar}
                        className={`flex items-center gap-1 px-3 py-1 text-xs bg-[#CDFF00] rounded transition ${
                          isAddingPending || isConnecting
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                      >
                        {isAddingPending || isConnecting ? (
                          <Spinner />
                        ) : (
                          <>
                            <FaCalendarPlus /> Add
                          </>
                        )}
                      </button>
                    ) : (
                      <>
                        <a
                          href={subscriptionDetails?.calendarLink}
                          target="_blank"
                          className="flex items-center gap-1 px-3 py-1 text-xs bg-[#CDFF00] rounded  transition"
                        >
                          <FaEye />
                        </a>
                        <button
                          onClick={onRemoveFromGoogleCalendar}
                          className={`flex items-center gap-1 px-3 py-1 text-xs bg-red-600 rounded hover:bg-red-700 transition ${
                            isRemoving
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer"
                          }`}
                        >
                          {isRemoving ? (
                            <Spinner />
                          ) : (
                            <FaTrash className="text-white" />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
