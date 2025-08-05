import {
  Bell,
  BookMarked,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  CircleHelp,
  CircleUser,
  Command,
  Edit,
  FileCheck,
  FileUser,
  History,
  Home,
  List,
  ListChecks,
  Pencil,
  PencilRuler,
  ProjectorIcon,
  SearchCheckIcon,
  SearchIcon,
  Settings,
  ShieldCheck,
  ShieldHalf,
  SquareUserRound,
  StickyNote,
  Telescope,
  UserCog,
  UserPlus,
  Users,
  UsersRound,
} from "lucide-react";
import { MdOutlineRateReview } from "react-icons/md";

export const NAV_CONFIG = {
  main: [
    {
      title: "Search",
      url: "/search",
      icon: SearchIcon,
      roles: ["*"],
    },
    {
      title: "Trang chủ",
      url: "/",
      icon: Home,
      roles: ["*"],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      roles: ["*"],
    },
 
  ],

  // Based on entities folder, you can add more items here
  management: [
    {
      title: "Albums",
      url: "/dashboard/albums",
      icon: BookMarked,
      roles: ["*"],
    },
    {
      title: "Blogs",
      url: "/dashboard/blogs",
      icon: Pencil,
      roles: ["*"],
    },
    {
      title: "Service Bookings",
      url: "/dashboard/service-bookings",
      icon: CalendarCheck,
      roles: ["*"],
    },
    {
      title: "Customers",
      url: "/dashboard/users",
      icon: UserPlus,
      roles: ["*"],
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ListChecks,
      roles: ["*"],
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Briefcase,
      roles: ["*"],
    },
    {
      title: "Reviews",
      url: "/dashboard/reviews",
      icon: MdOutlineRateReview,
      roles: ["*"],
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: Command,
      roles: ["*"],
    },
    {
      title: "Colors",
      url: "/dashboard/colors",
      icon: PencilRuler,
      roles: ["*"],
    },
    {
      title: "Sizes",
      url: "/dashboard/sizes",
      icon: SquareUserRound,
      roles: ["*"],
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: FileCheck,
      roles: ["*"],
    },
    {
      title: "Vouchers",
      url: "/dashboard/vouchers",
      icon: StickyNote,
      roles: ["*"],
    },
    {
      title: "Media Files",
      url: "/dashboard/media-files",
      icon: ProjectorIcon,
      roles: ["*"],
    },
  ],
};

export const filterNavItemsByRole = (items: any[], role: string): any[] => {
  return items
    .filter(
      (item) =>
        !item.roles || item.roles.includes("*") || item.roles.includes(role)
    )
    .map((item) => ({
      ...item,
      items: item.items ? filterNavItemsByRole(item.items, role) : undefined,
    }));
};
