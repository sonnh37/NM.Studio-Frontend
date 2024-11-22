"use client";

import "./globals.css";
import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "next-themes";
import Script from "next/script";
import {Toaster} from "sonner";
import {Provider} from "react-redux";
import store from "@/lib/store";
import SmoothScroll from "./smooth-scrollbar";

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
        <SmoothScroll>
            <SessionProvider>
                <ThemeProvider
                    attribute="class"
                    enableSystem={true}
                    defaultTheme="light"
                >
                    <Provider store={store}>{children}</Provider>
                </ThemeProvider>
            </SessionProvider>
            <Toaster position="top-center"/>
        </SmoothScroll>
        </body>
        </html>
    );
}

// "use client";
// import { NextUIProvider } from "@nextui-org/react";
// import "./globals.css";
// import { RefreshProvider } from "@/components/common/refresh-context";
// import { SessionProvider } from "next-auth/react";
// import { ThemeProvider } from "next-themes";
// import Script from 'next/script';
// import { NextIntlClientProvider } from "next-intl";
// import { notFound } from "next/navigation";
// import { routing } from "@/i18n/routing";
// import { getMessages } from "next-intl/server";

// interface RootLayoutProps {
//     children: React.ReactNode;
//     params: Promise<{ locale: string }>;
// }

// export default async function RootLayout({
//     children,
//     params,
// }: RootLayoutProps) {
//     // Get the locale from the params
//     const { locale } = await params;

//     // Ensure that the incoming `locale` is valid
//     if (!routing.locales.includes(locale as any)) {
//         notFound();
//     }

//     // Provide all messages to the client
//     const messages = await getMessages();
//     return (
//         <html suppressHydrationWarning={true} className="!scroll-smooth" lang={locale}>
//             <head>
//                 {/* Use Script component for loading external scripts asynchronously */}
//                 <Script src="https://kit.fontawesome.com/b08cef85f4.js" strategy="lazyOnload" crossOrigin="anonymous" />
//                 <title>Studio</title>
//             </head>
//             <body>

//                 <NextUIProvider>
//                     <SessionProvider>
//                         <ThemeProvider
//                             attribute="class"
//                             enableSystem={true}
//                             defaultTheme="light"
//                         >
//                             <RefreshProvider>
//                                 <NextIntlClientProvider messages={messages}>
//                                     {children}
//                                 </NextIntlClientProvider>
//                             </RefreshProvider>
//                         </ThemeProvider>
//                     </SessionProvider>
//                 </NextUIProvider>
//             </body>

//         </html>
//     );
// }
