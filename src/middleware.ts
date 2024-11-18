import type {MiddlewareConfig, NextFetchEvent, NextRequest,} from "next/server";
import {NextResponse} from "next/server";
import createMiddleware from "next-intl/middleware";
import {routing} from "@/i18n/routing";


const shouldUseClerk = true; // TODO: consider `const shouldUseClerk = Boolean(env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);`
const shouldUseIntl = true;

const createIntlMiddleware = createMiddleware(routing);


export function middleware(request: NextRequest, event: NextFetchEvent) {
    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(de-DE|en-US|es-ES|ms-MY|fr-FR|hi-IN|it-IT|pl-PL|tr-TR|uk-UA|zh-CN)/:path*",
        "/(api|trpc)(.*)",
    ],
};
  