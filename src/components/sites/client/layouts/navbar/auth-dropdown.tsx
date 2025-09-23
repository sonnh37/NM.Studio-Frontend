import Link from "next/link";

import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";

import MenuAnimationButton from "@/components/_common/hovers/buttons/menu-animation-button/menu-animation-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, type ButtonProps } from "@/components/ui/button";
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

interface AuthDropdownProps
  extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger>,
    ButtonProps {
  user?: UserContext | null;
}

export function AuthDropdown({ user = null }: AuthDropdownProps) {
  if (user == null) {
    return (
      <Link href="/login" className="uppercase text-xs">
        <MenuAnimationButton>Đăng nhập</MenuAnimationButton>
      </Link>
    );
  }

  const initials = `${user.firstName?.charAt(0) ?? ""} ${
    user.lastName?.charAt(0) ?? ""
  }`;

  const handleLogout = () => {
    authService.logout().then((res) => {
      if (res.status == Status.OK) {
        window.location.href = "/";
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className={cn("size-8 rounded-full")}>
          <Avatar className="size-8">
            <AvatarImage src={user.avatar ?? ""} alt={user.username ?? ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Suspense
          fallback={
            <div className="flex flex-col space-y-1.5 p-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full rounded-sm" />
              ))}
            </div>
          }
        >
          <AuthDropdownGroup user={user} />
        </Suspense>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <div onClick={handleLogout}>
            <ExitIcon className="mr-2 size-4" aria-hidden="true" />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
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
