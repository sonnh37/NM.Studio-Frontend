"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import userSerice from "@/services/user-serice";
import LoadingPage from "@/components/common/loading-page";
import ErrorSystem from "./errors/error-system";
import { Role, User } from "@/types/user";
import { setUser } from "@/lib/slices/userSlice";
import { useDispatch } from "react-redux";

interface UserAccessControlProps {
  children: React.ReactNode;
}

export const UserAccessControl: React.FC<UserAccessControlProps> = ({
  children,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: async () => {
      const response = await userSerice.getCurrentUser();
      dispatch(setUser(response.data ?? ({} as User)));
      return response;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return (
      <div>
        Cause: {error.cause as string} <br />
        Message: {error.message as string}
      </div>
    );
  }

  if (result && result.status == 1) {
    if (result.data?.role === Role.Customer) {
      router.push("/");
      return;
    }
  }

  return <>{children}</>;
};
