"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { userContextHelper } from "@/lib/helpers/user-context-helper";
import { Role } from "@/types/entities/user";

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
    if (!pathname) return;

    const isMatch = matchPath(pathname, matcher);

    const user = userContextHelper.get();
    const isLoggedIn = !!user;

    // xử lí trường hợp match từ pathname và chưa đăng nhập
    if (isMatch && !isLoggedIn) {
      setAuthorized(false);
      router.push(redirect);
      return;
    }

    // xử lí trường hợp ko match từ pathname và đã đăng nhập
    if (!isMatch && isLoggedIn) {
      setAuthorized(true);

      // xử lí ngược lại, ví dụ người dùng đã đăng nhập nhưng truy cập vào trang login
      if (pathname === redirect) {
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
    setAuthorized(true);
  }, [pathname, matcher, redirect, router]);

  return <>{authorized && children}</>;
}
