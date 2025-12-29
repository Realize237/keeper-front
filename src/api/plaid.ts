import axios from 'axios';
import { API_PATHS } from './api-paths';
import { processError } from '../utils';

export const getTransactions = async () => {
  try {
    const response = await axios.get<[]>(
      `${API_PATHS.PLAID.GET_TRANSACTIONS}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const getRecuringTransactions = async () => {
  try {
    const response = await axios.get<[]>(
      `${API_PATHS.PLAID.GET_RECURRING_TRANSACTIONS}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const exchangePublicToken = async (public_token: string) => {
  try {
    const response = await axios.post<{ statusCode: number; message: string }>(
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
    const response = await axios.post<{ link_token: string }>(
      `${API_PATHS.PLAID.CREATE_LINK_TOKEN}`,
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const syncCardSubscriptions = async () => {
  try {
    const response = await axios.post<{ statusCode: number; message: string }>(
      `${API_PATHS.PLAID.SYNC_CARD_SUBSCRIPTIONS}`,
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (err: unknown) {
    return processError(err);
  }
};
