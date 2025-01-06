import {Icons} from "@/components/_common/icons";

export interface NavItem {
    title: string;
    url: string;
    disabled?: boolean;
    external?: boolean;
    shortcut?: [string, string];
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
    isActive?: boolean;
    items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[];
}

export interface FooterItem {
    title: string;
    items: {
        title: string;
        href: string;
        external?: boolean;
    }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export const navItems: NavItem[] = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: "dashboard",
        isActive: false,
        shortcut: ["d", "d"],
        items: [], // Empty array as there are no child items for Dashboard
    },
    {
        title: "Tables",
        url: "#",
        isActive: false,
        items: [
            {
                title: "Albums",
                url: "/dashboard/albums",
            },
            {
                title: "Products",
                url: "/dashboard/products",
            },
            {
                title: "Photos",
                url: "/dashboard/photos",
            },
            {
                title: "Services",
                url: "/dashboard/services",
            },
            {
                title: "Blogs",
                url: "/dashboard/blogs",
            },
            {
                title: "Categories",
                url: "/dashboard/categories",
            },
            {
                title: "Sub Categories",
                url: "/dashboard/subcategories",
            },
            {
                title: "Sizes",
                url: "/dashboard/sizes",
            },
            {
                title: "Colors",
                url: "/dashboard/colors",
            },
        ],
    },
    {
        title: "Account",
        url: "#", // Placeholder as there is no direct link for the parent
        icon: "billing",
        isActive: true,
        items: [
            {
                title: "Profile",
                url: "/dashboard/profile",
                icon: "userPen",
                shortcut: ["m", "m"],
            },
        ],
    },
];
