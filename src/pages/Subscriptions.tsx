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
import UserConsentDialog from '../components/dialog/UserConsentDialog';
import { useUserConsent } from '../hooks/useUserConsent';
import AccountSyncBanner from '../components/subscriptions/AccountSyncBanner ';
import { CalendarSkeleton } from '../components/calendar/CalendarSkeleton';

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
  const [activeFilters, setActiveFilters] = useState<FilterData | null>(null);

  const {
    showModal,
    checkAndShowModal,
    handlePermissionGranted,
    handleModalClose,
    hasAskedBefore,
  } = useNotificationPermission();

  const {
    showModal: showUserConsent,
    checkAndShowModal: checkAndShowUserConsent,
    handleConsentAccepted,
    handleConsentDeclined,
    isPending: isAcceptUserConsentPending,
    handleShowModal,
  } = useUserConsent();

  const openBottomSheet = () => setBottomSheetOpen(true);
  const closeBottomSheet = () => setBottomSheetOpen(false);
  const [openFilter, setOpenFilter] = useState(false);

  const translatedDaysOfWeek = t('calendar.days_of_week', {
    returnObjects: true,
  }) as string[];

  const handleApplyFilters = (filters: FilterData) => {
    setActiveFilters(filters);
  };

  const normalized = normalizedDate(currentDate);
  const date = new Date(normalizedDate(currentDate));
  const monthIndex = date.getMonth();

  useEffect(() => {
    if (hasAskedBefore()) return;

    const onFirstInteraction = () => {
      checkAndShowModal();
      window.removeEventListener('click', onFirstInteraction);
    };

    window.addEventListener('click', onFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', onFirstInteraction);
    };
  }, [hasAskedBefore, checkAndShowModal]);

  useEffect(() => {
    checkAndShowUserConsent();
  }, []);

  const {
    data: groupedMonthlySubscriptions = {},
    isLoading,
    error,
    refetch,
  } = useMonthlySubscriptions(normalized);

  const filteredSubscriptions = useMemo(() => {
    if (!activeFilters) return groupedMonthlySubscriptions;
    const filteredResult: SubscriptionsGroupedByDay = {};

    Object.keys(groupedMonthlySubscriptions).forEach((day) => {
      const subscriptionsForDay = groupedMonthlySubscriptions[Number(day)];

      const filtered = subscriptionsForDay.filter((subscription) => {
        const categoryMatch =
          activeFilters.categories.length === 0 ||
          activeFilters.categories.includes(subscription.details.category);

        const priceMatch =
          subscription.price >= activeFilters.priceRange[0] &&
          subscription.price <= activeFilters.priceRange[1];

        return categoryMatch && priceMatch;
      });

      if (filtered.length > 0) {
        filteredResult[Number(day)] = filtered;
      }
    });

    return filteredResult;
  }, [groupedMonthlySubscriptions, activeFilters]);

  const getDaySubscriptions = useCallback(
    (day: number) => {
      const isFoundInGroupedData = Object.keys(filteredSubscriptions).some(
        (data) => Number(data) === day
      );
      if (!isFoundInGroupedData) return;
      const subscriptions = filteredSubscriptions[day];
      setSelectedSubscriptionsByDay({ [day]: subscriptions });
      setSelectedDay(
        updateCurrentDateToSelectedDate(normalizedDate(currentDate), day)
      );
    },
    [filteredSubscriptions, currentDate]
  );

  const closeSubscriptionModals = (type: SubscriptionModalType) => {
    switch (type) {
      case SubscriptionModalTypes.DETAILS:
        setSelectedSubscriptionDetails(null);
        break;
      case SubscriptionModalTypes.LIST:
        setSelectedSubscriptionsByDay({});
        setSelectDay(null);
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
    if (!isEmpty(filteredSubscriptions)) {
      const flattenedArray = Object.values(filteredSubscriptions).flat();
      const total = flattenedArray.reduce((total, subscription) => {
        return total + subscription.price;
      }, 0);

      return Number(total.toFixed(2));
    }

    return 0;
  }, [filteredSubscriptions]);

  const getRemainingAmount = useMemo(() => {
    if (!isEmpty(filteredSubscriptions)) {
      const allSubscriptions = Object.values(filteredSubscriptions).flat();
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
  }, [filteredSubscriptions]);

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
    if (!isEmpty(filteredSubscriptions)) {
      const allSubscriptions = Object.values(filteredSubscriptions).flat();
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
  }, [filteredSubscriptions]);

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
      <div className="flex flex-col w-11/12 h-11/12 mx-auto">
        <AccountSyncBanner onSync={() => handleShowModal()} />
        <motion.div
          className="  border-border"
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
              <div className="flex justify-between items-center">
                <motion.div
                  className="w-full h-auto  flex justify-between items-center"
                  variants={itemVariants}
                >
                  <div>
                    <span className="text-foreground text-xl md:text-2xl">
                      {t(`calendar.months.${MONTH_KEYS[monthIndex]}`)},{' '}
                      {date.getFullYear()}
                    </span>
                  </div>
                </motion.div>
                <div className="flex items-center gap-1">
                  <motion.button
                    onClick={() => setOpenFilter(true)}
                    whileHover={{
                      y: -1,
                      backgroundColor: 'rgba(255,255,255,0.12)',
                    }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                    className="
    w-full flex items-center justify-between
    rounded-full px-5 py-3
    bg-surface backdrop-blur-2xl
    shadow-[0_8px_30px_rgba(0,0,0,0.35)]
    text-sm text-surface-foreground gap-4
  "
                  >
                    <div className="flex items-center gap-1">
                      <CiFilter size={16} className="text-surface-foreground" />
                      <span className="font-medium tracking-tight">
                        {t('subscriptions.filter.title')}
                      </span>
                    </div>

                    {activeFilters ? (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveFilters(null);
                        }}
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        whileHover={{
                          backgroundColor: 'rgba(255,255,255,0.12)',
                        }}
                        className="
        flex items-center gap-1
        text-xs text-surface-foreground/80
        px-2 py-1 rounded-full
      "
                      >
                        {t('common.clear')}
                        <span className="text-surface-foreground/50">×</span>
                      </motion.button>
                    ) : (
                      <span className="text-xs text-surface-foreground/40">
                        {t('common.off')}
                      </span>
                    )}
                  </motion.button>
                </div>
              </div>

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
                        ? 'border border-border'
                        : 'bg-surface'
                    } cursor-pointer h-auto flex justify-center items-center`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-foreground text-sm">{day}</span>
                  </motion.button>
                ))}
              </motion.div>

              {/* day of the month */}
              <motion.div variants={itemVariants}>
                {isLoading && (
                  <>
                    <CalendarSkeleton />
                  </>
                )}
                {!isLoading && !error && (
                  <Calendar
                    date={currentDate}
                    getDaySubscriptions={getDaySubscriptions}
                    groupedMonthlySubscriptions={filteredSubscriptions}
                  />
                )}
              </motion.div>
              {isLoading ? (
                <div className="w-full mt-4 bg-surface-foreground animate-pulse h-14 rounded-xl" />
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
                  <button className="text-md bg-surface rounded-xl w-full py-4 text-surface-foreground cursor-pointer">
                    {t('common.select_date')}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
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
        initialFilters={activeFilters || undefined}
      />
      <UserConsentDialog
        isOpen={showUserConsent}
        isPending={isAcceptUserConsentPending}
        onAccept={handleConsentAccepted}
        onDecline={handleConsentDeclined}
      />
    </div>
  );
};

export default Subscriptions;
