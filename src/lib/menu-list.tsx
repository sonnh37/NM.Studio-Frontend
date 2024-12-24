import {LayoutGrid, Settings, Users} from "lucide-react";
import React from "react";
import {Const} from "./const";
import {BiCategory} from "react-icons/bi";
import {MdOutlineCategory, MdOutlineColorLens} from "react-icons/md";
import {IoIosResize} from "react-icons/io";
import {IoAlbumsOutline} from "react-icons/io5";
import {GiClothes} from "react-icons/gi";
import {AiOutlinePicture} from "react-icons/ai";
import {GrServicePlay} from "react-icons/gr";
import {FaRegNewspaper} from "react-icons/fa";

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
                    active: pathname == "/dashboard",
                    icon: LayoutGrid, // Component type
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: "Tables",
            menus: [
                {
                    href: "",
                    label: "Albums",
                    active: pathname.includes(Const.DASHBOARD_ALBUM_URL),
                    icon: () => (
                        <IoAlbumsOutline className="text-neutral-700  dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
                        // <Image
                        //     src="/gallery.png"
                        //     width={500}
                        //     height={500}
                        //     alt="Gallery Icon"
                        //     className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                        // />
                    ),
                    submenus: [
                        {
                            href: Const.DASHBOARD_ALBUM_URL,
                            label: "All Albums",
                            active: pathname === Const.DASHBOARD_ALBUM_URL,
                        },
                        {
                            href: Const.DASHBOARD_ALBUM_NEW_URL,
                            label: "New Album",
                            active: pathname === Const.DASHBOARD_ALBUM_NEW_URL,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Products",
                    active: pathname.includes(Const.DASHBOARD_PRODUCT_URL),
                    icon: () => (
                        <GiClothes
                            color="white"
                            style={{fill: 'white', stroke: 'black', strokeWidth: 15}}
                            className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                        />

                        // <Image
                        //     src="/fashion-design.png"
                        //     width={500}
                        //     height={500}
                        //     alt="Picture of the author"
                        //     className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                        // />
                    ),
                    submenus: [
                        {
                            href: Const.DASHBOARD_PRODUCT_URL,
                            label: "All Products",
                            active: pathname === Const.DASHBOARD_PRODUCT_URL,
                        },
                        {
                            href: Const.DASHBOARD_PRODUCT_NEW_URL,
                            label: "New Product",
                            active: pathname === Const.DASHBOARD_PRODUCT_NEW_URL,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Photos",
                    active: pathname.includes(Const.DASHBOARD_PHOTO_URL),
                    icon: () => (
                        <AiOutlinePicture className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
                    ),
                    submenus: [
                        {
                            href: Const.DASHBOARD_PHOTO_URL,
                            label: "All Photos",
                            active: pathname === Const.DASHBOARD_PHOTO_URL,
                        },
                        {
                            href: Const.DASHBOARD_PHOTO_NEW_URL,
                            label: "New Photo",
                            active: pathname === Const.DASHBOARD_PHOTO_NEW_URL,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Services",
                    active: pathname.includes(Const.DASHBOARD_SERVICE_URL),
                    icon: () => (
                        <GrServicePlay className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
                    ),
                    submenus: [
                        {
                            href: Const.DASHBOARD_SERVICE_URL,
                            label: "All Services",
                            active: pathname === Const.DASHBOARD_SERVICE_URL,
                        },
                        {
                            href: Const.DASHBOARD_SERVICE_NEW_URL,
                            label: "New Service",
                            active: pathname === Const.DASHBOARD_SERVICE_NEW_URL,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Blogs",
                    active: pathname.includes(Const.DASHBOARD_BLOG_URL),
                    icon: () => (
                        <FaRegNewspaper className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
                    ),
                    submenus: [
                        {
                            href: Const.DASHBOARD_BLOG_URL,
                            label: "All Blogs",
                            active: pathname === Const.DASHBOARD_BLOG_URL,
                        },
                        {
                            href: Const.DASHBOARD_BLOG_NEW_URL,
                            label: "New Blog",
                            active: pathname === Const.DASHBOARD_BLOG_NEW_URL,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Categories",
                    active: pathname.includes(Const.DASHBOARD_CATEGORY_URL),
                    icon: () => (
                        <BiCategory className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
                    ),
                    submenus: [
                        {
                            href: Const.DASHBOARD_CATEGORY_URL,
                            label: "All Categories",
                            active: pathname === Const.DASHBOARD_CATEGORY_URL,
                        },
                        {
                            href: Const.DASHBOARD_CATEGORY_NEW_URL,
                            label: "New Category",
                            active: pathname === Const.DASHBOARD_CATEGORY_NEW_URL,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Sub Categories",
                    active: pathname.includes(Const.DASHBOARD_SUBCATEGORY_URL),
                    icon: () => (
                        <MdOutlineCategory className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
                    ),
                    submenus: [
                        {
                            href: Const.DASHBOARD_SUBCATEGORY_URL,
                            label: "All SubCategories",
                            active: pathname === Const.DASHBOARD_SUBCATEGORY_URL,
                        },
                        {
                            href: Const.DASHBOARD_SUBCATEGORY_NEW_URL,
                            label: "New SubCategory",
                            active: pathname === Const.DASHBOARD_SUBCATEGORY_NEW_URL,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Sizes",
                    active: pathname.includes(Const.DASHBOARD_SIZE_URL),
                    icon: () => (
                        <IoIosResize className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
                    ),
                    submenus: [
                        {
                            href: Const.DASHBOARD_SIZE_URL,
                            label: "All Sizes",
                            active: pathname === Const.DASHBOARD_SIZE_URL,
                        },
                        {
                            href: Const.DASHBOARD_SIZE_NEW_URL,
                            label: "New Size",
                            active: pathname === Const.DASHBOARD_SIZE_NEW_URL,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Colors",
                    active: pathname.includes(Const.DASHBOARD_COLOR_URL),
                    icon: () => (
                        <MdOutlineColorLens className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
                    ),
                    submenus: [
                        {
                            href: Const.DASHBOARD_COLOR_URL,
                            label: "All Colors",
                            active: pathname === Const.DASHBOARD_COLOR_URL,
                        },
                        {
                            href: Const.DASHBOARD_COLOR_NEW_URL,
                            label: "New Color",
                            active: pathname === Const.DASHBOARD_COLOR_NEW_URL,
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
                    href: "/dashboard/settings",
                    label: "Account",
                    active: pathname.includes("/dashboard/settings"),
                    icon: Settings, // Component type
                    submenus: [],
                },
            ],
        },
    ];
}
