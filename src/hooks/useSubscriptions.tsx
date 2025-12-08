import { useQuery } from "@tanstack/react-query";
import { getAllUserSubscriptions } from "../api/subscription";
import type {
  Subscription,
  SubscriptionsGroupedByDay,
} from "../interfaces/subscription";
import {
  subscriptionKeys,
  type SubscriptionFilters,
} from "../queryKeys/subscriptionKeys";
import { useUser } from "../context/UserContext";
import { getMonthlySubscriptions } from "../services/subscriptionService";

export const useUserSubscriptions = () => {
  const { user } = useUser();

  return useQuery<Subscription[]>({
    queryKey: subscriptionKeys.list({
      userId: user?.id,
    } as SubscriptionFilters), //query key
    queryFn: getAllUserSubscriptions,
    enabled: !!user?.id,
  });
};

export const useMonthlySubscriptions = (date: Date) => {
  const { user } = useUser();
  return useQuery<SubscriptionsGroupedByDay>({
    queryKey: subscriptionKeys.list({
      userId: user?.id,
      date: date.toISOString(),
    } as SubscriptionFilters),

    queryFn: () => getMonthlySubscriptions(date),
    enabled: !!user?.id,
  });
};
