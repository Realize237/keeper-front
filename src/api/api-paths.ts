export const API_PATHS = {
    USERS: {
        GET_ALL_USERS: '/users/all',
        CREATE_USER: '/users',
        LOGIN: '/users/login',
        GET_USER_INFO: '/users/me'
    },
    SUBSCRIPTIONS:{
        GET_ALL_SUBSCRIPTIONS: '/subscriptions',
        ADD_SUBSCRIPTION: '/subscriptions',
    },
    NOTIFICATIONS: {
        BASE: '/notifications',
        SINGLE: '/notifications/single',
        GET_MY: "/notifications/user/all",
        UPDATE_SINGLE: "/notifications",
        UPDATE_MULTIPLE: "/notifications",
        DELETE_MULTIPLE: "/notifications/multiple",
        DELETE_ALL: "/notifications/user/all"
    }
}