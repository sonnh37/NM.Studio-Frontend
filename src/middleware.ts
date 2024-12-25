import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    console.log("check_token", accessToken);

    if (accessToken) {
      const decodedToken = decodeJwt(accessToken ?? "");
      const { exp, Role } = decodedToken;
      // const currentTime = Math.floor(Date.now() / 1000);

      // check /login và role admin, staff, customer
      if (req.nextUrl.pathname.startsWith("/login")) {
        if (["admin", "staff"].includes((Role as string)?.toLowerCase())) {
          const url = new URL("/dashboard", req.url);
          return NextResponse.redirect(url);
        }

        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }

      if (req.nextUrl.pathname.startsWith("/dashboard")) {
        if(!["admin", "staff"].includes((Role as string)?.toLowerCase()) ) {
          const url = new URL("/", req.url);
          return NextResponse.redirect(url);
        }

        return NextResponse.next();
      }

      return NextResponse.next();
    } else {
      if (req.nextUrl.pathname.startsWith("/dashboard")) {
        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    }
  } catch (error) {
    console.error("Error in middleware:", error);
    const url = new URL("/error", req.url);
    url.searchParams.set("message", error as string);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login", "/settings"],
};
