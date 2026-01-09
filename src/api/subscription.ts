import { processError } from '../utils';
import { axiosClient } from '../lib/axiosClient';
import { API_PATHS } from './api-paths';
import { IAddToCalendar, Subscription } from '../interfaces/subscription';
import type { ApiSuccessResponse } from '../interfaces/api';

export const getAllUserSubscriptions = async (userId: number) => {
  try {
    const response = await axiosClient.get<ApiSuccessResponse<Subscription[]>>(
      `${API_PATHS.SUBSCRIPTIONS.GET_USER_SUBSCRIPTIONS(userId)}`
    );

    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const getSubscriptionDetails = async (subscriptionId: number) => {
  try {
    const response = await axiosClient.get<ApiSuccessResponse<Subscription>>(
      `${API_PATHS.SUBSCRIPTIONS.GET_SUBSCRIPTION_DETAILS(subscriptionId)}`
    );
    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const addSubscriptionToGoogleCalendar = async (
  data: IAddToCalendar,
  subscriptionId: number
) => {
  try {
    const response = await axiosClient.post<ApiSuccessResponse>(
      `${API_PATHS.SUBSCRIPTIONS.ADD_TO_GOOGLE_CALENDAR(subscriptionId)}`,
      {
        ...data,
      }
    );

    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const removeSubscriptionFromGoogleCalendar = async (
  subscriptionId: number
) => {
  try {
    const response = await axiosClient.delete<ApiSuccessResponse>(
      `${API_PATHS.SUBSCRIPTIONS.REMOVE_FROM_GOOGLE_CALENDAR(subscriptionId)}`
    );

    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};
