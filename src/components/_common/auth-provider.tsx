"use client";

import { logout, setUser } from "@/lib/redux/slices/userSlice";
import { authService } from "@/services/auth-service";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorSystem from "./errors/error-system";
import { LoadingPage } from "./loading-page";
import { AnimatePresence, motion } from "framer-motion";
import { is } from "date-fns/locale";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    data: result,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => await authService.getUserInfo(),
    refetchOnWindowFocus: false,
    retry: false, // Không tự động retry khi fail
  });

  if (isError) {
    console.error("Error fetching user info:", error);
    dispatch(logout()); // Đảm bảo logout nếu có lỗi
    // setIsInitialized(true); // Vẫn cho hiển thị content dù có lỗi
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
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <LoadingPage />
          </motion.div>
        }
      </AnimatePresence>
    );
  }

  if (result) {
    if (result.status === 1) {
      dispatch(setUser(result.data!));
    } else {
      dispatch(logout());
    }
  }

  return (
    <>
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
  );
}
