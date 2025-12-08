export const API_PATHS = {
  USERS: {
    GET_ALL_USERS: "/users/all",
    CREATE_USER: "/users",
    LOGIN: "/users/login",
    GET_USER_INFO: "/users/me",
  },
  SUBSCRIPTIONS: {
    GET_ALL_SUBSCRIPTIONS: "/subscriptions",
    ADD_SUBSCRIPTION: "/subscriptions",
  },
  NOTIFICATIONS: {
    GET_ALL_NOTIFICATIONS: "/notifications",
    GET_ALL_USERS_NOTIFICATION: "/notifications/user",
    UPDATE_NOTIFICATION_STATUS: (ids: number[], all = false) =>
      `/notifications/toggle-read?ids=${ids}&all=${all}`,
    DELETE_NOTIFICATION: (ids: number[], all = false) =>
      `/notifications?ids=${ids}&all=${all}`,
  },
};
