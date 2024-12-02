"use client";

import * as React from "react";
import { useEffect } from "react";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";

interface MainNavProps {
  items?: MainNavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const pathUrl = usePathname();

  const [services, setServices] = React.useState<Service[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  const serviceGetAllQuery: ServiceGetAllQuery = {
    pageNumber: 1,
    pageSize: 10,
    sortOrder: 1,
    isDeleted: [false],
    isPagination: true,
    isNotNullSlug: true,
  };

  const albumGetAllQuery: AlbumGetAllQuery = {
    pageNumber: 1,
    pageSize: 8,
    sortOrder: 1,
    isDeleted: [false],
    isPagination: true,
    isNotNullSlug: true,
  };

  const categoryGetAllQuery: CategoryGetAllQuery = {
    isPagination: false,
    isDeleted: [false],
  };

  useEffect(() => {
    const loadAlbumsAndServices = async () => {
      try {
        const fetchedAlbums = await albumService.fetchAll(albumGetAllQuery);
        const albums = fetchedAlbums.data?.results;
        setAlbums(albums ?? []);

        const fetchedServices = await serviceService.fetchAll(
          serviceGetAllQuery
        );
        const services = fetchedServices.data?.results;
        setServices(services ?? []);

        const fetchedCategories = await categoryService.fetchAll(
          categoryGetAllQuery
        );
        setCategories(fetchedCategories.data?.results ?? []);
      } catch (error) {
        console.error("Failed to load albums and services:", error);
      }
    };

    loadAlbumsAndServices();
  }, []);
  return (
    <div className="hidden gap-6 lg:flex">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <Icons.logo aria-hidden="true" />
        {/* <span className="hidden font-bold lg:inline-block">NHU MY</span> */}
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-neutral-500">
              Thông tin
            </NavigationMenuTrigger>
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
                <ListItem
                  href="https://www.instagram.com/nhumystudio/"
                  title="Instagram"
                >
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem
                  href="https://www.facebook.com/NhuMyMakeUp"
                  title="Facebook"
                >
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem
                  href="https://www.tiktok.com/@nhumystudio?lang=vi-VN"
                  title="Tiktok"
                >
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-neutral-500">
              Dịch vụ
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-1 p-4 md:w-[200px] md:grid-cols-1 ">
                {services.map((service) => (
                  <div key={service.id}>
                    <ListItem
                      key={service.id}
                      title={service.name}
                      className="p-2 text-neutral-500 hover:bg-transparent"
                      href={`/services/${service.slug}`}
                    >
                      {/*{service.description}*/}
                    </ListItem>
                    <hr className="border-t border-neutral-300 my-1" />{" "}
                  </div>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-neutral-500">
              Albums
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {albums.map((album) => (
                  <ListItem
                    key={album.id}
                    title={album.title}
                    href={`/albums/${album.slug}`}
                  >
                    {album.description}
                  </ListItem>
                ))}
              </ul>
              <div className={"w-full grid justify-end"}>
                <Button variant="link">
                  {" "}
                  <Link href="/albums">...Xem thêm</Link>
                </Button>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Categories Section */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-neutral-500">
              Trang phục cưới
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-4 lg:w-[600px] max-h-[480px] overflow-y-auto">
                {categories.map((category, index) => {
                  const path = `/products?categoryName=${category.name}`;
                  return (
                    <div key={index}>
                      <Link
                        href={path}
                        className="block font-bold select-none space-y-1 rounded-md p-3 pl-2 leading-none no-underline outline-none transition-colors hover:bg-transparent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-neutral-500"
                      >
                        {category.name}
                      </Link>
                      {category.subCategories!.map((subCategory, subIndex) => (
                        <div key={subCategory.id}>
                          <ListItem
                            title={subCategory.name}
                            className="p-2 text-neutral-500 text-sm hover:bg-transparent"
                            href={`${path}&subCategoryName=${subCategory.name}`}
                          ></ListItem>
                          <hr className="border-t border-neutral-300 my-1" />{" "}
                          {/* Thanh line mỏng */}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </ul>

              <div className={"w-full grid justify-end"}>
                <Button variant="link">
                  {" "}
                  <Link href="/products">...Xem thêm</Link>
                </Button>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/blogs" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "text-neutral-500")}
              >
                Tin tức
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
          {title}
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
