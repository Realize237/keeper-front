import { env } from '../utils/env';
import { THEME_ICONS } from '../assets';
import { PATHS } from '../routes/paths';

export type NavItem = {
  labelKey: string;
  themeIcon: keyof typeof THEME_ICONS;
  path: string;
  visible: boolean;
};

const activeNavItems = env.ACTIVE_MENU_ITEMS.split(',').map((i) =>
  i.trim().toLocaleLowerCase()
);

export const NavItems: NavItem[] = [
  {
    labelKey: 'sidebar.subscriptions',
    themeIcon: 'subscriptions' as const,
    path: '/subscriptions',
    visible: false,
  },
  {
    labelKey: 'sidebar.sharedPlan',
    themeIcon: 'subscriptions' as const,
    path: '/shared-plan',
    visible: false,
  },
  {
    labelKey: 'sidebar.cards',
    themeIcon: 'subscriptions' as const,
    path: '/cards',
    visible: false,
  },
  {
    labelKey: 'sidebar.profile',
    themeIcon: 'profile' as const,
    path: '/profile',
    visible: false,
  },
].map((item) => ({
  ...item,
  visible: activeNavItems.includes(item.path.replace(PATHS.HOME, '')),
}));
