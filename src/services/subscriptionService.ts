import { getAllUserSubscriptions } from '../api/subscription';
import type { Subscription } from '../interfaces/subscription';
import { isSubscriptionActiveThisMonth } from '../utils';

export const getMonthlySubscriptions = async (
  dateToFilter: Date,
  userId: number
) => {
  const allSubscriptions = await getAllUserSubscriptions(userId);

  // get subscriptions whose startDate and endDate fall within the current month
  const currentMonthSubscriptions = allSubscriptions.filter(
    (subscription: Subscription) =>
      isSubscriptionActiveThisMonth(
        new Date(subscription.details.startDate),
        new Date(subscription.details.endDate),
        dateToFilter
      )
  );

  // group by day
  const groupedByDay: Record<number, Subscription[]> =
    currentMonthSubscriptions.reduce(
      (acc: Record<number, Subscription[]>, sub: Subscription) => {
        const day = new Date(sub.details.startDate).getDate();
        if (!acc[day]) acc[day] = [];
        acc[day].push(sub);
        return acc;
      },
      {} as Record<number, Subscription[]>
    );

  return groupedByDay;
};
