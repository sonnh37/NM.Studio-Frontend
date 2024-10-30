import {LayoutGrid, Settings, Users} from "lucide-react";
import Image from "next/image";
import React from "react";
import {FcServices, FcStackOfPhotos} from "react-icons/fc";
import {Constant} from "./const";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: React.ElementType; // React component type
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    active: pathname.includes("/dashboard"),
                    icon: LayoutGrid, // Component type
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: "Contents",
            menus: [
                {
                    href: "",
                    label: "Albums",
                    active: pathname.includes(Constant.DASHBOARD_ALBUM_URL),
                    icon: () => (
                        <Image
                            src="/gallery.png"
                            width={500}
                            height={500}
                            alt="Gallery Icon"
                            className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                        />
                    ),
                    submenus: [
                        {
                            href: Constant.DASHBOARD_ALBUM_URL,
                            label: "All Albums",
                            active: pathname === Constant.DASHBOARD_ALBUM_URL,
                        },
                        {
                            href: Constant.DASHBOARD_ALBUM_NEW_URL,
                            label: "New Album",
                            active: pathname === Constant.DASHBOARD_ALBUM_NEW_URL,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Outfits",
                    active: pathname.includes(Constant.DASHBOARD_OUTFIT_URL),
                    icon: () => (
                        <Image
                            src="/fashion-design.png"
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                        />
                    ),
                    submenus: [
                        {
                            href: Constant.DASHBOARD_OUTFIT_URL,
                            label: "All Outfits",
                            active: pathname === Constant.DASHBOARD_OUTFIT_URL,
                        },
                        {
                            href: Constant.DASHBOARD_OUTFIT_NEW_URL,
                            label: "New Outfit",
                            active: pathname === Constant.DASHBOARD_OUTFIT_NEW_URL,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Photos",
                    active: pathname.includes(Constant.DASHBOARD_PHOTO_URL),
                    icon: () => (
                        <FcStackOfPhotos className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
                    ),
                    submenus: [
                        {
                            href: Constant.DASHBOARD_PHOTO_URL,
                            label: "All Photos",
                            active: pathname === Constant.DASHBOARD_PHOTO_URL,
                        },
                        {
                            href: Constant.DASHBOARD_PHOTO_NEW_URL,
                            label: "New Photo",
                            active: pathname === Constant.DASHBOARD_PHOTO_NEW_URL,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Services",
                    active: pathname.includes(Constant.DASHBOARD_SERVICE_URL),
                    icon: () => (
                        <FcServices className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
                    ),
                    submenus: [
                        {
                            href: Constant.DASHBOARD_SERVICE_URL,
                            label: "All Services",
                            active: pathname === Constant.DASHBOARD_SERVICE_URL,
                        },
                        {
                            href: Constant.DASHBOARD_SERVICE_NEW_URL,
                            label: "New Service",
                            active: pathname === Constant.DASHBOARD_SERVICE_NEW_URL,
                        },
                    ],
                },
            ],
        },
        {
            groupLabel: "Settings",
            menus: [
                {
                    href: "/users",
                    label: "Users",
                    active: pathname.includes("/users"),
                    icon: Users, // Component type
                    submenus: [],
                },
                {
                    href: "/account",
                    label: "Account",
                    active: pathname.includes("/account"),
                    icon: Settings, // Component type
                    submenus: [],
                },
            ],
        },
    ];
}
