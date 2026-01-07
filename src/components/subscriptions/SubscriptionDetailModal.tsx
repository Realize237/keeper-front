import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  formatToReadableDate,
  getNextBillingDate,
  getSubscriptionCardImage,
  pluralize,
} from '../../utils';
import { MdOutlineClear } from 'react-icons/md';
import SubscriptionTypeAndDot from '../ui/SubscriptionTypeAndDot';
import {
  SubscriptionModalTypes,
  type Subscription,
  type SubscriptionModalType,
} from '../../interfaces/subscription';
import type { BillingResult } from '../../interfaces/billings';
import NotificationReminder from '../notifications/Reminder';
import { FaCalendarPlus, FaEye, FaTrash } from 'react-icons/fa';
import {
  useAddSubscriptionToGoogleCalendar,
  useRemoveSubscriptionFromGoogleCalendar,
  useSubscriptionsDetails,
} from '../../hooks/useSubscriptions';
import {
  useGoogleCalendarAccess,
  useConnectGoogleCalendar,
} from '../../hooks/useGoogleCalendar';
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';
import SubscriptionDetailSkeleton from './SubscriptionDetailSkeleton';
import ErrorState from '../common/ErrorState';
import { useTranslation } from 'react-i18next';

interface SubscriptionDetailModalProps {
  selectedSubscriptionDetails: Subscription;
  closeSubscriptionModals: (type: SubscriptionModalType) => void;
}

export default function SubscriptionDetailModal({
  selectedSubscriptionDetails,
  closeSubscriptionModals,
}: SubscriptionDetailModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { t, i18n } = useTranslation();

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

  const { mutate: addToGoogleCalendar, isPending: isAddingPending } =
    useAddSubscriptionToGoogleCalendar();
  const { mutate: removeFromGoogleCalendar, isPending: isRemoving } =
    useRemoveSubscriptionFromGoogleCalendar();

  const getFormattedNextBillingDate = () => {
    if (!nextBillingResult) return t('common.loading');

    switch (nextBillingResult.status) {
      case 'ACTIVE':
        return formatToReadableDate(
          new Date(nextBillingResult.date as Date),
          i18n.language
        );
      case 'DUE_TODAY':
        return t('billing.status.due_today');
      case 'EXPIRED':
        return t('billing.status.expired');
      default:
        return t('billing.status.unknown');
    }
  };

  const title = `${
    subscriptionDetails?.details.name
  } — $${subscriptionDetails?.price.toFixed(2)}`;

  const next = nextBillingResult
    ? nextBillingResult.status === 'EXPIRED'
      ? 'expired'
      : nextBillingResult.status === 'ACTIVE'
        ? formatToReadableDate(nextBillingResult.date!, i18n.language)
        : nextBillingResult.status.toLowerCase()
    : t('subscription_details.loading');

  const billingInfo =
    nextBillingResult?.status === 'EXPIRED'
      ? t('subscription_details.expired_on', {
          date: formatToReadableDate(
            subscriptionDetails?.details.endDate || new Date(),
            i18n.language
          ),
        })
      : t('subscription_details.billed_next_on', { date: next });

  const description = t('subscription_details.description', {
    name: subscriptionDetails?.details.name,
    price: subscriptionDetails?.price.toFixed(2),
    planType: t(`subscriptions.type.${subscriptionDetails?.type}`),
    billingInfo,
    card: subscriptionDetails?.card,
    last4: '5064',
    startDate: formatToReadableDate(
      subscriptionDetails?.details?.startDate || new Date(),
      i18n.language
    ),
    endDate: formatToReadableDate(
      subscriptionDetails?.details?.endDate || new Date(),
      i18n.language
    ),
  });

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
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
          toast.success(t('subscription_details.calendar.added')),
        onError: (error: Error) =>
          toast.error(
            error?.message || t('subscription_details.calendar.add_failed')
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
          toast.success(t('subscription_details.calendar.connected'));
          addSubscriptionToCalendar();
        },
        onError: (error: Error) => {
          toast.error(
            error?.message || t('subscription_details.calendar.connect_failed')
          );
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
          toast.success(t('subscription_details.calendar.removed')),
        onError: (error: Error) =>
          toast.error(
            error.message || t('subscription_details.calendar.remove_failed')
          ),
      }
    );
  };

  const daysRemainingText = nextBillingResult?.daysRemaining
    ? t('billing.dueInDays', {
        count: nextBillingResult.daysRemaining,
      })
    : '';

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
                    message={t('subscription_details.errors.load_failed')}
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
                      <span className="text-white text-sm">
                        {t('subscription_details.updating')}
                      </span>
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
                    {t('subscription_details.next_bill')}:{' '}
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
                  whileHover={{ backgroundColor: '#3d3d3d' }}
                >
                  <span className="text-[#838383] font-bold">
                    {t('subscription_details.payment_method')}{' '}
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
                    whileHover={{ backgroundColor: '#3d3d3d' }}
                  >
                    <span className="text-[#838383] font-bold">
                      {t('subscription_details.remaining')}
                    </span>
                    <div className="p-1 px-2 ml-2 flex rounded-lg justify-center items-centers bg-[#cdbbbb]">
                      <span className="text-red-800 text-lg]">
                        {daysRemainingText}
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
                  whileHover={{ backgroundColor: '#3d3d3d' }}
                >
                  <span className="text-[#838383] font-bold">
                    {t('subscription_details.period')}{' '}
                  </span>
                  <SubscriptionTypeAndDot
                    value={subscriptionDetails?.type || 'MONTHLY'}
                  />
                </motion.div>

                <motion.div
                  className="w-full h-auto p-4 my-1 flex rounded-lg text-lg bg-[#333232] justify-between items-center"
                  variants={itemVariants}
                  custom={7}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ backgroundColor: '#3d3d3d' }}
                >
                  <span className="text-[#838383] font-bold">
                    {t('subscription_details.plan')}{' '}
                  </span>
                  <span className="text-white">
                    {t(`billing.plan.${subscriptionDetails?.plan}`)}
                  </span>
                </motion.div>

                <motion.div
                  className="w-full h-auto p-4 my-1 flex rounded-lg text-lg bg-[#333232] justify-between items-start items-center"
                  variants={itemVariants}
                  custom={8}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ backgroundColor: '#3d3d3d' }}
                >
                  <span className="text-[#838383] font-bold">
                    {t('subscription_details.remind_me')}{' '}
                  </span>
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
                  whileHover={{ backgroundColor: '#3d3d3d' }}
                >
                  <span className="text-[#838383] font-bold">
                    {t('subscription_details.sync_calendar')}
                  </span>
                  <div className="flex gap-2">
                    {!subscriptionDetails?.calendarLink ? (
                      <button
                        onClick={onAddToGoogleCalendar}
                        disabled={
                          isAddingPending ||
                          isConnecting ||
                          nextBillingResult?.status === 'EXPIRED'
                        }
                        className={`flex items-center gap-1 px-3 py-1 text-xs bg-[#CDFF00] rounded transition ${
                          isAddingPending ||
                          isConnecting ||
                          nextBillingResult?.status === 'EXPIRED'
                            ? 'cursor-not-allowed opacity-50'
                            : 'cursor-pointer'
                        }`}
                      >
                        {isAddingPending || isConnecting ? (
                          <Spinner />
                        ) : (
                          <>
                            <FaCalendarPlus /> {t('common.add')}
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
                              ? 'cursor-not-allowed opacity-50'
                              : 'cursor-pointer'
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
