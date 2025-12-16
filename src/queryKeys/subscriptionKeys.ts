export type SubscriptionFilters = {
  userId: number;
  date: string;
};
export const subscriptionKeys = {
  all: ['subscriptions'] as const,
  lists: () => [...subscriptionKeys.all, 'list'] as const,
  list: (filters?: SubscriptionFilters) =>
    [...subscriptionKeys.lists(), { ...filters }] as const,
  details: () => [...subscriptionKeys.all, 'detail'] as const,
  detail: (id: string) => [...subscriptionKeys.details(), id] as const,
};
