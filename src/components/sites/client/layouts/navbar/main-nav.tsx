import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";
import { Album } from "@/types/entities/album";
import { Category } from "@/types/entities/category";
import { Service } from "@/types/entities/service";
import { User } from "@/types/entities/user";
import Link from "next/link";
import * as React from "react";
import { ProductsCombobox } from "../../common/products-combobox";

import MenuAnimationLink from "@/components/_common/hovers/menu-animation-link";
import { TypographySmall } from "@/components/_common/typography/typography-small";
import { Const } from "@/lib/constants/const";
import Image from "next/image";
import { AuthDropdown } from "./auth-dropdown";
import { UserContext } from "@/types/models/user-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface MainNavProps {
  items?: MainNavItem[];
  user?: UserContext | null;
  categories: Category[];
  services: Service[];
  albums: Album[];
}

export function MainNav({
  items,
  user = null,
  categories = [],
  services = [],
  albums = [],
}: MainNavProps) {
  const isMobile = useIsMobile();
  const triggerClassName = "text-neutral-600 bg-transparent uppercase";
  return (
    <>
      <div className="hidden gap-6 lg:flex justify-between mx-auto w-full">
        <Link href="/" className="hidden items-center space-x-2 lg:flex">
          <Icons.logo aria-hidden="true" />
          {/* <span className="hidden font-bold lg:inline-block">NHU MY</span> */}
        </Link>
        <NavigationMenu viewport={isMobile}>
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(triggerClassName)}>
                Thông tin
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                        href="/"
                      >
                        <div className="mb-2 text-lg font-medium sm:mt-4">
                          Studio and Academic
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Chúng tôi cung cấp các dịch vụ studio chuyên nghiệp
                          cho sự kiện cưới, chụp ảnh và các dự án học thuật.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem
                    href={`${Const.SOCIAL_INSTAGRAM}`}
                    title="Instagram"
                  >
                    Theo dõi chúng tôi trên Instagram để cập nhật các bức ảnh
                    mới nhất và các sự kiện thú vị.
                  </ListItem>
                  <ListItem href={`${Const.SOCIAL_FACEBOOK}`} title="Facebook">
                    Kết nối với chúng tôi trên Facebook để nhận thông tin và sự
                    kiện hấp dẫn.
                  </ListItem>
                  <ListItem href={`${Const.SOCIAL_TIKTOK}`} title="Tiktok">
                    Xem các video thú vị của chúng tôi trên Tiktok, từ các buổi
                    chụp ảnh đến các dự án sáng tạo.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Categories Section */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(triggerClassName)}>
                Váy cưới
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-4 lg:w-[600px]">
                  {categories.map((category, index) => {
                    const path = `/products?categoryName=${category.name}`;
                    return (
                      <div key={index}>
                        <MenuAnimationLink
                          href={path}
                          className="block font-bold select-none p-3 pl-2 pb-1.5 space-y-1 rounded-md  leading-none no-underline outline-hidden transition-colors hover:bg-transparent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-neutral-500"
                        >
                          {category.name}
                        </MenuAnimationLink>
                        <Separator />
                        {category.subCategories?.map((subCategory) => (
                          <div key={subCategory.id}>
                            <ListItem
                              title={subCategory.name ?? "N/A"}
                              className=" text-neutral-500"
                              href={`${path}&subCategoryName=${subCategory.name}`}
                            ></ListItem>
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
              <NavigationMenuTrigger className={cn(triggerClassName)}>
                Dịch vụ
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 sm:w-[200px] md:w-[300px] sm:grid-cols-1">
                  {services.map((service) => (
                    <ListItem
                      key={service.id}
                      title={service.name ?? "N/A"}
                      href={`/services/${service.slug}`}
                    >
                      {/*{service.description}*/}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(triggerClassName)}>
                Albums
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 sm:w-[400px] md:w-[500px] sm:grid-cols-4 lg:w-[600px]">
                  {albums!.map((album) => {
                    const path = "/albums/" + album.slug;
                    return (
                      <Link href={path} key={album.slug}>
                        <div className="relative h-full isolate flex flex-col justify-end overflow-hidden rounded-none px-8 pb-8 pt-40">
                          <motion.div
                            className="absolute inset-0 w-full overflow-hidden"
                            whileHover={{ scale: 1.1 }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                          >
                            <Image
                              alt="image"
                              src={album.coverUrl ?? "/image-notfound.png"}
                              width={9999}
                              height={9999}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/5"></div>
                          </motion.div>

                          <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                            {album.title}
                          </h3>
                          <div className="z-10 bottom-8 truncate gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                            {album.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </ul>
                <div className={"w-full grid justify-end"}>
                  <Button variant="link">
                    {" "}
                    <Link href="/albums">...Xem thêm</Link>
                  </Button>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/blogs"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-neutral-500 bg-transparent uppercase"
                  )}
                >
                  Tin tức
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex items-center justify-end space-x-4 max-w-[255px]">
          {/* <ModeToggle /> */}
          <ProductsCombobox />
          {/* <CartSheet /> */}
          {/* <LocaleSwitcher /> */}
          <AuthDropdown user={user} />
        </div>
      </div>
    </>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          {children && (
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

ListItem.displayName = "ListItem";
