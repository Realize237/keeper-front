import {
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaComments,
  FaCreditCard,
  FaEdit,
  FaFileAlt,
  FaLock,
  FaQuestionCircle,
  FaShieldAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { type IconType } from 'react-icons';
import { useUser } from '../../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineUser } from 'react-icons/hi2';
import { Avatar } from '../../components/ui/Avatar';
import { useTranslation } from 'react-i18next';
import { useLogoutModal } from '../../hooks/useLogoutModal';

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
    path: '/profile/account-details',
  },
  {
    icon: FaCreditCard,
    label: 'profile.menu.payment.title',
    subtitle: 'profile.menu.payment.subtitle',
    path: '/cards',
  },
  {
    icon: FaCog,
    label: 'profile.menu.settings.title',
    path: '/settings',
  },
  {
    icon: FaLock,
    label: 'profile.menu.password.title',
    subtitle: 'profile.menu.password.subtitle',
    path: '/profile/change-password',
  },
];

const secondaryItems: MenuItem[] = [
  {
    icon: FaComments,
    label: 'profile.menu.contact',
    path: '/contact',
  },
  {
    icon: FaFileAlt,
    label: 'profile.menu.terms',
    path: '/terms',
  },
  {
    icon: FaShieldAlt,
    label: 'profile.menu.privacy',
    path: '/privacy',
  },
  {
    icon: FaQuestionCircle,
    label: 'profile.menu.help',
    path: '/help',
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

  const handleItemClick = (item: MenuItem) => {
    if (item.action === 'logout') {
      requestLogout();
    } else if (item.path) {
      navigate(item.path);
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
      hover:bg-white/5
      transition
    "
    >
      <div className="flex items-center gap-3">
        <item.icon className="w-5 h-5 text-white/60" />
        <div className="text-left">
          <p className="text-sm font-medium"> {t(item.label)}</p>
          {item.subtitle && (
            <p className="text-xs text-white/40"> {t(item.subtitle)}</p>
          )}
        </div>
      </div>
      <FaChevronRight className="w-4 h-4 text-white/30" />
    </motion.button>
  );

  return (
    <div className="px-4 py-6 text-white">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          <FaChevronLeft className="w-5 h-5 text-white/80" />
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-6 capitalize">
          {t('profile.title')}
        </h3>
        <div className="flex items-center p-4 rounded-2xl bg-white/5 backdrop-blur-xl">
          <Avatar size="xl" name={user?.name || ''} src={user?.photo || ''} />

          <div className="flex-1 ml-4">
            <p className="text-base font-medium">{user?.name}</p>
            <p className="text-xs text-white/50">{user?.email}</p>
          </div>

          <button
            onClick={() => navigate('/profile/edit')}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <FaEdit className="w-4 h-4 text-white/70" />
          </button>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-2">
            {menuItems.map((item, i) => (
              <Row key={i} item={item} />
            ))}
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-2">
            {secondaryItems.map((item, i) => (
              <Row key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
