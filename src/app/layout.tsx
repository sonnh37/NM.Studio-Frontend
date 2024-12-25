"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "@/lib/store";
import { HelmetProvider } from "react-helmet-async";
import NextTopLoader from "nextjs-toploader";
import AppWrapper from "./app-wrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <body>
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
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="light"
          >
            <Provider store={store}>
              <AppWrapper>{children}</AppWrapper>
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
