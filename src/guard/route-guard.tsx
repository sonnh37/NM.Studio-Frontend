"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { userContextHelper } from "@/lib/helpers/user-context-helper";
import { Role } from "@/types/entities/user";
import { tokenHelper } from "@/lib/helpers/token-helper";
import { userService } from "@/services/user-serice";
import { Status } from "@/types/models/business-result";

type RouterGuardProps = {
  children: ReactNode;
  matcher?: string[]; // routes cần guard
  redirect?: string; // path redirect khi fail
};

export function RouterGuard({
  children,
  matcher = [],
  redirect = "/login",
}: RouterGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [allowAccess, setAllowAccess] = useState(true);

  const matchPath = (path: string, patterns: string[]) => {
    if (patterns.length === 0) return true;

    return patterns.some((pattern) => {
      if (pattern.endsWith("/*")) {
        const base = pattern.slice(0, -2);
        return path === base || path.startsWith(base + "/");
      }
      return path === pattern;
    });
  };
  useEffect(() => {
    let mounted = true;
    const check = async () => {
      if (!pathname) return;

      const isMatch = matchPath(pathname, matcher);

      let user = userContextHelper.get();

      if (!user && tokenHelper.get()) {
        const resUser = await userService.getUserByContext();
        if (resUser.status == Status.OK && resUser.data) {
          userContextHelper.save(resUser.data);
          user = userContextHelper.get();
        }
      }

      const isLoggedIn = !!user;

      // xử lí trường hợp match từ pathname và chưa đăng nhập
      if (isMatch && !isLoggedIn) {
        if (!mounted) return;
        setAuthorized(false);
        router.push(redirect);
        return;
      }

      // xử lí trường hợp ko match từ pathname và đã đăng nhập
      if (!isMatch && isLoggedIn) {
        if (!mounted) return;
        setAuthorized(true);

        // xử lí ngược lại, ví dụ người dùng đã đăng nhập nhưng truy cập vào trang login
        if (pathname === redirect) {
          if (!mounted) return;
          setAuthorized(false);
          if (user?.role == Role.Customer) {
            router.push("/");
            return;
          }

          router.push("/dashboard");
          return;
        }
        return;
      }

      // xử lí ko rơi vào 2 trường hợp trên
      if (!mounted) return;
      setAuthorized(true);
    };

    check();

    return () => {
      mounted = false;
    };
  }, [pathname, matcher, redirect, router]);

  return <>{authorized && children}</>;
}
