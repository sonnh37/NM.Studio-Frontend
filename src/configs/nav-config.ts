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
      title: "Tìm kiếm",
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
      title: "Cài đặt",
      url: "/dashboard/settings",
      icon: Settings,
      roles: ["*"],
    },
  ],

  management: [
    {
      title: "Album",
      url: "/dashboard/albums",
      icon: BookImage,
      roles: ["*"],
    },
    {
      title: "Bài viết",
      url: "/dashboard/blogs",
      icon: LibraryBig,
      roles: ["*"],
    },
    {
      title: "Dịch vụ",
      url: "/dashboard/services",
      icon: CalendarCheck,
      roles: ["*"],
    },
    {
      title: "Lịch đặt dịch vụ",
      url: "/dashboard/service-bookings",
      icon: CalendarCheck,
      roles: ["*"],
    },
    {
      title: "Đơn hàng",
      url: "/dashboard/orders",
      disable: true,
      icon: ListChecks,
      roles: ["*"],
    },
    {
      title: "Sản phẩm",
      url: "/dashboard/products",
      icon: Briefcase,
      roles: ["*"],
    },
    {
      title: "Danh mục",
      url: "/dashboard/categories",
      icon: Command,
      roles: ["*"],
    },
    {
      title: "Danh mục con",
      url: "/dashboard/sub-categories",
      icon: Command,
      roles: ["*"],
    },
    {
      title: "Đánh giá",
      url: "/dashboard/reviews",
      disable: true,
      icon: MdOutlineRateReview,
      roles: ["*"],
    },
    {
      title: "Thanh toán",
      url: "/dashboard/payments",
      icon: FileCheck,
      disable: true,
      roles: ["*"],
    },
    {
      title: "Voucher",
      url: "/dashboard/vouchers",
      icon: StickyNote,
      disable: true,
      roles: ["*"],
    },
    {
      title: "Tệp Media",
      url: "/dashboard/media-files",
      icon: ProjectorIcon,
      roles: ["*"],
    },
    {
      title: "Người dùng",
      url: "/dashboard/users",
      icon: User2,
      disable: true,
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
