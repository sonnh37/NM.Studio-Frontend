import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";
import { Album } from "@/types/album";
import { Category } from "@/types/category";
import { Service } from "@/types/service";
import { User } from "@/types/user";
import Link from "next/link";
import * as React from "react";
import { CartSheet } from "../../common/cart-sheet";
import { ProductsCombobox } from "../../common/products-combobox";

import { ModeToggle } from "./mode-toggle";
import { AuthDropdown } from "./auth-dropdown";
import { Const } from "@/lib/const";

interface MainNavProps {
  items?: MainNavItem[];
  user?: User | null;
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
  return (
    <>
      <div className="hidden gap-6 lg:flex justify-between mx-auto w-full">
        <Link href="/" className="hidden items-center space-x-2 lg:flex">
          <Icons.logo aria-hidden="true" />
          {/* <span className="hidden font-bold lg:inline-block">NHU MY</span> */}
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-neutral-500 bg-transparent uppercase">
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
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-neutral-500 bg-transparent uppercase">
                Dịch vụ
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-1 p-4 md:w-[200px] md:grid-cols-1 ">
                  {services.map((service) => (
                    <div key={service.id}>
                      <ListItem
                        key={service.id}
                        title={service.name ?? "N/A"}
                        className="p-2 text-neutral-500 "
                        href={`/services/${service.slug}`}
                      >
                        {/*{service.description}*/}
                      </ListItem>
                    </div>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-neutral-500 bg-transparent uppercase">
                Albums
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {albums.map((album) => (
                    <ListItem
                      key={album.id}
                      title={album.title ?? "N/A"}
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
              <NavigationMenuTrigger className="text-neutral-500 bg-transparent uppercase">
                Váy cưới
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
                        {category.subCategories!.map(
                          (subCategory, subIndex) => (
                            <div key={subCategory.id}>
                              <ListItem
                                title={subCategory.name ?? "N/A"}
                                className="p-2 text-neutral-500 text-sm"
                                href={`${path}&subCategoryName=${subCategory.name}`}
                              ></ListItem>
                              {/* <hr className="border-t border-neutral-300 my-1" />{" "} */}
                              {/* Thanh line mỏng */}
                            </div>
                          )
                        )}
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
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-neutral-500 bg-transparent uppercase"
                  )}
                >
                  Tin tức
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <nav className="hidden lg:flex items-center justify-end space-x-4 w-[255px] max-w-[255px]">
          {/* <ModeToggle /> */}
          <ProductsCombobox />
          {/* <CartSheet /> */}
          {/* <LocaleSwitcher /> */}
          <AuthDropdown user={user} />
        </nav>
      </div>
    </>
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

const ListItemV2 = React.forwardRef<
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <p className="text-lg group relative w-max">
            <span className="px-1 relative z-10 ">{title}</span>
            <span className="absolute left-0 bottom-0 w-full h-[0.25px] bg-neutral-300 transition-transform duration-300 scale-x-0 origin-left group-hover:scale-x-100 z-0 group-hover:bg-neutral-300 group-hover:h-full"></span>
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItemV2.displayName = "ListItemV2";
