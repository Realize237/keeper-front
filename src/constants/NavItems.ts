import type { IconType } from "react-icons";
import { FaCalendarAlt, FaCreditCard, FaUserCircle, FaUsers } from "react-icons/fa";
import { env } from "../utils/env";

export type NavItem = {
  label: string;
  icon: IconType;
  path: string;
  visible: boolean;
};

const activeNavItems = env.ACTIVE_MENU_ITEMS.split(",").map((i) =>
    i.trim().toLocaleLowerCase()
  );

export const NavItems: NavItem[] = [
  { label: "Subscriptions", icon: FaCalendarAlt, path: "/subscriptions", visible:false },
  { label: "Shared Plan", icon: FaUsers, path: "/shared-plan", visible:false },
  { label: "Cards", icon: FaCreditCard, path: "/cards", visible:false },
  { label: "Profile", icon: FaUserCircle, path: "/profile", visible:false },
].map((item=>(
  {...item, visible: activeNavItems.includes(item.label.trim().toLocaleLowerCase())}
)))

