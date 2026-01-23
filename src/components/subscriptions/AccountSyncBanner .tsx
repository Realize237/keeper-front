import { FaExclamation } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { useUser } from '../../hooks/useUsers';
import { useTranslation } from 'react-i18next';

type AccountSyncBannerProps = {
  onSync: () => void;
};

const AccountSyncBanner = ({ onSync }: AccountSyncBannerProps) => {
  const { user } = useUser();
  const { t } = useTranslation();

  const shouldShow = user?.userConsentAccepted;

  if (shouldShow) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex justify-center px-4 sm:px-6 lg:px-8 mt-4"
    >
      <div className="w-full max-w-4xl bg-[#1f1f1f] border border-[#FF6B5B] rounded-lg shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
        <div className="flex items-start sm:items-center gap-2 flex-1">
          <div className="w-6 h-6 rounded-full bg-[#FF6B5B] flex items-center justify-center text-white font-bold shrink-0">
            <FaExclamation />
          </div>
          <p className="text-sm text-white">{t('consent.sync_message')}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 0 rgba(255,107,91,0)',
              '0 0 12px rgba(255,107,91,0.6)',
              '0 0 0 rgba(255,107,91,0)',
            ],
          }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-full sm:w-auto bg-[#FF6B5B] hover:bg-[#FF4a40] text-white text-sm font-medium py-1.5 px-4 rounded"
          onClick={onSync}
        >
          {t('consent.connect_now')}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AccountSyncBanner;
