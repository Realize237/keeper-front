import { isSubscriptionActiveThisMonth } from "../utils";
import { SUBSCRIPTION_SAMPLES } from "../interfaces/subscription";

export const getAllSubscriptions = async () => {
  return new Promise<typeof SUBSCRIPTION_SAMPLES>((resolve) => {
    setTimeout(() => {
      resolve(SUBSCRIPTION_SAMPLES);
    }, 500);
  });
};

export const getMonthlySubscriptions = async (dateToFilter: Date) => {
  const allSubscriptions = await getAllSubscriptions();

  // get subscriptions whose startDate and endDate fall within the current month
  const currentMonthSubscriptions = allSubscriptions.filter((subscription) =>
    isSubscriptionActiveThisMonth(
      subscription.details.startDate,
      subscription.details.endDate,
      dateToFilter
    )
  );

  // group by day
  const groupedByDay: Record<number, typeof SUBSCRIPTION_SAMPLES> =
    currentMonthSubscriptions.reduce((acc, sub) => {
      const day = sub.details.startDate.getDate();
      if (!acc[day]) acc[day] = [];
      acc[day].push(sub);
      return acc;
    }, {} as Record<number, typeof SUBSCRIPTION_SAMPLES>);

  return groupedByDay;
};
