import {
  Bell,
  BookImage,
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
  LibraryBig,
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
  User2,
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
      icon: BookImage,
      roles: ["*"],
    },
    {
      title: "Blogs",
      url: "/dashboard/blogs",
      icon: LibraryBig,
      roles: ["*"],
    },
    {
      title: "Services",
      url: "/dashboard/services",
      icon: CalendarCheck,
      roles: ["*"],
    },
    {
      title: "Service Bookings",
      url: "/dashboard/service-bookings",
      icon: CalendarCheck,
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
      title: "Categories",
      url: "/dashboard/categories",
      icon: Command,
      roles: ["*"],
    },
    {
      title: "Sub-Categories",
      url: "/dashboard/sub-categories",
      icon: Command,
      roles: ["*"],
    },
    {
      title: "Reviews",
      url: "/dashboard/reviews",
      disable: true,
      icon: MdOutlineRateReview,
      roles: ["*"],
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: FileCheck,
      disable: true,
      roles: ["*"],
    },
    {
      title: "Vouchers",
      url: "/dashboard/vouchers",
      icon: StickyNote,
      disable: true,
      roles: ["*"],
    },
    {
      title: "Media Files",
      url: "/dashboard/media-files",
      icon: ProjectorIcon,
      roles: ["*"],
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: User2,
      roles: ["Admin"],
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
