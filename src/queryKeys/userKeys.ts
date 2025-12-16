export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters?: string) => [...userKeys.all, 'list', filters] as const,
  info: ['userInfo'] as const,
};
