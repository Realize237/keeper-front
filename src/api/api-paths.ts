export const API_PATHS = {
  USERS: {
    GET_ALL_USERS: '/api/users/all',
    CREATE_USER: '/api/users',
    LOGIN: '/api/users/login',
    GET_USER_INFO: '/api/users/me',
    LOGOUT: '/api/users/logout',
    UPDATE_USER: (id: number) => `/api/users/${id}`,
    CHANGE_PASSWORD: `/api/users/change-password`,
    SEND_SET_PASSWORD_EMAIL: (email: string) =>
      `/api/users/send-set-password-email/${email}`,
    SET_PASSWORD: `/api/users/set-password`,
    REQUEST_PASSWORD_RESET: '/api/users/reset-password/request',
    VALIDATE_FORGOT_PASSWORD_OTP: '/api/users/reset-password/token/validate',
    RESET_PASSWORD: (email: string) => `/api/users/password/reset/${email}`,
  },
  SUBSCRIPTIONS: {
    GET_ALL_SUBSCRIPTIONS: '/api/subscriptions',
    GET_USER_SUBSCRIPTIONS: (userId: number) =>
      `/api/subscriptions/user/${userId}`,
    GET_SUBSCRIPTION_DETAILS: (subscriptionId: number) =>
      `/api/subscriptions/${subscriptionId}`,
    ADD_SUBSCRIPTION: '/api/subscriptions',
    ADD_TO_GOOGLE_CALENDAR: (subscriptionId: number) =>
      `/api/subscriptions/${subscriptionId}/add-to-calendar`,
    REMOVE_FROM_GOOGLE_CALENDAR: (subscriptionId: number) =>
      `/api/subscriptions/${subscriptionId}/remove-from-calendar`,
  },
  NOTIFICATIONS: {
    GET_ALL_NOTIFICATIONS: '/api/notifications',
    GET_ALL_USERS_NOTIFICATION: '/api/notifications/user',
    UPDATE_NOTIFICATION_STATUS: (ids: number[], all = false) =>
      `/api/notifications/toggle-read?ids=${ids}&all=${all}`,
    DELETE_NOTIFICATION: (ids: number[], all = false) =>
      `/api/notifications?ids=${ids}&all=${all}`,
  },
  REMINDERS: {
    GET_ALL_REMINDERS: '/api/reminders',
    ADD_REMINDER: '/api/reminders',
    UPDATE_REMINDER: (id: number) => `/api/reminders/${id}`,
    UPDATE_SUBSCRIPTION_REMINDER: (id: number) =>
      `/api/reminders/subscription/${id}`,
    DELETE_REMINDER: (id: number) => `/api/reminders/${id}`,
    DELETE_SUBSCRIPTION_REMINDERS: (id: number) =>
      `/api/reminders/subscription/${id}`,
  },
  GOOGLE: {
    CALENDAR_AUTH: '/api/auth/google/calendar',
    CALENDAR_STATUS: '/api/auth/google/calendar/status',
    CALENDAR_DISCONNECT: '/api/auth/google/calendar/disconnect',
  },
  PLAID: {
    INFO: '/api/plaid/info',
    CREATE_LINK_TOKEN: '/api/plaid/create-link-token',
    EXCHANGE_PUBLIC_TOKEN: '/api/plaid/exchange-public-token',
    SYNC_CARD_SUBSCRIPTIONS: '/api/plaid/sync-card-subscriptions',
    GET_ACCOUNTS: '/api/plaid/accounts',
    GET_IDENTITY: '/api/plaid/identity',
    GET_BALANCES: '/api/plaid/balances',
    GET_TRANSACTIONS: '/api/plaid/transactions',
    GET_RECURRING_TRANSACTIONS: '/api/plaid/transactions/recurring',
    REFRESH_TRANSACTIONS: '/api/plaid/transactions/refresh',
  },
  PUSH_TOKEN: {
    REGISTER_TOKEN: '/api/push-tokens/save',
  },
};
