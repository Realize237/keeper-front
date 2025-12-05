import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Notification } from "../interfaces/notifications";
import {
  deleteAllUserNotifications,
  deleteMultipleNotifications,
  deleteSingleNotification,
  getAllNotifications,
  getAllUsersNotifications,
  toggleMultipleNotificationReadStatus,
  toggleSingleNotificationReadStatus,
} from "../api/notifications";

export const useUserNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: ["users-notifications"],
    queryFn: getAllUsersNotifications,
  });
};

export const useAllNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
  });
};

export const useToggleSingleNotificationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { statusCode: number; message: string },
    Error,
    number
  >({
    mutationFn: toggleSingleNotificationReadStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-notifications"] });
    },
  });
};

export const useToggleMultipleNotificationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<{ statusCode: number; message: string }, Error, Notification[]>({
    mutationFn: toggleMultipleNotificationReadStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-notifications"] });
    },
  });
};

export const useDeleteSingleNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<{ statusCode: number; message: string }, Error, number>({
    mutationFn: deleteSingleNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-notifications"] });
    },
  });
};

export const useDeleteMultipleNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation<{ statusCode: number; message: string }, Error, number[]>({
    mutationFn: deleteMultipleNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-notifications"] });
    },
  });
};

export const useDeleteAllUsersNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation<{ statusCode: number; message: string }, Error>({
    mutationFn: deleteAllUserNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-notifications"] });
    },
  });
};
