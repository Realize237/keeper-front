import axios from 'axios';
import { env } from '../utils/env';
import { API_PATHS } from './api-paths';
import {
  IEmailPasswordInput,
  IResetPassword,
  ISetPasswordInput,
  IValidateToken,
  PasswordRequestInput,
  UserInput,
  UserLoginInput,
  UserResponse,
  UserUpdateInput,
} from '../interfaces/users';
import { processError } from '../utils';

export const createUser = async (user: UserInput) => {
  try {
    const response = await axios.post<{ statusCode: number; message: string }>(
      `${env.API_URL}${API_PATHS.USERS.CREATE_USER}`,
      {
        ...user,
      }
    );

    return response.data;
  } catch (err: any) {
    return processError(err);
  }
};

export const loginUser = async (loginData: UserLoginInput) => {
  try {
    const response = await axios.post<{ message: string }>(
      `${env.API_URL}${API_PATHS.USERS.LOGIN}`,
      {
        ...loginData,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (err: any) {
    return processError(err);
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get<UserResponse>(
      `${env.API_URL}${API_PATHS.USERS.GET_USER_INFO}`,
      {
        withCredentials: true, // ← enable sending cookies
      }
    );

    return response.data;
  } catch (err: any) {
    return processError(err);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get<UserResponse[]>(
      `${env.API_URL}${API_PATHS.USERS.GET_ALL_USERS}`,
      {
        withCredentials: true, // ← enable sending cookies
      }
    );

    return response.data;
  } catch (err: any) {
    return processError(err);
  }
};

export const logoutUser = async (clientPushToken: string) => {
  try {
    const response = await axios.post<{ statusCode: number; message: string }>(
      `${env.API_URL}${API_PATHS.USERS.LOGOUT}`,
      { clientPushToken },
      { withCredentials: true }
    );

    return response.data;
  } catch (err: any) {
    return processError(err);
  }
};

export const updateUser = async (user: UserUpdateInput, id: number) => {
  try {
    const response = await axios.patch<{ statusCode: number; message: string }>(
      `${env.API_URL}${API_PATHS.USERS.UPDATE_USER(id)}`,
      {
        ...user,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (err: any) {
    return processError(err);
  }
};

export const changeUserPassword = async (data: IEmailPasswordInput) => {
  try {
    const response = await axios.patch<{ statusCode: number; message: string }>(
      `${env.API_URL}${API_PATHS.USERS.CHANGE_PASSWORD}`,
      {
        ...data,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (err: any) {
    return processError(err);
  }
};

export const sendSetPasswordEmail = async (data: {
  name: string;
  email: string;
}) => {
  try {
    const response = await axios.post<{ statusCode: number; message: string }>(
      `${env.API_URL}${API_PATHS.USERS.SEND_SET_PASSWORD_EMAIL(userId)}`,
      { ...data },
      { withCredentials: true }
    );
    return response.data;
  } catch (err: any) {
    return processError(err);
  }
};

export const setPassword = async (data: ISetPasswordInput) => {
  try {
    const response = await axios.post<{ statusCode: number; message: string }>(
      `${env.API_URL}${API_PATHS.USERS.SET_PASSWORD}`,
      {
        ...data,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (err: any) {
    return processError(err);
  }
};

export const requestPasswordRequest = async (data:PasswordRequestInput) => {
  try {
    const response = await axios.post(`${env.API_URL}${API_PATHS.USERS.REQUEST_PASSWORD_RESET}`, data);
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const validateForgotPasswordToken = async (data: IValidateToken) => {
  try {
    const response = await axios.post(`${env.API_URL}${API_PATHS.USERS.VALIDATE_FORGOT_PASSWORD_OTP}`, data);
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const resetPassword = async (data: IResetPassword) => {
  try {
    const response = await axios.patch(`${env.API_URL}${API_PATHS.USERS.RESET_PASSWORD(data.email)}`, {newPassword:data.newPassword});
    return response.data;
  } catch (error) {
    return processError(error);
  }
};