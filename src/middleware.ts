import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
  try {
    console.log("Check_token", req.cookies.get("token"));
    const accessToken = req.cookies.get("token")?.value;
    if (accessToken) {
      const decodedToken = decodeJwt(accessToken ?? "");
      const { exp, Role } = decodedToken;
      // Kiểm tra token có hết hạn không
      const currentTime = Math.floor(Date.now() / 1000);
      if (exp && currentTime >= exp) {
        // Token đã hết hạn, chuyển hướng đến trang đăng nhập
        const url = new URL("/login", req.url);
        return NextResponse.redirect(url);
      }

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
        if (!["admin", "staff"].includes((Role as string)?.toLowerCase())) {
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
