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

//   const dispatch: AppDispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchToken());
//   }, [dispatch]);

useEffect(() => {
    //  fetch(process.env.NEXT_PUBLIC_API_BASE+"/users/get-token", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //  }).then((res) => res.json())
    //  .then((data) => {
    //    console.log("check_token_home", data);
    //    // Kiểm tra nội dung của phản hồi
    //    if (data.status === 1) {
    //         // Token hợp lệ
    //         console.log("Token hợp lệ:", data);
    //    } else {
    //      // Token không hợp lệ hoặc có lỗi xảy ra
    //      console.error("Token không hợp lệ hoặc có lỗi xảy ra:", data.message);
    //    }
    //  })
    //  .catch((error) => {
    //    console.error("Error fetching token:", error);
    //  });
}, [])

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
