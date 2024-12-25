import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import { fetchToken } from "@/lib/slices/tokenSlice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import PageLoading from "@/components/common/page-loading";
import { Suspense } from "react";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  if (!queryClient) {
    return null;
  }

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  return (
    <Suspense fallback={<PageLoading />}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={100}>
          <HelmetProvider>{children}</HelmetProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default AppWrapper;
