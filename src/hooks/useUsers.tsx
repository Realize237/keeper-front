import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  UserInput,
  UserLoginInput,
  UserResponse,
} from "../interfaces/users";
import { createUser, getAllUsers, getUserInfo, loginUser, logoutUser } from "../api/users";
import { env } from "../utils/env";

export const useUserList = () => {
  return useQuery<UserResponse[]>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<{ statusCode: number; message: string }, Error, UserInput>(
    {
      mutationFn: createUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    }
  );
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, UserLoginInput>({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });
};

export const useLogoutUser = ()=> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: ()=> {
      queryClient.setQueryData(["userInfo"], null)
      queryClient.invalidateQueries({queryKey: ["userInfo"]})
    }
  })
}

export const useUserInfo = () => {
  return useQuery<UserResponse>({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * Number(env.USER_INFO_CACHE_TIME), 
    gcTime: 1000 * 60 * Number(env.USER_INFO_CACHE_TIME) , 
    refetchOnWindowFocus: true, 
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
};

