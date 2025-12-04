import type { IconType } from "react-icons";
import { FaCalendarAlt, FaCreditCard, FaUserCircle, FaUsers } from "react-icons/fa";

export type NavItem = {
  label: string;
  icon: IconType;
  path: string;
};

export const NavItems: NavItem[] = [
  { label: "Subscriptions", icon: FaCalendarAlt, path: "/subscriptions" },
  { label: "Shared Plan", icon: FaUsers, path: "/shared-plan" },
  { label: "Cards", icon: FaCreditCard, path: "/cards" },
  { label: "Profile", icon: FaUserCircle, path: "/profile" },
];