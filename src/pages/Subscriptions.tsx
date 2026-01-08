import { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoIosTrendingUp } from 'react-icons/io';
import { CiCreditCard1 } from 'react-icons/ci';
import Calendar from '../components/calendar/Calendar';
import SelectCalendarDate from '../components/ui/Calendar';
import {
  SubscriptionModalTypes,
  type Subscription,
  type SubscriptionModalType,
  type SubscriptionsGroupedByDay,
} from '../interfaces/subscription';
import SubscriptionDetailModal from '../components/subscriptions/SubscriptionDetailModal';
import SelectedDaySubscriptionsListModal from '../components/subscriptions/SelectedDaySubscriptionsListModal';
import {
  isEmpty,
  normalizedDate,
  updateCurrentDateToSelectedDate,
} from '../utils';
import BottomSheet from '../components/ui/BottomSheet';
import type { Value } from '../interfaces/calendar';
import { useMonthlySubscriptions } from '../hooks/useSubscriptions';
import CalendarSkeleton, {
  MonthlyHeaderSkeleton,
} from '../components/calendar/CalendarSkeleton';
import ErrorState from '../components/common/ErrorState';
import NotificationPermissionModal from '../components/ui/NotificationPermissionModal';
import { useNotificationPermission } from '../hooks/useNotificationPermission';
import toast from 'react-hot-toast';
import SubscriptionStatCard from '../components/subscriptions/SubscriptionStatCard';
import { FaWallet } from 'react-icons/fa';
import SubscriptionIconGroup from '../components/subscriptions/SubscriptionIconGroup';
import SubscriptionFilterModal, {
  type FilterData,
} from '../components/subscriptions/SubscriptionFilterModal';
import { CiFilter } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';
import { MONTH_KEYS } from '../constants/calendar';

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
  const { t } = useTranslation();
  const [selectDay, setSelectDay] = useState<number | null>(null);
  const [currentDate, onChangeCalendarValue] = useState<Value>(new Date());
  const [selectedSubsciptionsByDay, setSelectedSubscriptionsByDay] =
    useState<SubscriptionsGroupedByDay>({});
  const [selectedSubscriptionDetails, setSelectedSubscriptionDetails] =
    useState<Subscription | null>(null);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const {
    showModal,
    checkAndShowModal,
    handlePermissionGranted,
    handleModalClose,
    hasAskedBefore,
  } = useNotificationPermission();

  const openBottomSheet = () => setBottomSheetOpen(true);
  const closeBottomSheet = () => setBottomSheetOpen(false);
  const [openFilter, setOpenFilter] = useState(false);

  const translatedDaysOfWeek = t('calendar.days_of_week', {
    returnObjects: true,
  }) as string[];

  const handleApplyFilters = (filters: FilterData) => {
    console.log('filters: ', filters);
  };

  const normalized = normalizedDate(currentDate);
  const date = new Date(normalizedDate(currentDate));
  const monthIndex = date.getMonth();

  useEffect(() => {
    if (!hasAskedBefore()) {
      const timer = setTimeout(() => {
        checkAndShowModal();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasAskedBefore, checkAndShowModal]);

  const {
    data: groupedMonthlySubscriptions = {},
    isLoading,
    error,
    refetch,
  } = useMonthlySubscriptions(normalized);

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

  const getRemainingAmount = useMemo(() => {
    if (!isEmpty(groupedMonthlySubscriptions)) {
      const allSubscriptions = Object.values(
        groupedMonthlySubscriptions
      ).flat();
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const currentMonthBills = allSubscriptions.filter((subscription) => {
        const nextBillingDate = new Date(subscription.details.endDate);
        return (
          nextBillingDate >= now &&
          nextBillingDate <= endOfMonth &&
          subscription.reccurring
        );
      });

      const totalCurrentMonth = currentMonthBills.reduce(
        (total, subscription) => total + subscription.price,
        0
      );

      return Number(totalCurrentMonth.toFixed(2));
    }
    return 0;
  }, [groupedMonthlySubscriptions]);

  const getProgressPercentage = useMemo(() => {
    const totalMonthly = getTotalMonthlySubscriptions;
    const remaining = getRemainingAmount;

    if (totalMonthly === 0) return 100;

    const paidAmount = totalMonthly - remaining;
    const progressPercent = Math.round((paidAmount / totalMonthly) * 100);

    return Math.max(0, Math.min(progressPercent, 100));
  }, [getTotalMonthlySubscriptions, getRemainingAmount]);

  // Get subscriptions that will be billed soon (next 7 days)
  const getNextBillingSubscriptions = useMemo(() => {
    if (!isEmpty(groupedMonthlySubscriptions)) {
      const allSubscriptions = Object.values(
        groupedMonthlySubscriptions
      ).flat();
      const now = new Date();
      const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      return allSubscriptions.filter((subscription) => {
        const nextBillingDate = new Date(subscription.details.endDate);
        return (
          nextBillingDate >= now &&
          nextBillingDate <= next7Days &&
          subscription.reccurring
        );
      });
    }
    return [];
  }, [groupedMonthlySubscriptions]);

  const getNextBillingAmount = useMemo(() => {
    return getNextBillingSubscriptions.reduce(
      (total, sub) => total + sub.price,
      0
    );
  }, [getNextBillingSubscriptions]);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          <SubscriptionStatCard
            variant="stat"
            icon={<FaWallet size={20} />}
            title={t('subscriptions.stat_cards.monthly_total')}
            value={`$${getTotalMonthlySubscriptions}`}
            badge={t(`calendar.months.${MONTH_KEYS[monthIndex]}`)}
          />
          <SubscriptionStatCard
            variant="progress"
            icon={<IoIosTrendingUp size={20} />}
            title={t('subscriptions.stat_cards.left_to_pay')}
            value={`$${getRemainingAmount}`}
            progress={getProgressPercentage}
            accent="orange"
          />
          <SubscriptionStatCard
            variant="status"
            icon={<CiCreditCard1 size={20} />}
            title={t('subscriptions.stat_cards.next_7_days')}
            secondaryText={`$${getNextBillingAmount.toFixed(2)}`}
            accent="indigo"
            customContent={
              <div className="mt-2">
                <SubscriptionIconGroup
                  subscriptions={getNextBillingSubscriptions}
                  maxVisible={3}
                  size="sm"
                />
              </div>
            }
          />
        </div>

        <div className="flex flex-col-reverse md:flex-row  mt-6 gap-6">
          <div className="grow">
            <motion.div
              className="w-full h-auto  flex justify-between items-center"
              variants={itemVariants}
            >
              <div>
                <span className="text-white text-2xl">
                  {t(`calendar.months.${MONTH_KEYS[monthIndex]}`)},{' '}
                  {date.getFullYear()}
                </span>
              </div>
            </motion.div>
            {/* days of the week */}
            <motion.div
              className="w-full h-auto p-2 my-2 grid grid-cols-7"
              variants={itemVariants}
            >
              {translatedDaysOfWeek.map((day, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectDay(index)}
                  className={`p-1 mr-1 px-4 md:py-2 rounded-full ${
                    selectDay === index
                      ? 'border border-[#303031]'
                      : 'bg-[#464646]'
                  } cursor-pointer h-auto flex justify-center items-center`}
                  whileHover={{ scale: 1.05, backgroundColor: '#3f3f3f' }}
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
            {isLoading ? (
              <div className="w-full mt-4 bg-[#3a3a3a] animate-pulse h-14 rounded-xl" />
            ) : error ? (
              <ErrorState
                message={t('subscriptions.modals.failed_to_load')}
                onRetry={() => refetch()}
              />
            ) : (
              <motion.div
                className="w-full mt-4"
                onClick={openBottomSheet}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <button className="text-md bg-[#464646] rounded-xl w-full py-4 text-gray-300 cursor-pointer">
                  {t('common.select_date')}
                </button>
              </motion.div>
            )}
          </div>
          <div className="md:sticky md:mt-4">
            <p className="text-xs uppercase tracking-wider text-white/40 mb-2">
              {t('subscriptions.filter.title')}
            </p>

            <motion.button
              onClick={() => setOpenFilter(true)}
              whileHover={{
                y: -1,
                backgroundColor: 'rgba(255,255,255,0.08)',
              }}
              whileTap={{
                scale: 0.98,
                y: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
              className="
    w-full flex items-center justify-between
    rounded-2xl px-4 py-3
    bg-white/5 backdrop-blur-xl
    border border-white/10
    text-sm text-white
    gap-1
  "
            >
              <span className="capitalize">
                {t('subscriptions.filter.title')}
              </span>

              <motion.span
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="text-white/50"
              >
                <CiFilter />
              </motion.span>
            </motion.button>
          </div>
        </div>
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
      <NotificationPermissionModal
        isOpen={showModal}
        onClose={() => {
          handleModalClose();
        }}
        onPermissionGranted={() => {
          handlePermissionGranted();
          toast.success(t('common.notifications_enabled'));
        }}
      />
      <SubscriptionFilterModal
        isOpen={openFilter}
        onClose={() => setOpenFilter(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default Subscriptions;
