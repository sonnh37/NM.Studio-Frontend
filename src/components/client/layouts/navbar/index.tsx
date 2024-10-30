"use client";
import React, {useEffect, useState} from "react";
import {HoveredLink, Menu, MenuItem, ProductItem} from "./navbar-menu";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import {useTheme} from "next-themes";
import {AnimatePresence, motion, useMotionValueEvent, useScroll} from "framer-motion";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Input} from "@nextui-org/react";
import {SearchIcon} from "../../../ui/search-icon";
import {Album} from "@/types/album";
import {Service} from "@/types/service";
import {ServiceGetAllQuery} from "@/types/queries/service-query";
import {AlbumGetAllQuery} from "@/types/queries/album-query";
import {CategoryGetAllQuery} from "@/types/queries/outfit-query";
import {toSlug} from "@/lib/slug-helper";
import { albumService } from "@/services/album-service";
import { serviceService } from "@/services/service-service";
import { categoryService } from "@/services/category-service";
import { Category } from "@/types/category";

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
        <div className="text-[#1F2937CC] dark:text-white-100">
            <div
                className="border-b-[1px] h-[40px] relative flex justify-between items-center flex-row overflow-hidden sm:px-52 px-5 ">
                <div className="flex space-x-4 flex-row">
                    <div>
                        <i className="fa-solid fa-phone"></i> 0908145344
                    </div>
                    <div>
                        <i className="fa-regular fa-envelope"></i> nhumystudio@gmail.com
                    </div>
                </div>
                <div className="flex space-x-4 flex-row">Chat with me</div>
                <div className="flex space-x-4 justify-between items-center flex-row">
                    <div>
                        <a href="">ABOUT NHUMY</a>
                    </div>
                    <div>|</div>
                    <div>
                        <a href="">Liên hệ</a>
                    </div>
                </div>
                <div className="space-x-4 flex flex-row justify-between items-center">
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[10rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal bg-default-400/20 dark:bg-default-500/20",
                        }}
                        color="default"
                        placeholder="Type to search..."
                        size="sm"
                        radius="none"
                        startContent={<SearchIcon size={18}/>}
                        type="search"
                    />
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
                  className={`h-[30px] w-[30px] fill-current text-dark dark:hidden ${!sticky && pathUrl === "/" && "text-white"}`}
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
            <div className="border-b-1 relative flex justify-between items-center flex-row sm:px-52 px-5">
                <div className="h-[73.84px]"></div>
                <Navbar className="top-0 "/>
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
    const logoSrc = theme === "dark" ? "/studio-dark-edit.png" : "/studio-light-edit.png";
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
        isPagination: true
    };

    const albumGetAllQuery: AlbumGetAllQuery = {
        pageNumber: 1,
        pageSize: 5,
        sortOrder: 1,
        isPagination: true
    };

    const categoryGetAllQuery: CategoryGetAllQuery = {
        isPagination: false
    };

    useEffect(() => {
        const loadAlbumsAndServices = async () => {
            try {
                const fetchedAlbums = await albumService.getAll(albumGetAllQuery);
                const albums = fetchedAlbums.data?.results;
                setAlbums(albums!);

                const fetchedServices = await serviceService.getAll(serviceGetAllQuery);
                setServices(fetchedServices.data?.results!);

                const fetchedCategories = await categoryService.getAll(categoryGetAllQuery);
                setCategories(fetchedCategories.data?.results!);

            } catch (error) {
                console.error('Failed to load albums and services:', error);
            }
        };

        loadAlbumsAndServices();
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (pathUrl === "/" && typeof current === "number") {
            if (scrollYProgress.get() < 0.1) {
                setVisible(true);
                setNavbarDisplay("absolute");
            } else {
                if (scrollYProgress.getPrevious()! > scrollYProgress.get()) {
                    setVisible(true);
                    setNavbarDisplay("fixed");
                } else {
                    setVisible(false);
                }
            }
        } else {
            setVisible(true);
            setNavbarDisplay("absolute");
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    display: navbarDisplay,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                    display: navbarDisplay,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(`${navbarDisplay} top-14 inset-x-0 w-full mx-auto z-50`, className)}
            >
                <Menu setActive={setActive}>
                    <MenuItem href="/" setActive={setActive} active={null} item="Home"></MenuItem>
                    <MenuItem href={"/#first-section"} setActive={setActive} active={active} item="Service">
                        <div className="flex flex-col space-y-4 text-sm">
                            {services.map((service, index) => {
                                const slug = toSlug(service.name || '');
                                const path = slug;
                                return (
                                    <HoveredLink key={index} href={`/service/${path}`}>
                                        {service.name}
                                    </HoveredLink>
                                );
                            })}

                        </div>
                    </MenuItem>
                    <Link href="/">
                        <h1 className="font-greatvibes text-4xl">
                            Nhu My
                        </h1>
                        {/*<img src={logoSrc} width={"200"} height={""} alt="logo"/>*/}
                    </Link>
                    <MenuItem href="/album" setActive={setActive} active={active} item="Album">
                        <div className="text-sm grid grid-cols-2 gap-10 p-4">
                            {albums.map((album, index) => {
                                const slug = toSlug(album.title || '');
                                const path = slug;
                                return (
                                    <ProductItem
                                        key={index}
                                        title={album.title as string}
                                        href={`/album/${path}`}
                                        src={album.background as string}
                                        description={album.description as string}
                                    />
                                )
                            })}
                        </div>
                    </MenuItem>
                    <MenuItem href="/outfit" setActive={setActive} active={active} item="Outfit">
                        <div className="flex flex-col space-y-4 text-sm">
                            {categories.map((category, index) => {
                                const slug = toSlug(category.name || '');
                                const path = `/outfit/${slug}`;
                                return (
                                    <HoveredLink key={index} href={path}>{category.name}</HoveredLink>
                                );
                            })}
                        </div>
                    </MenuItem>
                </Menu>
            </motion.div>
        </AnimatePresence>
    );
}
