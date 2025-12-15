import { ReminderOptionType } from "../interfaces/notifications";


export const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export const monthsOfYear: Record<number,string> = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
} as const;

export const ReminderOptions: ReminderOptionType[] = [
  { value: "5 minutes before", subscriptionType: "BOTH" },
  { value: "10 minutes before", subscriptionType: "BOTH" },
  { value: "30 minutes before", subscriptionType: "BOTH" },
  { value: "1 hour before", subscriptionType: "BOTH" },
  { value: "1 day before", subscriptionType: "BOTH" },
  { value: "2 days before", subscriptionType: "BOTH" },
  { value: "1 week before", subscriptionType: "BOTH" },
  { value: "2 weeks before", subscriptionType: "BOTH" },
  { value: "3 weeks before", subscriptionType: "BOTH" },
  { value: "1 month before", subscriptionType: "YEARLY" },
  { value: "2 months before", subscriptionType: "YEARLY" },
  { value: "3 months before", subscriptionType: "YEARLY" },
  { value: "4 months before", subscriptionType: "YEARLY" },
  { value: "5 months before", subscriptionType: "YEARLY" },
  { value: "6 months before", subscriptionType: "YEARLY" },
  { value: "Custom", subscriptionType: "BOTH" },
];
