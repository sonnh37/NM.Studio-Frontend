"use client";
import "./globals.css";
import { RefreshProvider } from "@/components/common/refresh-context";
import {SessionProvider} from "next-auth/react";
import { ThemeProvider } from "next-themes";
import Script from 'next/script';

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
        <head>
            {/* Use Script component for loading external scripts asynchronously */}
            <Script src="https://kit.fontawesome.com/b08cef85f4.js" strategy="lazyOnload" crossOrigin="anonymous"/>
            <title>Studio</title>
        </head>
        <body>
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                enableSystem={true}
                defaultTheme="light"
            >
                    <RefreshProvider>{children}</RefreshProvider>
            </ThemeProvider>
        </SessionProvider>
        </body>

        </html>
    );
}
