import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { UserInput, UserLoginInput, UserResponse } from "../interfaces/users";
import { createUser, getAllUsers, getUserInfo, loginUser } from "../api/users";

export const useUserList=()=> {
  return useQuery<UserResponse[]>({
    queryKey: ["users"],
    queryFn: getAllUsers
  });
}

export const useCreateUser=()=> {
  const queryClient = useQueryClient();

  return useMutation<{statusCode: number, message: string}, Error, UserInput>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export const useLoginUser=()=> {
  return useMutation<{message: string}, Error, UserLoginInput>({
    mutationFn: loginUser,
    onSuccess: (data) => {
        console.log('Login Success Data: ', data)
    },
  });
}

export const useUserInfo=()=> {
  return useQuery<UserResponse>({
    queryKey: ["userInfo"],
    queryFn: getUserInfo
  });
}