"use client";
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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { authService } from "@/services/auth-service";
import { User } from "@/types/entities/user";
import { Suspense } from "react";
import { useTheme } from "next-themes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { resetCache } from "@/lib/redux/slices/cacheSlice";
import { Status } from "@/types/models/business-result";
import { UserContext } from "@/types/models/user-context";
import { useRouter } from "next/navigation";

interface AuthDropdownProps
  extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger> {
  user?: UserContext | null;
}

export function AuthDropdown({ user = null }: AuthDropdownProps) {
  const { setTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  if (user == null) {
    return (
      <Link href="/login" className="uppercase text-xs">
        <Button className="bg-transparent text-orange-100">Đăng nhập</Button>
      </Link>
    );
  }

  const initials = `${user.firstName?.toUpperCase().charAt(0) ?? ""}${
    user.lastName?.toUpperCase().charAt(0) ?? ""
  }`;

  const handleLogout = () => {
    authService.logout().then((res) => {
      if (res.status == Status.OK) {
        setTheme("light");
        dispatch(resetCache());
        router.push("/");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="p-0 border rounded-full relative overflow-hidden focus-visible:ring-0"
        >
          <Avatar className="h-full w-full">
            <AvatarImage
              src={user.avatarUrl?.trim() || undefined}
              alt={user.username || "User avatar"}
              className="object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.src = "";
                target.style.display = "none";
              }}
            />
            <AvatarFallback
              className="h-full w-full flex items-center justify-center bg-muted text-sm font-medium"
              delayMs={600}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-50" align="end" forceMount>
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
            Đăng xuất
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
      {user ? (
        <>
          <DropdownMenuItem asChild>
            <Link href={"/"}>
              <DashboardIcon className="mr-2 size-4" aria-hidden="true" />
              Trang chủ
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <GearIcon className="mr-2 size-4" aria-hidden="true" />
              Cài đặt
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </>
      ) : (
        <>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <GearIcon className="mr-2 size-4" aria-hidden="true" />
              Cài đặt
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
