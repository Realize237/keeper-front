import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  IEmailPasswordInput,
  ISetPasswordInput,
  UserInput,
  UserLoginInput,
  UserResponse,
  UserUpdateInput,
} from '../interfaces/users';
import {
  changeUserPassword,
  createUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  sendSetPasswordEmail,
  setPassword,
  updateUser,
} from '../api/users';
import { env } from '../utils/env';
import { userKeys } from '../queryKeys/userKeys';

export const useUserList = () => {
  return useQuery<UserResponse[]>({
    queryKey: userKeys.lists(),
    queryFn: getAllUsers,
  });
};

export const useCreateUser = () => {
  return useMutation<{ statusCode: number; message: string }, Error, UserInput>(
    {
      mutationFn: createUser,
      meta: {
        invalidate: [userKeys.lists()],
      },
    }
  );
};

export const useUpdateUser = () => {
  return useMutation<
    { statusCode: number; message: string },
    Error,
    { user: UserUpdateInput; id: number }
  >({
    mutationFn: ({ user, id }) => updateUser(user, id),
    meta: {
      invalidate: [userKeys.info],
    },
  });
};

export const useChangeUserPassword = () => {
  return useMutation<
    { statusCode: number; message: string },
    Error,
    { data: IEmailPasswordInput }
  >({
    mutationFn: ({ data }) => changeUserPassword(data),
    meta: {
      invalidate: [userKeys.info],
    },
  });
};

export const useSendSetPasswordEmail = () => {
  return useMutation<
    { statusCode: number; message: string },
    Error,
    { data: { name: string; email: string } }
  >({
    mutationFn: ({ data }) => sendSetPasswordEmail(data),
  });
};

export const useSetPassword = () => {
  return useMutation<
    { statusCode: number; message: string },
    Error,
    { data: ISetPasswordInput }
  >({
    mutationFn: ({ data }) => setPassword(data),
    meta: {
      invalidate: [userKeys.info],
    },
  });
};

export const useLoginUser = () => {
  return useMutation<{ message: string }, Error, UserLoginInput>({
    mutationFn: loginUser,
    meta: {
      invalidate: [userKeys.info],
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (clientPushToken: string) => logoutUser(clientPushToken),
    onSuccess: () => {
      queryClient.setQueryData(userKeys.info, null);
    },
    meta: {
      invalidate: [userKeys.info],
    },
  });
};

export const useUserInfo = () => {
  return useQuery<UserResponse>({
    queryKey: userKeys.info,
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * Number(env.USER_INFO_CACHE_TIME),
    gcTime: 1000 * 60 * Number(env.USER_INFO_CACHE_TIME),
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false,
  });
};
