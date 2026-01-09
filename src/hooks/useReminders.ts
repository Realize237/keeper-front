import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from './useUsers';
import {
  IReminderRequest,
  IReminderResponse,
  IReminderUpdate,
  ISubscriptionRemindersUpdate,
} from '../interfaces/notifications';
import { reminderKeys } from '../queryKeys/reminderKeys';
import {
  addReminders,
  deleteReminder,
  deleteSubscriptionReminders,
  getAllReminders,
  getAllUsersReminders,
  updateReminder,
  updateSubscriptionReminders,
} from '../api/reminders';
import {
  SubscriptionFilters,
  subscriptionKeys,
} from '../queryKeys/subscriptionKeys';

export const useUserReminders = () => {
  const { user } = useUser();
  return useQuery<IReminderResponse[]>({
    queryKey: reminderKeys.detail(user?.id.toString() as string),
    queryFn: () => getAllUsersReminders(user?.id as number),
    enabled: !!user?.id,
  });
};

export const useAddReminder = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation<
    { statusCode: number; message: string },
    Error,
    IReminderRequest[]
  >({
    mutationFn: addReminders,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.list({
          userId: user?.id,
        } as SubscriptionFilters),
      });
    },
  });
};

export const useAllReminders = () => {
  return useQuery<IReminderResponse[]>({
    queryKey: reminderKeys.all,
    queryFn: getAllReminders,
  });
};

export const useUpdateReminder = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation<unknown, Error, IReminderUpdate>({
    mutationFn: updateReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.list({
          userId: user?.id,
        } as SubscriptionFilters),
      });
    },
  });
};

export const useUpdateSubscriptionReminders = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation<unknown, Error, ISubscriptionRemindersUpdate>({
    mutationFn: updateSubscriptionReminders,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.list({
          userId: user?.id,
        } as SubscriptionFilters),
      });
    },
  });
};

export const useDeleteReminder = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation<unknown, Error, number>({
    mutationFn: deleteReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.list({
          userId: user?.id,
        } as SubscriptionFilters),
      });
    },
  });
};

export const useDeleteSubscriptionReminders = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation<unknown, Error, number>({
    mutationFn: deleteSubscriptionReminders,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.list({
          userId: user?.id,
        } as SubscriptionFilters),
      });
    },
  });
};
