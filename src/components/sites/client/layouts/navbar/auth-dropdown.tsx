import Link from "next/link";

import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Role, User } from "@/types/entities/user";
import { Suspense } from "react";
import { userService } from "@/services/user-serice";
import { authService } from "@/services/auth-service";
import { UserContext } from "@/types/models/user-context";
import { Status } from "@/types/models/business-result";
import { useRouter } from "next/navigation";
import { userContextHelper } from "@/lib/utils/user-context-helper";
import { MenuAnimationButton } from "@/components/_common/hovers/buttons/menu-animation-button/menu-animation-button";
import { motion } from "framer-motion";

interface AuthDropdownProps
  extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger> {
  user?: UserContext | null;
}

export function AuthDropdown({ user = null }: AuthDropdownProps) {
  const router = useRouter();
  if (user == null) {
    return (
      // <Link href="/login" className="uppercase text-xs">
      //   <MenuAnimationButton>Đăng nhập</MenuAnimationButton>
      // </Link>
      <></>
    );
  }

  const initials = `${user.firstName?.toUpperCase().charAt(0) ?? ""} ${
    user.lastName?.toUpperCase().charAt(0) ?? ""
  }`;

  const handleLogout = () => {
    authService.logout().then((res) => {
      if (res.status == Status.OK) {
        router.refresh();
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Avatar className="h-8 w-8 hover:opacity-90 transition-opacity cursor-pointer border border-gray-200">
            <AvatarImage
              src={user.avatarUrl ?? ""}
              alt={user.username ?? "User"}
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-light">
              {initials}
            </AvatarFallback>
          </Avatar>
        </motion.div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 bg-white border border-gray-200 shadow-lg p-0"
        align="end"
        forceMount
      >
        {/* User Info Header */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 border border-gray-200">
              <AvatarImage
                src={user.avatarUrl ?? ""}
                alt={user.username ?? "User"}
                className="object-cover"
              />
              <AvatarFallback className="bg-gray-100 text-gray-600">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-light text-gray-900 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate mt-0.5">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Auth Menu Items */}
        <Suspense
          fallback={
            <div className="px-2 py-2">
              <div className="space-y-1.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 bg-gray-100 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          }
        >
          <div className="px-2 py-2">
            <AuthDropdownGroup user={user} />
          </div>
        </Suspense>

        {/* Separator */}
        <div className="h-px bg-gray-100 my-1"></div>

        {/* Logout */}
        <DropdownMenuItem
          className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 cursor-pointer transition-colors"
          onClick={handleLogout}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <ExitIcon className="h-3.5 w-3.5 mr-2.5 text-gray-400" />
              <span className="tracking-wide">Đăng xuất</span>
            </div>
            <span className="text-xs text-gray-400 font-light">⌘Q</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface AuthDropdownGroupProps {
  user?: UserContext | null;
}

function AuthDropdownGroup({ user }: AuthDropdownGroupProps) {
  return (
    <DropdownMenuGroup>
      {user?.role !== Role.Customer ? (
        <>
          <DropdownMenuItem asChild>
            <Link href={"/dashboard"}>
              <DashboardIcon className="mr-2 size-4" aria-hidden="true" />
              Dashboard
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              <GearIcon className="mr-2 size-4" aria-hidden="true" />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </>
      ) : (
        <>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <GearIcon className="mr-2 size-4" aria-hidden="true" />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </>
      )}

      {/* <DropdownMenuItem asChild>
        <Link href="/dashboard/billing">
          <Icons.credit className="mr-2 size-4" aria-hidden="true" />
          Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem> */}
    </DropdownMenuGroup>
  );
}
