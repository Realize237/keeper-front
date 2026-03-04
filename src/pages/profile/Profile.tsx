import {
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaComments,
  FaEdit,
  FaFileAlt,
  FaLock,
  FaQuestionCircle,
  FaShieldAlt,
  FaSignOutAlt,
  FaStar,
} from 'react-icons/fa';
import { type IconType } from 'react-icons';
import { useUser } from '../../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineUser } from 'react-icons/hi2';
import { Avatar } from '../../components/ui/Avatar';
import { useTranslation } from 'react-i18next';
import { useLogoutModal } from '../../hooks/useLogoutModal';
import { PATHS } from '../../routes/paths';
import { ReviewDialog } from '../../components/dialog/ReviewDialog';
import { useState } from 'react';

interface MenuItem {
  icon: IconType;
  label: string;
  subtitle?: string;
  path?: string;
  action?: string;
}

const menuItems: MenuItem[] = [
  {
    icon: HiOutlineUser,
    label: 'profile.menu.account.title',
    subtitle: 'profile.menu.account.subtitle',
    path: PATHS.APP.PROFILE.ACCOUNT_DETAILS.full,
  },
  // {
  //   icon: FaCreditCard,
  //   label: 'profile.menu.payment.title',
  //   subtitle: 'profile.menu.payment.subtitle',
  //   path: PATHS.APP.CARDS,
  // },
  {
    icon: FaCog,
    label: 'profile.menu.settings.title',
    path: PATHS.APP.SETTINGS,
  },
  {
    icon: FaLock,
    label: 'profile.menu.password.title',
    subtitle: 'profile.menu.password.subtitle',
    path: PATHS.APP.PROFILE.CHANGE_PASSWORD.full,
  },
];

const secondaryItems: MenuItem[] = [
  {
    icon: FaComments,
    label: 'profile.menu.contact',
    path: PATHS.APP.CONTACT,
  },
  {
    icon: FaStar,
    label: 'profile.menu.review',
    action: 'review',
  },
  {
    icon: FaFileAlt,
    label: 'profile.menu.terms',
    path: PATHS.LEGAL.TERMS.full,
  },
  {
    icon: FaShieldAlt,
    label: 'profile.menu.privacy',
    path: PATHS.LEGAL.PRIVACY.full,
  },
  {
    icon: FaQuestionCircle,
    label: 'profile.menu.help',
    path: '/#faq',
  },
  {
    icon: FaSignOutAlt,
    label: 'profile.menu.logout',
    action: 'logout',
  },
];

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { requestLogout } = useLogoutModal();
  const { t } = useTranslation();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleItemClick = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path);
      return;
    }

    switch (item.action) {
      case 'logout':
        requestLogout();
        break;

      case 'review':
        setIsReviewModalOpen(true);
        break;

      default:
        break;
    }
  };

  const Row = ({ item }: { item: MenuItem }) => (
    <motion.button
      onClick={() => handleItemClick(item)}
      whileTap={{ scale: 0.98 }}
      className="
      w-full flex items-center justify-between
      px-4 py-3
      rounded-xl
      hover:muted
      transition
    "
    >
      <div className="flex items-center gap-3">
        <item.icon className="w-5 h-5 text-surface-foreground" />
        <div className="text-left">
          <p className="text-sm font-medium"> {t(item.label)}</p>
          {item.subtitle && (
            <p className="text-xs text-muted-foreground">{t(item.subtitle)}</p>
          )}
        </div>
      </div>
      <FaChevronRight className="w-4 h-4 text-surface-foreground" />
    </motion.button>
  );

  return (
    <div className="px-4 py-6 text-foreground">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-muted transition"
        >
          <FaChevronLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-6 capitalize">
          {t('profile.title')}
        </h3>
        <div className="flex items-center p-4 rounded-2xl bg-surface backdrop-blur-xl">
          <Avatar size="xl" name={user?.name || ''} src={user?.photo || ''} />

          <div className="flex-1 ml-4">
            <p className="text-base font-medium">{user?.name}</p>
            <p className="text-xs text-surface-foreground">{user?.email}</p>
          </div>
          <button
            onClick={() => navigate('/profile/edit')}
            className="p-2 rounded-full hover:bg-muted transition"
          >
            <FaEdit className="w-4 h-4 text-surface-foreground" />
          </button>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl bg-surface backdrop-blur-xl p-2">
            {menuItems.map((item, i) => (
              <Row key={i} item={item} />
            ))}
          </div>

          <div className="rounded-2xl bg-surface backdrop-blur-xl p-2">
            {secondaryItems.map((item, i) => (
              <Row key={i} item={item} />
            ))}
          </div>
        </div>
      </div>

      <ReviewDialog
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
