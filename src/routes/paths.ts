export const PATHS = {
  HOME: '/',
  PRICING: '/pricing',
  SUPPORT: '/support',
  SUPPORTED_COUNTRIES: '/supported-countries',

  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    CHECK_EMAIL: '/check-your-email',
    VERIFY_EMAIL: '/verify-email',
    SET_PASSWORD: '/set-password',
  },

  LEGAL: {
    ROOT: '/legal',
    PRIVACY: {
      route: 'privacy-policy',
      full: '/legal/privacy-policy',
    },
    TERMS: {
      route: 'terms-of-service',
      full: '/legal/terms-of-service',
    },
    COOKIES: {
      route: 'cookies',
      full: '/legal/cookies',
    },
    GDPR: {
      route: 'gdpr',
      full: '/legal/gdpr',
    },
  },

  APP: {
    SUBSCRIPTIONS: '/subscriptions',
    CARDS: '/cards',
    SHARED_PLAN: '/shared-plan',
    PLAID: '/plaid',

    PROFILE: {
      ROOT: '/profile',
      EDIT: {
        route: 'edit',
        full: '/profile/edit',
      },
      CHANGE_PASSWORD: {
        route: 'change-password',
        full: '/profile/change-password',
      },
      ACCOUNT_DETAILS: {
        route: 'account-details',
        full: '/profile/change-password',
      },
    },
    SETTINGS: '/settings',
    CONTACT: '/contact',
    NOTIFICATIONS: '/notifications',
  },
} as const;
