import { motion } from 'framer-motion';
import {
  SUBSCRIPTION_TYPES,
  SUBSCRIPTION_TYPES_CONFIG,
  type Subscription,
} from '../../interfaces/subscription';

interface SubscriptionCardProps {
  subscriptions: Subscription[];
}

export default function SubscriptionCard({
  subscriptions,
}: SubscriptionCardProps) {
  const hasMoreThanOneSubscription = subscriptions.length > 1;
  const dotColor =
    subscriptions[0].type === SUBSCRIPTION_TYPES.MONTHLY.toUpperCase()
      ? SUBSCRIPTION_TYPES_CONFIG.MONTHLY.color
      : SUBSCRIPTION_TYPES_CONFIG.YEARLY.color;

  return (
    <motion.div
      className="w-[90%] h-[95%] flex flex-col justify-between items-center rounded-md my-1"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div
        className={`w-1.5 h-1.5 rounded-full ${dotColor} flex self-end`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="w-full h-3/4 flex justify-center items-center">
        <img
          src={subscriptions[0].details.iconUrl}
          alt="Spotify"
          className={`${hasMoreThanOneSubscription ? 'w-5 h-5 ' : 'w-6 h-6 '} rounded-full object-cover`}
        />
        {hasMoreThanOneSubscription && (
          <div className="w-6 h-6 rounded-full relative right-1 top-0.5 z-10 flex justify-center items-center bg-[#121212]">
            <span className="text-white text-[9px]">
              +{subscriptions.length - 1}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
