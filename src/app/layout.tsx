"use client";

import store from "@/lib/store";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import "./globals.css";

import { UserAccessControl } from "@/components/common/user-access-control";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  if (!queryClient) {
    return null;
  }
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/b08cef85f4.js"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <title>Studio</title>
      </head>
      <body suppressHydrationWarning={true}>
        <NextTopLoader
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div>
                    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="light"
        >
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <TooltipProvider delayDuration={100}>
                <HelmetProvider>
                  <UserAccessControl>{children}</UserAccessControl>
                </HelmetProvider>
              </TooltipProvider>
            </QueryClientProvider>
          </Provider>
        </ThemeProvider>
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
