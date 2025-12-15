import { IMAGES } from "../assets";
import type { CARD_TYPES } from "./cards";
import { IReminderResponse } from "./notifications";
import type { UserResponse } from "./users";

export const SUBSCRIPTION_PLANS = {
  FREE: "free",
  BASIC: "basic",
  PREMIUM: "premium",
};

export const SUBSCRIPTION_TYPES = {
  MONTHLY: "monthly",
  YEARLY: "yearly",
};

export const SUBSCRIPTION_TYPES_CONFIG: Record<
  keyof typeof SUBSCRIPTION_TYPES,
  { color: string }
> = {
  MONTHLY: { color: "bg-green-700" },
  YEARLY: { color: "bg-blue-700" },
};

export interface SubscriptionDetails {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  iconUrl: string;
}

export interface Subscription {
  id: number;
  plan: keyof typeof SUBSCRIPTION_PLANS;
  type: keyof typeof SUBSCRIPTION_TYPES;
  price: number;
  reccurring: boolean;
  card: keyof typeof CARD_TYPES;
  calendarLink?: string;
  details: SubscriptionDetails;
  user: UserResponse;
  reminders: IReminderResponse[];
  created_at: string;
  updated_at: string;
}

export type SubscriptionsGroupedByDay = Record<number, Subscription[]>;

export const SubscriptionModalTypes = {
  DETAILS: "SubscriptionDetailModal",
  LIST: "SelectedDaySubscriptionListModal",
} as const;

export type SubscriptionModalType =
  (typeof SubscriptionModalTypes)[keyof typeof SubscriptionModalTypes];

export const SUBSCRIPTION_SAMPLES: Subscription[] = [
  {
    id: 19,
    plan: "PREMIUM",
    type: "MONTHLY",
    price: 9.99,
    reccurring: true,
    card: "VISA",
    details: {
      name: "Netflix",
      description: "Streaming service for movies and TV shows",
      startDate: new Date("2025-12-01"),
      endDate: new Date("2026-01-01"),
      iconUrl: IMAGES.Netflix,
    },
    created_at: "2025-12-05T11:12:57.999Z",
    updated_at: "2025-12-05T11:12:57.999Z",
    user: {
      id: 19,
      name: "Tsembom Percy",

      email: "percylinkwe@gmail.com",
      photo: null,

      created_at: "2025-12-01T15:34:52.741Z",
    },
  },
  {
    id: 17,
    plan: "BASIC",
    type: "YEARLY",
    price: 59.99,
    reccurring: true,
    card: "MASTER",
    details: {
      name: "Spotify",
      description: "Music streaming service",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2025-01-01"),
      iconUrl: IMAGES.Spotify,
    },
    created_at: "2025-12-05T11:12:57.999Z",
    updated_at: "2025-12-05T11:12:57.999Z",
    user: {
      id: 12,
      name: "Tsembom Percy",

      email: "percylinkwe@gmail.com",
      photo: null,

      created_at: "2025-12-01T15:34:52.741Z",
    },
  },
  {
    id: 15,
    plan: "FREE",
    type: "MONTHLY",
    price: 8.0,
    reccurring: false,
    card: "PAYPAL",
    details: {
      name: "Duolingo",
      description: "Language learning app",
      startDate: new Date("2024-11-15"),
      endDate: new Date("2025-12-15"),
      iconUrl: IMAGES.Duolingo,
    },
    created_at: "2025-12-05T11:12:57.999Z",
    updated_at: "2025-12-05T11:12:57.999Z",
    user: {
      id: 12,
      name: "Tsembom Percy",

      email: "percylinkwe@gmail.com",
      photo: null,

      created_at: "2025-12-01T15:34:52.741Z",
    },
  },
  {
    id: 14,
    plan: "PREMIUM",
    type: "YEARLY",
    price: 119.99,
    reccurring: true,
    card: "VISA",
    details: {
      name: "Amazon",
      description: "Online shopping and streaming service",
      startDate: new Date("2024-11-15"),
      endDate: new Date("2025-11-15"),
      iconUrl: IMAGES.Amazon,
    },
    created_at: "2025-12-05T11:12:57.999Z",
    updated_at: "2025-12-05T11:12:57.999Z",
    user: {
      id: 12,
      name: "Tsembom Percy",

      email: "percylinkwe@gmail.com",
      photo: null,

      created_at: "2025-12-01T15:34:52.741Z",
    },
  },
  {
    id: 13,
    plan: "BASIC",
    type: "YEARLY",
    price: 59.99,
    reccurring: true,
    card: "MASTER",
    details: {
      name: "Spotify",
      description: "Music streaming service",
      startDate: new Date("2024-11-02"),
      endDate: new Date("2025-12-05"),
      iconUrl: IMAGES.Spotify,
    },
    created_at: "2025-12-05T11:12:57.999Z",
    updated_at: "2025-12-05T11:12:57.999Z",
    user: {
      id: 12,
      name: "Tsembom Percy",

      email: "percylinkwe@gmail.com",
      photo: null,

      created_at: "2025-12-01T15:34:52.741Z",
    },
  },
  {
    id: 12,
    plan: "PREMIUM",
    type: "YEARLY",
    price: 119.99,
    reccurring: true,
    card: "VISA",
    details: {
      name: "Amazon",
      description: "Online shopping and streaming service",
      startDate: new Date("2024-11-29"),
      endDate: new Date("2025-11-29"),
      iconUrl: IMAGES.Amazon,
    },
    created_at: "2025-12-05T11:12:57.999Z",
    updated_at: "2025-12-05T11:12:57.999Z",
    user: {
      id: 12,
      name: "Tsembom Percy",

      email: "percylinkwe@gmail.com",
      photo: null,

      created_at: "2025-12-01T15:34:52.741Z",
    },
  },
];

export interface IAddToCalendar {
  title: string;
  description: string;
}
