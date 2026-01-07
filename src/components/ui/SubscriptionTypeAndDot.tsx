import { motion } from 'framer-motion';
import {
  SUBSCRIPTION_TYPES,
  SUBSCRIPTION_TYPES_CONFIG,
} from '../../interfaces/subscription';
import { useTranslation } from 'react-i18next';

export default function SubscriptionTypeAndDot({ value }: { value: string }) {
  const { t } = useTranslation();
  return (
    <motion.div
      className="w-auto h-auto flex justify-center items-center ml-2"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`w-2 h-2 rounded-full ${SUBSCRIPTION_TYPES_CONFIG[value.toUpperCase() as keyof typeof SUBSCRIPTION_TYPES].color} mr-1`}
      ></div>
      <span className="text-white text-md">
        {t(`subscriptions.type.${value}`)}
      </span>
    </motion.div>
  );
}
