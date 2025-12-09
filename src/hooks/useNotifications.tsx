import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Notification, NotificationRequest } from "../interfaces/notifications";
import {
  deleteNotification,
  getAllNotifications,
  getAllUsersNotifications,
  updateNotification
} from "../api/notifications";
import { notificationKeys } from "../queryKeys/notificationKeys";
import { useUser } from "../context/UserContext";

export const useUserNotifications = () => {
  const {user} = useUser();
  console.log("User: ", user)
  return useQuery<Notification[]>({
    queryKey: notificationKeys.user,
    queryFn: () => getAllUsersNotifications(user?.id as number),
    enabled:!!user?.id
  });
};

export const useAllNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: notificationKeys.all,
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
