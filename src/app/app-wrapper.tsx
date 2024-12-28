import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import { fetchToken } from "@/lib/slices/tokenSlice";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import {LoadingPage} from "@/components/common/loading-page";

import { Suspense } from "react";
import userSerice from "@/services/user-serice";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    // const dispatch: AppDispatch = useDispatch();

    // useEffect(() => {
    //   dispatch(fetchToken());
    // }, [dispatch]);

  // const {
  //   data: result,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["getToken"],
  //   queryFn: async () => {
  //     const response = await userSerice.getToken();
  //     return response;
  //   },
  // });

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  // if (isError) {
  //   return (
  //     <div>
  //       Cause: {error.cause as string} <br />
  //       Message: {error.message as string}
  //     </div>
  //   );
  // }

  return <>{children}</>;
};

export default AppWrapper;
