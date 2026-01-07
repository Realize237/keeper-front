import { axiosClient } from '../lib/axiosClient';
import { processError } from '../utils';
import { API_PATHS } from './api-paths';
import type {
  IReminderRequest,
  IReminderUpdate,
  ISubscriptionRemindersUpdate,
} from '../interfaces/notifications';

export const addReminders = async (newReminder: IReminderRequest[]) => {
  try {
    const response = await axiosClient.post(
      `${API_PATHS.REMINDERS.ADD_REMINDER}`,
      newReminder
    );
    return response.data;
  } catch (error) {
    processError(error);
  }
};

export const getAllReminders = async () => {
  try {
    const response = await axiosClient.get(
      `${API_PATHS.REMINDERS.GET_ALL_REMINDERS}`
    );
    return response.data;
  } catch (error) {
    processError(error);
  }
};

export const getAllUsersReminders = async (userId: number) => {
  try {
    const response = await axiosClient.get(
      `${API_PATHS.REMINDERS.GET_ALL_REMINDERS}?userId=${userId}`
    );
    return response.data.data;
  } catch (error) {
    processError(error);
  }
};

export const getAllSubscriptionReminders = async (subscriptionId: number) => {
  try {
    const response = await axiosClient.get(
      `${API_PATHS.REMINDERS.GET_ALL_REMINDERS}?subscriptionId=${subscriptionId}`
    );
    return response.data.data;
  } catch (error) {
    processError(error);
  }
};

export const updateReminder = async (reminderUpdate: IReminderUpdate) => {
  try {
    const response = await axiosClient.patch<{
      message: string;
      statusCode: number;
    }>(
      `${API_PATHS.REMINDERS.UPDATE_REMINDER(reminderUpdate.id)}`,
      reminderUpdate
    );

    return response.data;
  } catch (err) {
    return processError(err);
  }
};

export const deleteReminder = async (reminderId: number) => {
  try {
    const response = await axiosClient.delete<{
      message: string;
      statusCode: number;
    }>(`${API_PATHS.REMINDERS.DELETE_REMINDER(reminderId)}`);

    return response.data;
  } catch (err) {
    return processError(err);
  }
};

export const updateSubscriptionReminders = async ({
  subscriptionId,
  updatedReminders,
}: ISubscriptionRemindersUpdate) => {
  try {
    const response = await axiosClient.patch<{
      message: string;
      statusCode: number;
    }>(
      `${API_PATHS.REMINDERS.UPDATE_SUBSCRIPTION_REMINDER(subscriptionId)}`,
      updatedReminders
    );

    return response.data;
  } catch (err) {
    return processError(err);
  }
};

export const deleteSubscriptionReminders = async (subscriptionId: number) => {
  try {
    const response = await axiosClient.delete<{
      message: string;
      statusCode: number;
    }>(`${API_PATHS.REMINDERS.DELETE_SUBSCRIPTION_REMINDERS(subscriptionId)}`);

    return response.data;
  } catch (err) {
    return processError(err);
  }
};
