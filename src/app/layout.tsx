"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { Toaster } from "sonner";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { RootState } from "@/lib/store";
import { toggleChat } from "@/lib/slices/chatSlice";
import { Suspense } from "react";
import PageLoading from "@/components/common/page-loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        {/* Use Script component for loading external scripts asynchronously */}
        <Script
          src="https://kit.fontawesome.com/b08cef85f4.js"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <title>Studio</title>
      </head>
      <body>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="light"
          >
            <Provider store={store}>
              <Suspense fallback={<PageLoading />}>
                <QueryClientProvider client={queryClient}>
                  <TooltipProvider delayDuration={0}>
                    <HelmetProvider>
                      {children}
                    </HelmetProvider>
                  </TooltipProvider>
                </QueryClientProvider>
              </Suspense>
            </Provider>
          </ThemeProvider>
        </SessionProvider>

        <Toaster
          position="top-center"
          richColors
          icons={{
            success: "🎉",
            error: "🚨",
            warning: "⚠️",
          }}
        />
      </body>
    </html>
  );
}
