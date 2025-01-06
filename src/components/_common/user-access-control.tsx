"use client";

import { LoadingPageComponent } from "@/components/_common/loading-page";
import axiosInstance from "@/lib/interceptors/axios-instance";
import { logout, setUser } from "@/lib/redux/slices/userSlice";
import store from "@/lib/redux/store";

import { BusinessResult } from "@/types/response/business-result";
import { Role, User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ErrorSystem from "./errors/error-system";
import axios from "axios";

interface UserAccessControlProps {
  children: React.ReactNode;
}

export const UserAccessControl: React.FC<UserAccessControlProps> = ({
  children,
}) => {
  const router = useRouter();
  const pathName = usePathname();

  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: () =>
      axios
        .get<BusinessResult<User>>(
          `${process.env.NEXT_PUBLIC_API_BASE}/users/info`, {withCredentials: true}
        )
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingPageComponent />;
  }

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  if (result?.status === 1) {
    const user = result.data!;
    // Check if the user has the correct role to access the page
    store.dispatch(setUser(user));
    if (pathName.startsWith("/login")) {
      if (user.role === Role.Customer) {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    }

    if (pathName.startsWith("/dashboard")) {
      if (user.role === Role.Customer) {
        router.push("/");
      }
    }
  } else {
    store.dispatch(logout());

    if (pathName.startsWith("/dashboard")) {
      router.push("/login");
    }
  }

  return <>{children}</>;
};
