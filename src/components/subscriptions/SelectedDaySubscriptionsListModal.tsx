import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  SubscriptionModalTypes,
  type Subscription,
  type SubscriptionModalType,
} from '../../interfaces/subscription';
import { formatToReadableDate } from '../../utils';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/Modal';

interface SelectedDaySubscriptionsListModalProps {
  selectedSubsciptionsByDay: Subscription[];
  closeSubscriptionModals: (type: SubscriptionModalType) => void;
  setSelectSubscriptionDetails: (subscription: Subscription) => void;
  selectedDay: Date | null;
}

export default function SelectedDaySubscriptionsListModal({
  selectedSubsciptionsByDay,
  closeSubscriptionModals,
  setSelectSubscriptionDetails,
  selectedDay,
}: SelectedDaySubscriptionsListModalProps) {
  const { t, i18n } = useTranslation();

  const getTotal = (subscriptions: Subscription[]) =>
    subscriptions.reduce((total, curr) => total + curr.price, 0);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.08,
        duration: 0.35,
        type: 'spring',
        stiffness: 180,
        damping: 22,
      },
    }),
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  };

  const subscriptionItemVariants: Variants = {
    hidden: { opacity: 0, x: -12 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.15 + custom * 0.06,
        duration: 0.35,
        type: 'spring',
        stiffness: 180,
        damping: 22,
      },
    }),
    exit: { opacity: 0, x: 12, transition: { duration: 0.2 } },
  };

  return (
    <Modal
      isOpen={Boolean(selectedDay)}
      onClose={() => closeSubscriptionModals(SubscriptionModalTypes.LIST)}
      width="max-w-2xl"
      height="min-h-[90dvh]"
    >
      <AnimatePresence>
        <motion.div
          className="flex flex-col items-center px-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="w-full flex flex-col  items-center justify-center min-h-[70dvh] sm:min-h-0">
            {selectedDay && (
              <motion.div
                variants={itemVariants}
                custom={1}
                className="text-foreground text-sm mb-6"
              >
                {formatToReadableDate(selectedDay, i18n.language)}
              </motion.div>
            )}

            <motion.div
              variants={itemVariants}
              custom={2}
              className="
              flex items-center gap-2
              px-5 py-2.5 mb-8
              rounded-full
              bg-surface
              backdrop-blur
              border border-border
              text-sm
            "
            >
              <span className="text-foreground uppercase tracking-wide">
                {t('subscriptions.selected_day.total')}
              </span>
              <span className="text-foreground font-semibold">
                ${getTotal(selectedSubsciptionsByDay)}
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              custom={3}
              className="
      w-full
      max-w-md
      bg-surface
      backdrop-blur-xl
      border border-border
      rounded-3xl
      py-6
      flex flex-col items-center
    "
            >
              {selectedSubsciptionsByDay?.length &&
                selectedSubsciptionsByDay.map((subscription, index) => (
                  <motion.div
                    key={subscription.id ?? index}
                    variants={subscriptionItemVariants}
                    custom={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      setSelectSubscriptionDetails(subscription);
                      closeSubscriptionModals(SubscriptionModalTypes.LIST);
                    }}
                    className="
                  w-[90%]
                  h-14
                  px-5
                  my-1.5
                  rounded-2xl
                  bg-surface
                  border border-border
                  flex items-center justify-between
                  cursor-pointer
                  transition-transform
                "
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={subscription.details.iconUrl}
                        className="w-8 h-8 rounded-md shrink-0"
                        alt=""
                      />

                      <p className="text-surface-foreground text-base font-medium truncate">
                        {subscription.details.name}
                      </p>
                    </div>

                    <span className="text-surface-foreground text-sm font-medium pl-4">
                      ${subscription.price}
                    </span>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
}
