import type { IconType } from 'react-icons';
import { FaCalendarAlt, FaCreditCard, FaUsers } from 'react-icons/fa';
import { env } from '../utils/env';
import { HiOutlineUser } from 'react-icons/hi2';

export type NavItem = {
  labelKey: string;
  icon: IconType;
  path: string;
  visible: boolean;
};

const activeNavItems = env.ACTIVE_MENU_ITEMS.split(',').map((i) =>
  i.trim().toLocaleLowerCase()
);

export const NavItems: NavItem[] = [
  {
    labelKey: 'sidebar.subscriptions',
    icon: FaCalendarAlt,
    path: '/subscriptions',
    visible: false,
  },
  {
    labelKey: 'sidebar.sharedPlan',
    icon: FaUsers,
    path: '/shared-plan',
    visible: false,
  },
  {
    labelKey: 'sidebar.cards',
    icon: FaCreditCard,
    path: '/cards',
    visible: false,
  },

  {
    labelKey: 'sidebar.profile',
    icon: HiOutlineUser,
    path: '/profile',
    visible: false,
  },
].map((item) => ({
  ...item,
  visible: activeNavItems.includes(item.path.replace('/', '')),
}));
