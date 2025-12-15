import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addSubscriptionToGoogleCalendar,
  getSubscriptionDetails,
  removeSubscriptionFromGoogleCalendar,
} from "../api/subscription";
import type {
  IAddToCalendar,
  Subscription,
  SubscriptionsGroupedByDay,
} from "../interfaces/subscription";
import {
  subscriptionKeys,
  type SubscriptionFilters,
} from "../queryKeys/subscriptionKeys";
import { useUser } from "../context/UserContext";
import { getMonthlySubscriptions } from "../services/subscriptionService";

export const useMonthlySubscriptions = (date: Date) => {
  const { user } = useUser();
  return useQuery<SubscriptionsGroupedByDay>({
    queryKey: subscriptionKeys.list({
      userId: user?.id,
      date: date.toISOString(),
    } as SubscriptionFilters),

    queryFn: () => getMonthlySubscriptions(date, user?.id as number),
    enabled: !!user?.id,
  });
};

export const useSubscriptionsDetails = (subscriptionId: number) => {
  return useQuery<Subscription>({
    queryKey: subscriptionKeys.detail(subscriptionId.toString()),
    queryFn: () => getSubscriptionDetails(subscriptionId),
    enabled: !!subscriptionId,
  });
};

export const useAddSubscriptionToGoogleCalendar = () => {
  return useMutation<
    { statusCode: number; message: string },
    Error,
    { data: IAddToCalendar; subscriptionId: number }
  >({
    mutationFn: ({ data, subscriptionId }) =>
      addSubscriptionToGoogleCalendar(data, subscriptionId),
    meta: {
      invalidate: [subscriptionKeys.details()],
    },
  });
};

export const useRemoveSubscriptionFromGoogleCalendar = () => {
  return useMutation<
    { statusCode: number; message: string },
    Error,
    { subscriptionId: number }
  >({
    mutationFn: ({ subscriptionId }) =>
      removeSubscriptionFromGoogleCalendar(subscriptionId),
    meta: {
      invalidate: [subscriptionKeys.details()],
    },
  });
};
