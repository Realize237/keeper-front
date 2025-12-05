import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Notification, NotificationRequest } from "../interfaces/notifications";
import {
  deleteNotification,
  getAllNotifications,
  getAllUsersNotifications,
  updateNotification
} from "../api/notifications";
import { notificationKeys } from "../queryKeys/notificationKeys";

export const useUserNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: notificationKeys.all,
    queryFn: getAllUsersNotifications,
  });
};

export const useAllNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: notificationKeys.user,
    queryFn: getAllNotifications,
  });
};

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { statusCode: number; message: string },
    Error,
    NotificationRequest
  >({
    mutationFn: updateNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.user });
    },
  });
};

export const useDeleteNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation<{ statusCode: number; message: string }, Error, NotificationRequest>({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.user });
    },
  });
};
