export const notificationKeys = {
  all: ["notifications"] as const,
  user: ["user-notifications"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  details: () => [...notificationKeys.all, "detail"] as const,
  detail: (id: string) => [...notificationKeys.details(), id] as const,
};
