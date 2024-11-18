"use client";
import React, {useEffect, useState} from "react";
import {HoveredLink, Menu, MenuItem, ProductItem} from "./navbar-menu";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import {useTheme} from "next-themes";
import {AnimatePresence, motion, useMotionValueEvent, useScroll,} from "framer-motion";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Input} from "@nextui-org/react";
import {SearchIcon} from "../../../ui/search-icon";
import {Album} from "@/types/album";
import {Service} from "@/types/service";
import {ServiceGetAllQuery} from "@/types/queries/service-query";
import {AlbumGetAllQuery} from "@/types/queries/album-query";
import {CategoryGetAllQuery} from "@/types/queries/product-query";
import {toSlug} from "@/lib/slug-helper";
import {albumService} from "@/services/album-service";
import {serviceService} from "@/services/service-service";
import {categoryService} from "@/services/category-service";
import {Category} from "@/types/category";

// Define the type for the images
type InstagramImage = {
    src: string;
    title: string;
    href: string;
    description: string;
};

export function NavbarHeader() {
    const {theme, setTheme} = useTheme();
    const [sticky, setSticky] = useState(true);
    const pathUrl = usePathname();

    return (
        <div className="text-neutral-500 font-medium dark:text-neutral-200">
            <div className="bg-neutral-600 text-white font-extralight dark:text-black">
                <div className="h-[40px] w-full flex justify-center">
                    {/* Content constrained to container */}
                    <div className="max-w-7xl w-full flex justify-between items-center flex-row mx-auto">
                        <div className="flex space-x-4">
                            <div>
                                <i className="fa-solid fa-phone"></i> 0908145344
                            </div>
                            <div>
                                <i className="fa-regular fa-envelope"></i> nhumystudio@gmail.com
                            </div>
                        </div>
                        <div className="flex space-x-4">Chat with me</div>
                        <div className="flex space-x-4 items-center">
                            <div>
                                <a href="">ABOUT NHUMY</a>
                            </div>
                            <div>|</div>
                            <div>
                                <a href="">Liên hệ</a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                aria-label="theme toggler"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white"
                            >
                <span>
                  <svg
                      viewBox="0 0 16 16"
                      className="hidden h-[22px] w-[22px] fill-current dark:block"
                  >
                    <path
                        d="M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z"/>
                  </svg>

                  <svg
                      viewBox="0 0 23 23"
                      className={`h-[30px] w-[30px] fill-current text-dark dark:hidden ${
                          !sticky && pathUrl === "/" && "text-white"
                      }`}
                  >
                    <g clipPath="url(#clip0_40_125)">
                      <path
                          d="M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z"/>
                    </g>
                  </svg>
                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b relative flex justify-center items-center">
                {/* Content constrained to max-w-7xl */}
                <div className="max-w-7xl w-full flex items-center justify-between mx-auto sm:px-52 px-5">
                    <div className="h-[73.84px]"></div>
                    <Navbar className="top-0 text-lg uppercase font-extralight"/>
                </div>
            </div>
        </div>
    );
}

function Navbar({className}: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const {data: session} = useSession();
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);
    const {theme} = useTheme();
    const logoSrc =
        theme === "dark" ? "/studio-dark-edit.png" : "/studio-light-edit.png";
    const {scrollYProgress} = useScroll();
    const [visible, setVisible] = useState(true);
    const [navbarDisplay, setNavbarDisplay] = useState("absolute");
    const [albums, setAlbums] = useState<Album[]>([]);
    const pathUrl = usePathname();

    const [services, setServices] = useState<Service[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const serviceGetAllQuery: ServiceGetAllQuery = {
        pageNumber: 1,
        pageSize: 10,
        sortOrder: 1,
        isActive: true,
        isPagination: true,
    };

    const albumGetAllQuery: AlbumGetAllQuery = {
        pageNumber: 1,
        pageSize: 8,
        sortOrder: 1,
        isPagination: true,
    };

    const categoryGetAllQuery: CategoryGetAllQuery = {
        isPagination: false,
    };

    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const loadAlbumsAndServices = async () => {
            try {
                const fetchedAlbums = await albumService.fetchAll(albumGetAllQuery);
                const albums = fetchedAlbums.data?.results;
                setAlbums(albums!);

                const fetchedServices = await serviceService.fetchAll(
                    serviceGetAllQuery
                );
                setServices(fetchedServices.data?.results!);

                const fetchedCategories = await categoryService.fetchAll(
                    categoryGetAllQuery
                );
                setCategories(fetchedCategories.data?.results!);
            } catch (error) {
                console.error("Failed to load albums and services:", error);
            }
        };

        loadAlbumsAndServices();
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                setVisible(false);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{

                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
                    className
                )}
            >
                <Menu setActive={setActive}>
                    <div>
                        <Link href="/">
                            <h1 className="m-auto birthstone-regular text-neutral-700 dark:text-neutral-200 text-5xl font-bold">
                                Nhu My Studio
                            </h1>
                            {/*<img src={logoSrc} width={"200"} height={""} alt="logo"/>*/}
                        </Link>
                    </div>
                    <div className="flex gap-5">
                        <MenuItem
                            href="/"
                            setActive={() => {
                            }}
                            active={null}
                            item="Home"
                        ></MenuItem>
                        <MenuItem
                            href={"/#first-section"}
                            setActive={setActive}
                            active={active}
                            item="Service"
                        >
                            <div className="flex flex-col space-y-4">
                                {services.map((service, index) => {
                                    const slug = toSlug(service.name || "");
                                    const path = slug;
                                    return (
                                        <HoveredLink key={index} href={`/service/${path}`}>
                                            {service.name}
                                        </HoveredLink>
                                    );
                                })}
                            </div>
                        </MenuItem>

                        <MenuItem
                            href="/albums"
                            setActive={setActive}
                            active={active}
                            item="Album"
                        >
                            {/* <div className="text-sm grid grid-cols-2 gap-10 p-4"> */}
                            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 ">
                                {albums.map((album, index) => {
                                    return (
                                        <ProductItem
                                            index={index}
                                            title={album.title as string}
                                            href={`/albums/${album.id}/photos`}
                                            src={album.background as string}
                                            description={album.description as string}
                                            hoveredIndex={hoveredIndex}
                                            setHoveredIndex={setHoveredIndex}
                                        />
                                    );
                                })}
                            </div>
                        </MenuItem>
                        <MenuItem
                            href="/products"
                            setActive={setActive}
                            active={active}
                            item="Product"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {categories.map((category, index) => {
                                    const path = `/products?categoryName=${category.name}`;
                                    return (
                                        <Link
                                            href={path}
                                            key={index}
                                            className="flex gap-1 flex-col"
                                        >
                                            <h3 className="font-bold mb-2">{category.name}</h3>
                                            {/* Tiêu đề thể loại */}
                                            {category.subCategories!.map((subCategory, subIndex) => (
                                                <HoveredLink
                                                    key={subIndex}
                                                    href={`${path}&subCategoryName=${subCategory.name}`} // Lấy thuộc tính name
                                                >
                                                    {subCategory.name} {/* Hiển thị tên subCategory */}
                                                </HoveredLink>
                                            ))}
                                        </Link>
                                    );
                                })}
                            </div>
                        </MenuItem>
                    </div>

                    <div>
                        <Input
                            classNames={{
                                base: "max-w-full sm:max-w-[10rem] h-10",
                                mainWrapper: "h-full",
                                input: "text-small",
                                inputWrapper:
                                    "h-full font-normal bg-default-400/20 dark:bg-default-500/20",
                            }}
                            color="default"
                            placeholder="Type to search..."
                            size="sm"
                            radius="none"
                            startContent={<SearchIcon size={18}/>}
                            type="search"
                        />
                    </div>
                </Menu>
            </motion.div>
        </AnimatePresence>
    );
}
