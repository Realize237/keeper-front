export const googleCalendarKeys = {
  access: (userId: number | undefined) =>
    ['googleCalendarAccess', userId] as const,
};
