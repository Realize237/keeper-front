import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TbScreenshot } from "react-icons/tb";
import { daysOfWeek, monthsOfYear } from "../constants";
import Calendar from "../components/calendar/Calendar";
import SelectCalendarDate from "../components/ui/Calendar";
import {
  SUBSCRIPTION_TYPES,
  SubscriptionModalTypes,
  type Subscription,
  type SubscriptionModalType,
  type SubscriptionsGroupedByDay,
} from "../interfaces/subscription";
import SubscriptionDetailModal from "../components/subscriptions/SubscriptionDetailModal";
import SelectedDaySubscriptionsListModal from "../components/subscriptions/SelectedDaySubscriptionsListModal";
import {
  isEmpty,
  normalizedDate,
  updateCurrentDateToSelectedDate,
} from "../utils";
import BottomSheet from "../components/ui/BottomSheet";
import type { Value } from "../interfaces/calendar";
import SubscriptionTypeAndDot from "../components/ui/SubscriptionTypeAndDot";
import { useMonthlySubscriptions } from "../hooks/useSubscriptions";
import CalendarSkeleton, {
  MonthlyHeaderSkeleton,
} from "../components/calendar/CalendarSkeleton";
import ErrorState from "../components/common/ErrorState";
import { useNavigate } from "react-router-dom";
import { useUserNotifications } from "../hooks/useNotifications";
import NotificationBell from "../components/notifications/NotificationBell";
import { NotificationStatus } from "../interfaces/notifications";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Subscriptions = () => {
  const [selectDay, setSelectDay] = useState<number | null>(null);
  const [currentDate, onChangeCalendarValue] = useState<Value>(new Date());
  const [selectedSubsciptionsByDay, setSelectedSubscriptionsByDay] =
    useState<SubscriptionsGroupedByDay>({});
  const [selectedSubscriptionDetails, setSelectedSubscriptionDetails] =
    useState<Subscription | null>(null);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const usersNotifications = useUserNotifications();

  const openBottomSheet = () => setBottomSheetOpen(true);
  const closeBottomSheet = () => setBottomSheetOpen(false);

  const normalized = normalizedDate(currentDate);

  const navigate = useNavigate();

  const {
    data: groupedMonthlySubscriptions = {},
    isLoading,
    error,
    refetch,
  } = useMonthlySubscriptions(normalized);

  console.log("Use monthly subscriptions: ", groupedMonthlySubscriptions)

  const getDaySubscriptions = useCallback(
    (day: number) => {
      const isFoundInGroupedData = Object.keys(
        groupedMonthlySubscriptions
      ).some((data) => Number(data) === day);
      if (!isFoundInGroupedData) return;
      const subscriptions = groupedMonthlySubscriptions[day];
      setSelectedSubscriptionsByDay({ [day]: subscriptions });
      setSelectedDay(
        updateCurrentDateToSelectedDate(normalizedDate(currentDate), day)
      );
    },
    [groupedMonthlySubscriptions, currentDate]
  );

  const closeSubscriptionModals = (type: SubscriptionModalType) => {
    switch (type) {
      case SubscriptionModalTypes.DETAILS:
        setSelectedSubscriptionDetails(null);
        break;
      case SubscriptionModalTypes.LIST:
        setSelectedSubscriptionsByDay({});
        break;
    }
  };

  const setSelectSubscriptionDetails = (subscription: Subscription) => {
    setSelectedSubscriptionDetails({ ...subscription });
  };

  const getSelectedSubscriptions = () => {
    const selectedDay = Number(Object.keys(selectedSubsciptionsByDay)[0]);
    return selectedSubsciptionsByDay[selectedDay];
  };

  const getTotalMonthlySubscriptions = useMemo(() => {
    if (!isEmpty(groupedMonthlySubscriptions)) {
      const flattenedArray = Object.values(groupedMonthlySubscriptions).flat();
      const total = flattenedArray.reduce((total, subscription) => {
        return total + subscription.price;
      }, 0);

      return Number(total.toFixed(2));
    }

    return 0;
  }, [groupedMonthlySubscriptions]);

  const unReadCount = useMemo(() => {
    if (!usersNotifications.data) return 0;
    return usersNotifications.data?.filter(
      (not) => not.status === NotificationStatus.UNREAD
    ).length;
  }, [usersNotifications]);

  return (
    <div className="flex justify-center">
      {!isEmpty(selectedSubsciptionsByDay) && (
        <SelectedDaySubscriptionsListModal
          selectedSubsciptionsByDay={getSelectedSubscriptions()}
          closeSubscriptionModals={closeSubscriptionModals}
          setSelectSubscriptionDetails={setSelectSubscriptionDetails}
          selectedDay={selectedDay}
        />
      )}
      {selectedSubscriptionDetails && (
        <SubscriptionDetailModal
          selectedSubscriptionDetails={selectedSubscriptionDetails}
          closeSubscriptionModals={closeSubscriptionModals}
        />
      )}

      <motion.div
        className="w-11/12 h-11/12 mx-auto border-gray-700"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="w-full h-auto p-2 pb-6 mb-2 flex border-b border-[#2f2f2f] justify-between items-center"
          variants={itemVariants}
        >
          <div>
            <span className="text-white text-3xl mr-4">Calendar</span>
            <span className="text-gray-400 text-3xl">List</span>
          </div>
          <div className="flex items-center space-x-3">
            <NotificationBell
              count={unReadCount}
              onClick={() => navigate("/notifications")}
            />
            <motion.div
              className="flex justify-center items-center cursor-pointer p-3 bg-[#2f2f2f] rounded-full hover:bg-[#3f3f3f]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <TbScreenshot className="text-xl text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Body */}
        <motion.div
          className="w-full h-auto pt-6 flex justify-between items-center"
          variants={itemVariants}
        >
          <div>
            <span className="text-white text-2xl">
              {
                monthsOfYear[
                  new Date(normalizedDate(currentDate)).getMonth() + 1
                ]
              }
              , {new Date(normalizedDate(currentDate)).getFullYear()}
            </span>
          </div>
          <div className="flex justify-center flex-col md:flex-row items-center">
            <span className="text-gray-400 text-md md:mr-2 md:mt-0 mt-4">
              Monthly total:
            </span>
            {isLoading ? (
              <span className="bg-[#3a3a3a] animate-pulse w-12 h-3"></span>
            ) : (
              <span className="text-white text-md">
                {" "}
                ${getTotalMonthlySubscriptions}
              </span>
            )}
          </div>
        </motion.div>

        {/* Year and Month */}
        <motion.div
          className="w-full h-auto mb-4 flex items-center"
          variants={itemVariants}
        >
          {Object.entries(SUBSCRIPTION_TYPES).map(([key, value]) => (
            <SubscriptionTypeAndDot key={key} value={value} />
          ))}
        </motion.div>

        {/* days of the week */}
        <motion.div
          className="w-full h-auto p-2 my-2 grid grid-cols-7"
          variants={itemVariants}
        >
          {daysOfWeek.map((day, index) => (
            <motion.button
              key={day}
              onClick={() => setSelectDay(index)}
              className={`p-1 mr-1 px-4 md:py-2 rounded-full ${
                selectDay === index ? "border border-[#303031]" : "bg-[#464646]"
              } cursor-pointer h-auto flex justify-center items-center`}
              whileHover={{ scale: 1.05, backgroundColor: "#3f3f3f" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-gray-400 text-sm">{day}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* day of the month */}
        <motion.div variants={itemVariants}>
          {isLoading && (
            <>
              <MonthlyHeaderSkeleton />
              <CalendarSkeleton />
            </>
          )}
          {!isLoading && !error && (
            <Calendar
              date={currentDate}
              getDaySubscriptions={getDaySubscriptions}
              groupedMonthlySubscriptions={groupedMonthlySubscriptions}
            />
          )}
        </motion.div>

        {error && (
          <ErrorState
            message="Failed to load subscriptions."
            onRetry={() => refetch()}
          />
        )}

        {isLoading ? (
          <div className="w-full mt-4 bg-[#3a3a3a] animate-pulse h-14 rounded-xl" />
        ) : error ? null : (
          <motion.div
            className="w-full mt-4"
            onClick={openBottomSheet}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <button className="text-md bg-[#464646] rounded-xl w-full py-4 text-gray-300 cursor-pointer">
              Select Date
            </button>
          </motion.div>
        )}
      </motion.div>

      <BottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet}>
        <motion.div variants={itemVariants}>
          <SelectCalendarDate
            currentDate={currentDate}
            onChange={onChangeCalendarValue}
            closeBottomSheet={closeBottomSheet}
          />
        </motion.div>
      </BottomSheet>
    </div>
  );
};

export default Subscriptions;
