import { TiArrowSortedDown } from 'react-icons/ti';
import NotificationBell from '../../notifications/NotificationBell';
import { Avatar } from '../../ui/Avatar';
import LanguageSwitcher from '../../common/LanguageSwitcher';
import ThemeSwitcher from '../../common/ThemeSwitcher';
import { useMemo, useRef, useState } from 'react';
import { useUserNotifications } from '../../../hooks/useNotifications';
import { NotificationStatus } from '../../../interfaces/notifications';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GoUnlink } from 'react-icons/go';
import { GoListUnordered } from 'react-icons/go';
import { HiOutlineUser } from 'react-icons/hi2';
import { IoIosLogOut } from 'react-icons/io';
import { useCloseOnOutsideInteraction } from '../../../hooks/useCloseOnOutsideInteraction';
import { env } from '../../../utils/env';
import { useTranslation } from 'react-i18next';
import { useLogoutModal } from '../../../hooks/useLogoutModal';
import { useUser } from '../../../hooks/useUsers';
import { PATHS } from '../../../routes/paths';

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const usersNotifications = useUserNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { requestLogout } = useLogoutModal();
  const { t } = useTranslation();

  const unReadCount = useMemo(() => {
    if (!usersNotifications.data) return 0;
    return usersNotifications.data?.filter(
      (not) => not.status === NotificationStatus.UNREAD
    ).length;
  }, [usersNotifications]);

  useCloseOnOutsideInteraction(
    ref as React.RefObject<HTMLElement>,
    () => setOpen(false),
    open
  );
  return (
    <div className="flex justify-end  p-4 border-b border-b-border">
      <div className="flex items-center gap-6">
        <div>
          <LanguageSwitcher />
        </div>
        <ThemeSwitcher />
        <div onClick={() => navigate(PATHS.APP.NOTIFICATIONS)}>
          <NotificationBell count={unReadCount} />
        </div>
        <div className="relative" ref={ref}>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <Avatar name={user?.name} src={user?.photo || ''} />
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <TiArrowSortedDown className="inline-block ml-1 text-foreground" />
            </motion.span>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute right-0 mt-2 w-64 bg-surface text-surface-foreground shadow-lg rounded-xl border border-border z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-surface-foreground truncate">
                    {user?.name}
                  </p>
                  {user?.email && (
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  )}
                </div>

                <div className="py-2 text-sm">
                  <p className="px-4 text-xs text-surface-foreground uppercase tracking-wide mb-1">
                    {t('header.account')}
                  </p>
                  <div className="flex flex-col">
                    <button
                      onClick={() => {
                        navigate(PATHS.APP.PROFILE.ROOT);
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <HiOutlineUser className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium text-muted-foreground">
                        {t('header.profile')}
                      </span>
                    </button>

                    <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors">
                      <GoListUnordered className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium text-muted-foreground">
                        {t('header.all_settings')}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="py-2 border-t border-border text-sm">
                  <div className="flex flex-col">
                    <a
                      href={env.APP_WEBSITE_URL}
                      target="_blank"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <GoUnlink className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium text-muted-foreground">
                        {t('header.visit_website')}
                      </span>
                    </a>
                    <button
                      onClick={requestLogout}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-danger/20 transition-colors"
                    >
                      <IoIosLogOut className="w-5 h-5 text-danger" />
                      <span className="font-medium text-danger">
                        {t('header.logout')}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Header;
