import axios from "axios";
import { processError } from "../utils";
import { env } from "../utils/env";
import { API_PATHS } from "./api-paths";
import type {
  IReminderRequest,
  IReminderUpdate,
  ISubscriptionRemindersUpdate,
} from "../interfaces/notifications";

export const addReminders = async (newReminder: IReminderRequest[]) => {
  try {
    const response = await axios.post(
      `${env.API_URL}${API_PATHS.REMINDERS.ADD_REMINDER}`,
      newReminder,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    processError(error);
  }
};

export const getAllReminders = async () => {
  try {
    const response = await axios.get(
      `${env.API_URL}${API_PATHS.REMINDERS.GET_ALL_REMINDERS}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    processError(error);
  }
};

export const getAllUsersReminders = async (userId: number) => {
  try {
    const response = await axios.get(
      `${env.API_URL}${API_PATHS.REMINDERS.GET_ALL_REMINDERS}?userId=${userId}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    processError(error);
  }
};

export const getAllSubscriptionReminders = async (subscriptionId: number) => {
  try {
    const response = await axios.get(
      `${env.API_URL}${API_PATHS.REMINDERS.GET_ALL_REMINDERS}?subscriptionId=${subscriptionId}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    processError(error);
  }
};

export const updateReminder = async (reminderUpdate: IReminderUpdate) => {
  try {
    const response = await axios.patch<{ message: string; statusCode: number }>(
      `${env.API_URL}${API_PATHS.REMINDERS.UPDATE_REMINDER(reminderUpdate.id)}`,
      reminderUpdate,
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    return processError(err);
  }
};

export const deleteReminder = async (reminderId: number) => {
  try {
    const response = await axios.delete<{
      message: string;
      statusCode: number;
    }>(`${env.API_URL}${API_PATHS.REMINDERS.DELETE_REMINDER(reminderId)}`, {
      withCredentials: true,
    });

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
    const response = await axios.patch<{ message: string; statusCode: number }>(
      `${env.API_URL}${API_PATHS.REMINDERS.UPDATE_SUBSCRIPTION_REMINDER(
        subscriptionId
      )}`,
      updatedReminders,
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    return processError(err);
  }
};

export const deleteSubscriptionReminders = async (subscriptionId: number) => {
  try {
    const response = await axios.delete<{
      message: string;
      statusCode: number;
    }>(
      `${env.API_URL}${API_PATHS.REMINDERS.DELETE_SUBSCRIPTION_REMINDERS(
        subscriptionId
      )}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    return processError(err);
  }
};
