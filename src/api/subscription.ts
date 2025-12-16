import { processError } from '../utils';
import axios from 'axios';
import { API_PATHS } from './api-paths';
import { env } from '../utils/env';
import { IAddToCalendar, Subscription } from '../interfaces/subscription';

export const getAllUserSubscriptions = async (userId: number) => {
  try {
    const response = await axios.get<Subscription[]>(
      `${env.API_URL}${API_PATHS.SUBSCRIPTIONS.GET_USER_SUBSCRIPTIONS(userId)}`,
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (err: any) {
    return processError(err);
  }
};

export const getSubscriptionDetails = async (subscriptionId: number) => {
  try {
    const response = await axios.get<Subscription>(
      `${env.API_URL}${API_PATHS.SUBSCRIPTIONS.GET_SUBSCRIPTION_DETAILS(
        subscriptionId
      )}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (err: any) {
    return processError(err);
  }
};

export const addSubscriptionToGoogleCalendar = async (
  data: IAddToCalendar,
  subscriptionId: number
) => {
  try {
    const response = await axios.post<{ statusCode: number; message: string }>(
      `${env.API_URL}${API_PATHS.SUBSCRIPTIONS.ADD_TO_GOOGLE_CALENDAR(
        subscriptionId
      )}`,
      { ...data },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err: any) {
    return processError(err);
  }
};

export const removeSubscriptionFromGoogleCalendar = async (
  subscriptionId: number
) => {
  try {
    const response = await axios.delete<{
      statusCode: number;
      message: string;
    }>(
      `${env.API_URL}${API_PATHS.SUBSCRIPTIONS.REMOVE_FROM_GOOGLE_CALENDAR(
        subscriptionId
      )}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err: any) {
    return processError(err);
  }
};
