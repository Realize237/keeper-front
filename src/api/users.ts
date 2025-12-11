import axios from "axios";
import { env } from "../utils/env";
import { API_PATHS } from "./api-paths";
import {
  IEmailPasswordInput,
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

export const changeUserPassword = async (
  data: IEmailPasswordInput,
  id: number
) => {
  try {
    const response = await axios.patch<{ statusCode: number; message: string }>(
      `${env.API_URL}${API_PATHS.USERS.CHANGE_PASSWORD(id)}`,
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
