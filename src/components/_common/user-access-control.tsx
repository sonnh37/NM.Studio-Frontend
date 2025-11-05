"use client";

import { LoadingPage, LoadingPageComponent } from "@/components/_common/loading-page";
import axiosInstance from "@/lib/interceptors/axios-instance";
import { logout, setUser } from "@/lib/redux/slices/userSlice";
import store, { AppDispatch } from "@/lib/redux/store";

import { BusinessResult } from "@/types/models/business-result";
import { Role, User } from "@/types/entities/user";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ErrorSystem from "./errors/error-system";
import axios from "axios";
import { authService } from "@/services/auth-service";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";

interface UserAccessControlProps {
  children: React.ReactNode;
}

export const UserAccessControl: React.FC<UserAccessControlProps> = ({
  children,
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: result,
    isFetching,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: () => authService.getUserInfo(),
    refetchOnWindowFocus: false,
  });

  if (isError) {
    console.log("Error fetching:", error);
    //  dispatch(logout());
    return <ErrorSystem />;
  }

   if (isFetching) {
    return (
      <AnimatePresence mode="wait">
        {
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xs flex items-center justify-center"
          >
            <LoadingPageComponent />
          </motion.div>
        }
      </AnimatePresence>
    );
  }

  if (result?.status === 1) {
    // const user = result.data!;
    // // Check if the user has the correct role to access the page
    // store.dispatch(setUser(user));
    // if (pathName.startsWith("/login")) {
    //   if (user.role === Role.Customer) {
    //     router.push("/");
    //   } else {
    //     router.push("/dashboard");
    //   }
    // }

    // if (pathName.startsWith("/dashboard")) {
    //   if (user.role === Role.Customer) {
    //     router.push("/");
    //   }
    // }
  } else {
    // store.dispatch(logout());

    // if (pathName.startsWith("/dashboard")) {
    //   router.push("/login");
    // }
  }

  return <>
      {
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      }
    </>
};
