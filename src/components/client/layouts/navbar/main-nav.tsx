"use client";

import * as React from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icons } from "@/components/ui/icons";
import { MainNavItem } from "@/types";
import { albumService } from "@/services/album-service";
import { categoryService } from "@/services/category-service";
import { serviceService } from "@/services/service-service";
import { Album } from "@/types/album";
import { Category } from "@/types/category";
import { AlbumGetAllQuery } from "@/types/queries/album-query";
import { CategoryGetAllQuery } from "@/types/queries/product-query";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { Service } from "@/types/service";
import { usePathname } from "next/navigation";

interface MainNavProps {
  items?: MainNavItem[];
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function MainNav({ items }: MainNavProps) {
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const pathUrl = usePathname();

  const [services, setServices] = React.useState<Service[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

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

  React.useEffect(() => {
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
  return (
    <div className="hidden gap-6 lg:flex">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <Icons.logo className="size-7" aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block">NHU MY</span>
        <span className="sr-only">Home</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Info</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Icons.logo className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Studio and Academic
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="https://www.instagram.com/nhumystudio/" title="Instagram">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="https://www.facebook.com/NhuMyMakeUp" title="Facebook">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="https://www.tiktok.com/@nhumystudio?lang=vi-VN" title="Tiktok">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {services.map((service) => (
                  <ListItem
                    key={service.id}
                    title={service.name}
                    href={`/services/${service.id}`}
                  >
                    {service.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Albums</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {albums.map((album) => (
                  <ListItem
                    key={album.id}
                    title={album.title}
                    href={`/albums/${album.id}/photos`}
                  >
                    {album.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Categories Section */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-4 lg:w-[600px]">
                {categories.map((category, index) => {
                  const path = `/products?categoryName=${category.name}`;
                  return (
                    <div key={index}>
                      <Link href={path} className="font-bold block select-none space-y-1 rounded-md p-3 pl-1 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">{category.name}</Link>
                      {category.subCategories.map((subCategory, subIndex) => (
                        <ListItem
                          key={subCategory.id}
                          className="p-1"
                          href={`${path}&subCategoryName=${subCategory.name}`}
                        >
                          {subCategory.name}
                        </ListItem>
                      ))}
                    </div>
                  );
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/blogs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                V-Blog
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {title && ( // Kiểm tra có title không
            <div className="text-sm font-medium leading-none">{title}</div>
          )}
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
