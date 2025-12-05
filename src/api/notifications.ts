import axios from "axios";
import { processError } from "../utils";
import { env } from "../utils/env";
import { API_PATHS } from "./api-paths";
import type { Notification } from "../interfaces/notifications";

export const getAllNotifications = async () => {
  try {
    const response = await axios.get(
      `${env.API_URL}${API_PATHS.NOTIFICATIONS.BASE}`,
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
      `${env.API_URL}${API_PATHS.NOTIFICATIONS.GET_MY}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    processError(error);
  }
};

export const toggleSingleNotificationReadStatus = async (id: number) => {
  try {
    const response = await axios.patch<{ message: string, statusCode: number }>(
      `${env.API_URL}${API_PATHS.NOTIFICATIONS.UPDATE_SINGLE}/${id}/toggle-read`,
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    return processError(err);
  }
};

export const toggleMultipleNotificationReadStatus = async (notifications: Notification[]) => {
  try {
    const response = await axios.patch<{ message: string, statusCode: number }>(
      `${env.API_URL}${API_PATHS.NOTIFICATIONS.UPDATE_MULTIPLE}`,
      {
        ids: notifications.map((not) => not.id),
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    return processError(err);
  }
};

export const deleteSingleNotification = async (id: number) => {
  try {
    const response = await axios.delete<{ message: string, statusCode: number }>(
      `${env.API_URL}${API_PATHS.NOTIFICATIONS.SINGLE}/${id}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    return processError(err);
  }
};

export const deleteMultipleNotifications = async (ids: number[]) => {
  try {
    const response = await axios.delete<{ message: string, statusCode: number }>(
      `${env.API_URL}${API_PATHS.NOTIFICATIONS.DELETE_MULTIPLE}?ids=${ids}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    return processError(err);
  }
};

export const deleteAllUserNotifications = async () => {
  try {
    const response = await axios.delete<{ message: string, statusCode: number }>(
      `${env.API_URL}${API_PATHS.NOTIFICATIONS.DELETE_ALL}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    return processError(err);
  }
};
