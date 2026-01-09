import { axiosClient } from '../lib/axiosClient';
import { processError } from '../utils';
import { API_PATHS } from './api-paths';
import type {
  NotificationRequest,
  Notification,
} from '../interfaces/notifications';
import type { ApiSuccessResponse } from '../interfaces/api';

export const getAllNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await axiosClient.get<ApiSuccessResponse<Notification[]>>(
      `${API_PATHS.NOTIFICATIONS.GET_ALL_NOTIFICATIONS}`
    );

    return response.data.data;
  } catch (error) {
    processError(error);
    // This line will never be reached because processError throws
    throw error;
  }
};

export const getAllUsersNotifications = async (
  userId: number
): Promise<Notification[]> => {
  try {
    const response = await axiosClient.get<ApiSuccessResponse<Notification[]>>(
      `${API_PATHS.NOTIFICATIONS.GET_ALL_USERS_NOTIFICATION}/${userId}`
    );
    return response.data.data;
  } catch (error) {
    processError(error);
    // This line will never be reached because processError throws
    throw error;
  }
};

export const updateNotification = async (
  notificationRequest: NotificationRequest
): Promise<unknown> => {
  try {
    const response = await axiosClient.patch<ApiSuccessResponse>(
      `${API_PATHS.NOTIFICATIONS.UPDATE_NOTIFICATION_STATUS(notificationRequest.ids, notificationRequest.all)}`,
      {}
    );

    return response.data.data;
  } catch (err) {
    processError(err);
    throw err;
  }
};

export const deleteNotification = async (
  notificationRequest: NotificationRequest
): Promise<unknown> => {
  try {
    const response = await axiosClient.delete<ApiSuccessResponse>(
      `${API_PATHS.NOTIFICATIONS.DELETE_NOTIFICATION(notificationRequest.ids, notificationRequest.all)}`
    );

    return response.data.data;
  } catch (err) {
    processError(err);
    throw err;
  }
};
