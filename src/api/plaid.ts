import { axiosClient } from '../lib/axiosClient';
import { API_PATHS } from './api-paths';
import { processError } from '../utils';

export const getTransactions = async () => {
  try {
    const response = await axiosClient.get<[]>(
      `${API_PATHS.PLAID.GET_TRANSACTIONS}`
    );

    return response.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const getRecuringTransactions = async () => {
  try {
    const response = await axiosClient.get<[]>(
      `${API_PATHS.PLAID.GET_RECURRING_TRANSACTIONS}`
    );

    return response.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const exchangePublicToken = async (public_token: string) => {
  try {
    const response = await axiosClient.post<{
      statusCode: number;
      message: string;
    }>(
      `${API_PATHS.PLAID.EXCHANGE_PUBLIC_TOKEN}`,
      new URLSearchParams({ public_token }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const createLinkToken = async () => {
  try {
    const response = await axiosClient.post<{ data: { link_token: string } }>(
      `${API_PATHS.PLAID.CREATE_LINK_TOKEN}`,
      {}
    );

    return response.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const triggerWebhook = async () => {
  try {
    const response = await axiosClient.post<{
      statusCode: number;
      message: string;
    }>(`${API_PATHS.PLAID.WEBHOOK}`, {});

    return response.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const syncCardSubscriptions = async () => {
  try {
    const response = await axiosClient.post<{
      statusCode: number;
      message: string;
    }>(`${API_PATHS.PLAID.SYNC_CARD_SUBSCRIPTIONS}`, {});

    return response.data;
  } catch (err: unknown) {
    return processError(err);
  }
};
