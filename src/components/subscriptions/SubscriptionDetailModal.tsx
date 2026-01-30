import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  formatToReadableDate,
  getNextBillingDate,
  getSubscriptionCardImage,
} from '../../utils';
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
import Modal from '../ui/Modal';
import { billingStatusTextClass } from '../../constants/subscription.constants';

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
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        closeSubscriptionModals(SubscriptionModalTypes.DETAILS);
      }}
      width="max-w-md"
    >
      {isLoading ? (
        <SubscriptionDetailSkeleton
          onClose={() => {
            setIsOpen(false);
            closeSubscriptionModals(SubscriptionModalTypes.DETAILS);
          }}
        />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16">
          <ErrorState
            message={t('subscription_details.errors.load_failed')}
            onRetry={refetch}
          />
        </div>
      ) : (
        <>
          {isFetching && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex justify-center mb-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5">
                <Spinner />
                <span className="text-sm text-gray-300">
                  {t('subscription_details.updating')}
                </span>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-4"
          >
            <img
              src={subscriptionDetails?.details?.iconUrl}
              className="w-20 h-20 rounded-2xl object-cover"
            />
          </motion.div>

          <div className="flex flex-col items-center text-center mb-8">
            <p
              className="text-white text-xl font-semibold truncate max-w-65"
              title={subscriptionDetails?.details?.name}
            >
              {subscriptionDetails?.details?.name}
            </p>

            <span className="mt-1 text-3xl font-semibold text-green-400">
              ${subscriptionDetails?.price}
            </span>
          </div>

          <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
            {t('subscription_details.billing')}
          </p>

          <div className="divide-y divide-white/10 mb-6">
            <Row
              label={t('subscription_details.next_bill')}
              value={getFormattedNextBillingDate()}
              valueClassName={`font-medium ${
                nextBillingResult
                  ? billingStatusTextClass[nextBillingResult.status]
                  : 'text-gray-400'
              }`}
            />

            {nextBillingResult?.daysRemaining && (
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">
                  {t('subscription_details.remaining')}
                </span>
                <span className="px-2 py-0.5 text-sm rounded-full bg-red-500/15 text-red-400">
                  {daysRemainingText}
                </span>
              </div>
            )}

            <Row
              label={t('subscription_details.period')}
              value={
                <SubscriptionTypeAndDot
                  value={subscriptionDetails?.type || 'MONTHLY'}
                />
              }
            />

            <Row
              label={t('subscription_details.plan')}
              value={t(`billing.plan.${subscriptionDetails?.plan}`)}
            />
          </div>

          <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
            {t('subscription_details.payment_method')}
          </p>

          <div className="flex justify-between items-center py-4 mb-6">
            <span className="text-gray-400">
              {t('subscription_details.payment_method')}
            </span>

            <div className="flex items-center gap-2">
              <img
                src={getSubscriptionCardImage(subscriptionDetails)}
                className="w-8 h-5 rounded"
              />
              <span className="text-white font-medium">•••• 5064</span>
            </div>
          </div>

          <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
            {t('subscription_details.actions')}
          </p>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">
                {t('subscription_details.remind_me')}
              </span>
              <NotificationReminder
                subscription={selectedSubscriptionDetails}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">
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
                    className={`px-3 py-1.5 text-sm rounded-lg bg-primary text-white transition ${
                      isAddingPending ||
                      isConnecting ||
                      nextBillingResult?.status === 'EXPIRED'
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-primary/90'
                    }`}
                  >
                    {isAddingPending || isConnecting ? (
                      <Spinner />
                    ) : (
                      <>
                        <FaCalendarPlus className="inline mr-1" />
                        {t('common.add')}
                      </>
                    )}
                  </button>
                ) : (
                  <>
                    <a
                      href={subscriptionDetails.calendarLink}
                      target="_blank"
                      className="px-3 py-1.5 text-sm rounded-lg bg-white/10 text-white hover:bg-white/15"
                    >
                      <FaEye />
                    </a>

                    <button
                      onClick={onRemoveFromGoogleCalendar}
                      disabled={isRemoving}
                      className={`px-3 py-1.5 text-sm rounded-lg bg-red-500/15 text-red-400 transition ${
                        isRemoving
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-red-500/25'
                      }`}
                    >
                      {isRemoving ? <Spinner /> : <FaTrash />}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}

const Row = ({
  label,
  value,
  valueClassName = 'text-white font-medium',
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}) => (
  <div className="flex justify-between items-center py-3">
    <span className="text-gray-400">{label}</span>
    <span className={valueClassName}>{value}</span>
  </div>
);
