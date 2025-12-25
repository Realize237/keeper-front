import axios from 'axios';
import { API_PATHS } from '../api/api-paths';
import { env } from '../utils/env';
import { processError } from '../utils';

export const saveWebPushToken = async (token: string) => {
  try {
    const response = await axios.post<{ statusCode: number; message: string }>(
      `${env.API_URL}${API_PATHS.PUSH_TOKEN.REGISTER_TOKEN}`,
      {
        token,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err: any) {
    return processError(err);
  }
};
