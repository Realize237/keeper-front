import { axiosClient } from '../lib/axiosClient';
import { env } from '../utils/env';
import { API_PATHS } from './api-paths';
import {
  IEmailPasswordInput,
  IResetPassword,
  ISetPasswordInput,
  IValidateToken,
  PasswordRequestInput,
  ResendVerificationPayload,
  UserInput,
  UserLoginInput,
  UserResponse,
  UserUpdateInput,
} from '../interfaces/users';
import { processError } from '../utils';
import type { ApiSuccessResponse } from '../interfaces/api';

export const createUser = async (user: UserInput) => {
  try {
    const response = await axiosClient.post<ApiSuccessResponse>(
      `${API_PATHS.USERS.CREATE_USER}`,
      {
        ...user,
      }
    );

    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const loginUser = async (loginData: UserLoginInput) => {
  try {
    const response = await axiosClient.post<ApiSuccessResponse>(
      `${API_PATHS.USERS.LOGIN}`,
      {
        ...loginData,
      }
    );
    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosClient.get<ApiSuccessResponse<UserResponse>>(
      `${API_PATHS.USERS.GET_USER_INFO}`
    );

    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosClient.get<ApiSuccessResponse<UserResponse[]>>(
      `${API_PATHS.USERS.GET_ALL_USERS}`
    );

    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const logoutUser = async (clientPushToken: string) => {
  try {
    const response = await axiosClient.post<ApiSuccessResponse>(
      `${env.API_URL}${API_PATHS.USERS.LOGOUT}`,
      { clientPushToken }
    );

    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const updateUser = async (user: UserUpdateInput, id: number) => {
  try {
    const response = await axiosClient.patch<ApiSuccessResponse>(
      `${env.API_URL}${API_PATHS.USERS.UPDATE_USER(id)}`,
      {
        ...user,
      }
    );
    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const changeUserPassword = async (data: IEmailPasswordInput) => {
  try {
    const response = await axiosClient.patch<ApiSuccessResponse>(
      `${env.API_URL}${API_PATHS.USERS.CHANGE_PASSWORD}`,
      {
        ...data,
      }
    );

    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const sendSetPasswordEmail = async (data: {
  name: string;
  email: string;
}) => {
  try {
    const response = await axiosClient.post<ApiSuccessResponse>(
      `${API_PATHS.USERS.SEND_SET_PASSWORD_EMAIL(data.email)}`,
      { ...data }
    );
    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const setPassword = async (data: ISetPasswordInput) => {
  try {
    const response = await axiosClient.post<ApiSuccessResponse>(
      `${API_PATHS.USERS.SET_PASSWORD}`,
      {
        ...data,
      }
    );

    return response.data.data;
  } catch (err: unknown) {
    return processError(err);
  }
};

export const requestPasswordRequest = async (data: PasswordRequestInput) => {
  try {
    const response = await axiosClient.post<ApiSuccessResponse>(
      `${API_PATHS.USERS.REQUEST_PASSWORD_RESET}`,
      data
    );
    return response.data.data;
  } catch (error) {
    return processError(error);
  }
};

export const validateForgotPasswordToken = async (data: IValidateToken) => {
  try {
    const response = await axiosClient.post<ApiSuccessResponse>(
      `${API_PATHS.USERS.VALIDATE_FORGOT_PASSWORD_OTP}`,
      data
    );
    return response.data.data;
  } catch (error) {
    return processError(error);
  }
};

export const resetPassword = async (data: IResetPassword) => {
  try {
    const response = await axiosClient.patch<ApiSuccessResponse>(
      `${API_PATHS.USERS.RESET_PASSWORD(data.email)}`,
      { newPassword: data.newPassword }
    );
    return response.data.data;
  } catch (error) {
    return processError(error);
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axiosClient.patch<ApiSuccessResponse>(
      `${API_PATHS.USERS.DELETE_ACCOUNT}`
    );
    return response.data.data;
  } catch (error) {
    return processError(error);
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await axiosClient.patch<ApiSuccessResponse>(
      `${API_PATHS.USERS.VERIFY_EMAIL}?token=${token}`
    );
    return response.data.data;
  } catch (error) {
    return processError(error);
  }
};

export const resendEmailVerification = async (
  payload: ResendVerificationPayload
) => {
  try {
    const response = await axiosClient.post<ApiSuccessResponse>(
      `${API_PATHS.USERS.RESEND_EMAIL}`,
      payload
    );
    return response.data.data;
  } catch (error) {
    return processError(error);
  }
};
