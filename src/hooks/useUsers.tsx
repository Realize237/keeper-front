import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
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
import {
  changeUserPassword,
  createUser,
  deleteAccount,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  requestPasswordRequest,
  resetPassword,
  sendSetPasswordEmail,
  setPassword,
  updateUser,
  validateForgotPasswordToken,
} from '../api/users';
import { env } from '../utils/env';
import { userKeys } from '../queryKeys/userKeys';
import { use } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';

export const useUser = (): UserContextType => {
  const ctx = use(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used inside a <UserProvider>');
  }
  return ctx;
};

export const useUserList = () => {
  return useQuery<UserResponse[]>({
    queryKey: userKeys.lists(),
    queryFn: getAllUsers,
  });
};

export const useCreateUser = () => {
  return useMutation<unknown, Error, UserInput>({
    mutationFn: createUser,
    meta: {
      invalidate: [userKeys.lists()],
    },
  });
};

export const useUpdateUser = () => {
  return useMutation<unknown, Error, { user: UserUpdateInput; id: number }>({
    mutationFn: ({ user, id }) => updateUser(user, id),
    meta: {
      invalidate: [userKeys.info],
    },
  });
};

export const useChangeUserPassword = () => {
  return useMutation<unknown, Error, { data: IEmailPasswordInput }>({
    mutationFn: ({ data }) => changeUserPassword(data),
    meta: {
      invalidate: [userKeys.info],
    },
  });
};

export const useSendSetPasswordEmail = () => {
  return useMutation<unknown, Error, { data: { name: string; email: string } }>(
    {
      mutationFn: ({ data }) => sendSetPasswordEmail(data),
    }
  );
};

export const useRequestPasswordReset = () => {
  return useMutation<unknown, Error, PasswordRequestInput>({
    mutationFn: requestPasswordRequest,
  });
};

export const useValidateForgotPasswordToken = () => {
  return useMutation<unknown, Error, IValidateToken>({
    mutationFn: validateForgotPasswordToken,
  });
};

export const useResetPassword = () => {
  return useMutation<unknown, Error, IResetPassword>({
    mutationFn: resetPassword,
  });
};

export const useSetPassword = () => {
  return useMutation<unknown, Error, { data: ISetPasswordInput }>({
    mutationFn: ({ data }) => setPassword(data),
    meta: {
      invalidate: [userKeys.info],
    },
  });
};

export const useLoginUser = () => {
  return useMutation<unknown, Error, UserLoginInput>({
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

export const useDeleteUserAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => {
      queryClient.setQueryData(userKeys.info, null);
    },
    meta: {
      invalidate: [userKeys.info],
    },
  });
};
