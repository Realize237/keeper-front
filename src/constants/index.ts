import type { Notification } from "../interfaces/notifications";

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

export const seedNotifications = (): Notification[] => [
  {
    id: '1',
    title: 'Order Delivered',
    message: 'Your order #12345 has been delivered successfully',
    type: 'success',
    isRead: false,
    timestamp: new Date(Date.now() - 5 * 60_000),
    category: 'Orders',
  },
  {
    id: '2',
    title: 'Payment Confirmed',
    message: 'Payment of $99.99 has been confirmed for order #12346',
    type: 'success',
    isRead: false,
    timestamp: new Date(Date.now() - 15 * 60_000),
    category: 'Payment',
  },
  {
    id: '3',
    title: 'New Message',
    message: 'You have a new message from support team',
    type: 'info',
    isRead: true,
    timestamp: new Date(Date.now() - 2 * 60 * 60_000),
    category: 'Messages',
  },
  {
    id: '4',
    title: 'Special Offer',
    message: 'Get 30% off on your next order with code SAVE30',
    type: 'info',
    isRead: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60_000),
    category: 'Promotions',
  },
  {
    id: '5',
    title: 'Delivery Delayed',
    message: 'Your delivery is running 30 minutes late',
    type: 'warning',
    isRead: false,
    timestamp: new Date(Date.now() - 60 * 60_000),
    category: 'Orders',
  },
  {
    id: '6',
    title: 'Account Alert',
    message: 'Unusual activity detected on your account',
    type: 'error',
    isRead: false,
    timestamp: new Date(Date.now() - 30 * 60_000),
    category: 'Security',
  },
  // add more items if you want to test pagination
];