import { FaExclamation } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { useUser } from '../../hooks/useUsers';
import { useTranslation } from 'react-i18next';

type AccountSyncBannerProps = {
  onSync: () => void;
  user: ReturnType<typeof useUser>['user'];
  isSyncing: boolean;
};

const AccountSyncBanner = ({
  onSync,
  user,
  isSyncing,
}: AccountSyncBannerProps) => {
  const { t } = useTranslation();
  const shouldShow = !user?.userConsentAccepted || isSyncing;

  if (!shouldShow) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex justify-center px-4 sm:px-6 lg:px-8 mt-4"
    >
      <div className="w-full max-w-4xl bg-surface border border-border rounded-lg shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
        <div className="flex items-start sm:items-center gap-3 flex-1">
          {isSyncing ? (
            <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin shrink-0" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center font-bold shrink-0">
              <FaExclamation className="text-primary-foreground" />
            </div>
          )}
          <p className="text-sm text-surface-foreground">
            {isSyncing
              ? t('consent.syncing_message')
              : t('consent.sync_message')}
          </p>
        </div>

        <motion.button
          whileHover={!isSyncing ? { scale: 1.05 } : {}}
          whileTap={!isSyncing ? { scale: 0.95 } : {}}
          animate={
            !isSyncing
              ? {
                  boxShadow: [
                    '0 0 0 rgba(255,107,91,0)',
                    '0 0 12px rgba(196,30,20,0.8)',
                    '0 0 0 rgba(255,107,91,0)',
                  ],
                }
              : {}
          }
          transition={{ duration: 1.6, repeat: Infinity }}
          className={`w-full sm:w-auto ${isSyncing ? 'bg-accent' : 'bg-primary'} text-primary-foreground text-sm font-medium py-1.5 px-4 rounded transition-opacity ${
            isSyncing ? 'opacity-50 cursor-not-allowed!' : 'hover:bg-primary/90'
          }`}
          onClick={onSync}
          disabled={isSyncing}
        >
          {isSyncing ? t('consent.syncing') : t('consent.connect_now')}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AccountSyncBanner;
