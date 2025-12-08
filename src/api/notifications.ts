import axios from "axios";
import { processError } from "../utils";
import { env } from "../utils/env";
import { API_PATHS } from "./api-paths";
import type { NotificationRequest } from "../interfaces/notifications";

export const getAllNotifications = async () => {
  try {
    const response = await axios.get(
      `${env.API_URL}${API_PATHS.NOTIFICATIONS.GET_ALL_NOTIFICATIONS}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    processError(error);
  }
};

export const getAllUsersNotifications = async () => {
  try {
    const response = await axios.get(
      `${env.API_URL}${API_PATHS.NOTIFICATIONS.GET_ALL_USERS_NOTIFICATION}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    processError(error);
  }
};

export const updateNotification = async (notificationRequest: NotificationRequest) => {
  try {
    const response = await axios.patch<{ message: string, statusCode: number }>(
      `${env.API_URL}${API_PATHS.NOTIFICATIONS.UPDATE_NOTIFICATION_STATUS(notificationRequest.ids, notificationRequest.all)}`,
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    return processError(err);
  }
};

export const deleteNotification = async (notificationRequest: NotificationRequest) => {
  try {
    const response = await axios.delete<{ message: string, statusCode: number }>(
      `${env.API_URL}${API_PATHS.NOTIFICATIONS.DELETE_NOTIFICATION(notificationRequest.ids, notificationRequest.all)}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    return processError(err);
  }
};
