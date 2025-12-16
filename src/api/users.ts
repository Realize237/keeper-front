import axios from "axios";
import { env } from "../utils/env";
import { API_PATHS } from "./api-paths";
import {
  IEmailPasswordInput,
  ISetPasswordInput,
  UserInput,
  UserLoginInput,
  UserResponse,
  UserUpdateInput,
} from "../interfaces/users";
import { processError } from "../utils";

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

export const logoutUser = async () => {
  try {
    const response = await axios.post<{ message: string }>(
      `${env.API_URL}${API_PATHS.USERS.LOGOUT}`,
      {},
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
