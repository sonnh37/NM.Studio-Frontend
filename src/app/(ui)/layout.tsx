"use client";
import {
  initializeCache,
  updateUserCache,
  UserCache,
} from "@/lib/redux/slices/cacheSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useTheme } from "next-themes";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const dispatch = useDispatch<AppDispatch>();
  // const user = useSelector((state: RootState) => state.user?.user);
  // const router = useRouter();
  // const { setTheme } = useTheme();
  // const [initialized, setInitialized] = React.useState(false);

  // useEffect(() => {
  //   if (initialized || typeof window === "undefined") return;
  //   if (!user) {
  //     router.replace("/login");
  //     return;
  //   }

  //   // Xử lý khởi tạo
  //   if (localStorage.getItem("showToast") === "true") {
  //     toast.success(`${user.firstName} ơi, hôm nay có dự định gì nào?`);
  //     localStorage.removeItem("showToast");
  //   }

  //   if (user.cache) {
  //     const cache = JSON.parse(user.cache) as UserCache;
  //     setTheme(cache.theme ?? "light");
  //     dispatch(initializeCache(user.cache));
  //   } else {
  //     const roleCurrent = user.role?.toString();
  //     if (roleCurrent) {
  //       setTheme("light");
  //       dispatch(
  //         updateUserCache({
  //           role: roleCurrent,
  //           theme: "light",
  //         })
  //       );
  //     }
  //   }
  //   setInitialized(true);
  // }, [user, dispatch, router, setTheme, initialized]);

  // if (!user) {
  //   return null;
  // }

  return <>{children}</>;
}
