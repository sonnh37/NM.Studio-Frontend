"use client";
import store from "@/lib/redux/store";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import "../styles/globals.css";

import { Toaster } from "@/components/_common/toast";
import { UserAccessControl } from "@/components/_common/user-access-control";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterGuard } from "@/guard/route-guard";
import { userContextHelper } from "@/lib/utils/user-context-helper";
export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  if (!queryClient) {
    return null;
  }
  return (
    <>
      <NextTopLoader
        // color="#1b2d3f"
        height={4}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        template='<div class="bar" role="bar"><div class="peg"></div></div>
                    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
      <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider delayDuration={100}>
              <HelmetProvider>
                <RouterGuard
                  matcher={["/dashboard/*", "/profile"]}
                  redirect="/login"
                >
                  {children}
                </RouterGuard>
                {/* {children} */}
              </HelmetProvider>
            </TooltipProvider>
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}
