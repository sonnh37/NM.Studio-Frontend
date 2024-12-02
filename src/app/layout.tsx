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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              <Suspense fallback={<PageLoading />}>{children} </Suspense>
            </Provider>
          </ThemeProvider>
        </SessionProvider>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}

