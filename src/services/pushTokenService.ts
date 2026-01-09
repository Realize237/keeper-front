import { axiosClient } from '../lib/axiosClient';
import { API_PATHS } from '../api/api-paths';
import { env } from '../utils/env';
import { processError } from '../utils';
import type { ApiSuccessResponse } from '../interfaces/api';

export const saveWebPushToken = async (token: string) => {
  try {
    const response = await axiosClient.post<ApiSuccessResponse>(
      `${env.API_URL}${API_PATHS.PUSH_TOKEN.REGISTER_TOKEN}`,
      {
        token,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err: unknown) {
    return processError(err);
  }
};
