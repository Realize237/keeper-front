import { axiosClient } from '../lib/axiosClient';
import { processError } from '../utils';
import { API_PATHS } from './api-paths';
import type { NotificationRequest } from '../interfaces/notifications';

export const getAllNotifications = async () => {
  try {
    const response = await axiosClient.get(
      `${API_PATHS.NOTIFICATIONS.GET_ALL_NOTIFICATIONS}`
    );

    return response.data.data;
  } catch (error) {
    processError(error);
  }
};

export const getAllUsersNotifications = async (userId: number) => {
  try {
    const response = await axiosClient.get(
      `${API_PATHS.NOTIFICATIONS.GET_ALL_USERS_NOTIFICATION}/${userId}`
    );
    return response.data.data;
  } catch (error) {
    processError(error);
  }
};

export const updateNotification = async (
  notificationRequest: NotificationRequest
) => {
  try {
    const response = await axiosClient.patch<{
      message: string;
      statusCode: number;
    }>(
      `${API_PATHS.NOTIFICATIONS.UPDATE_NOTIFICATION_STATUS(notificationRequest.ids, notificationRequest.all)}`,
      {}
    );

    return response.data.data;
  } catch (err) {
    return processError(err);
  }
};

export const deleteNotification = async (
  notificationRequest: NotificationRequest
) => {
  try {
    const response = await axiosClient.delete<{
      message: string;
      statusCode: number;
    }>(
      `${API_PATHS.NOTIFICATIONS.DELETE_NOTIFICATION(notificationRequest.ids, notificationRequest.all)}`
    );

    return response.data.data;
  } catch (err) {
    return processError(err);
  }
};
