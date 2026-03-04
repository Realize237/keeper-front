import ProfileActive from './profile_active.svg';
import ProfileDark from './profile_dark.svg';
import ProfileLight from './profile_light.svg';
import SubscriptionDark from './subscription_dark.svg';
import SubscriptionLight from './subscription_light.svg';
import SubscriptionsActive from './subscriptions_active.svg';

export const ICONS = {
  ProfileActive,
  ProfileDark,
  ProfileLight,
  SubscriptionDark,
  SubscriptionLight,
  SubscriptionsActive,
};

export const THEME_ICONS = {
  profile: {
    active: ProfileActive,
    default: {
      light: ProfileLight,
      dark: ProfileDark,
    },
  },
  subscriptions: {
    active: SubscriptionsActive,
    default: {
      light: SubscriptionLight,
      dark: SubscriptionDark,
    },
  },
} as const;
