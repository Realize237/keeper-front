export const API_PATHS = {
  USERS: {
    GET_ALL_USERS: '/users/all',
    CREATE_USER: '/users',
    LOGIN: '/users/login',
    GET_USER_INFO: '/users/me',
    LOGOUT: '/users/logout',
    UPDATE_USER: (id: number) => `/users/${id}`,
    CHANGE_PASSWORD: `/users/change-password`,
    SEND_SET_PASSWORD_EMAIL: `/users/send-set-password-email`,
    SET_PASSWORD: `/users/set-password`,
  },
  SUBSCRIPTIONS: {
    GET_ALL_SUBSCRIPTIONS: '/subscriptions',
    GET_USER_SUBSCRIPTIONS: (userId: number) => `/subscriptions/user/${userId}`,
    GET_SUBSCRIPTION_DETAILS: (subscriptionId: number) =>
      `/subscriptions/${subscriptionId}`,
    ADD_SUBSCRIPTION: '/subscriptions',
    ADD_TO_GOOGLE_CALENDAR: (subscriptionId: number) =>
      `/subscriptions/${subscriptionId}/add-to-calendar`,
    REMOVE_FROM_GOOGLE_CALENDAR: (subscriptionId: number) =>
      `/subscriptions/${subscriptionId}/remove-from-calendar`,
  },
  NOTIFICATIONS: {
    GET_ALL_NOTIFICATIONS: '/notifications',
    GET_ALL_USERS_NOTIFICATION: '/notifications/user',
    UPDATE_NOTIFICATION_STATUS: (ids: number[], all = false) =>
      `/notifications/toggle-read?ids=${ids}&all=${all}`,
    DELETE_NOTIFICATION: (ids: number[], all = false) =>
      `/notifications?ids=${ids}&all=${all}`,
  },
  REMINDERS: {
    GET_ALL_REMINDERS: '/reminders',
    ADD_REMINDER: '/reminders',
    UPDATE_REMINDER: (id: number) => `/reminders/${id}`,
    UPDATE_SUBSCRIPTION_REMINDER: (id: number) =>
      `/reminders/subscription/${id}`,
    DELETE_REMINDER: (id: number) => `/reminders/${id}`,
    DELETE_SUBSCRIPTION_REMINDERS: (id: number) =>
      `/reminders/subscription/${id}`,
  },
  GOOGLE: {
    CALENDAR_AUTH: '/auth/google/calendar',
    CALENDAR_STATUS: '/auth/google/calendar/status',
    CALENDAR_DISCONNECT: '/auth/google/calendar/disconnect',
  },
};
