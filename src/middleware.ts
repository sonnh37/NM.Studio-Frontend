import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

export function middleware(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;
    console.log("check_token", accessToken);
    // if(!accessToken && !refreshToken) { throw new Error("Not find token!"); }

    // if (accessToken) {
    //     const url = new URL("/login", req.url);
    //     url.searchParams.set("message", "Vui lòng đăng nhập để tiếp tục.");
    //     return NextResponse.redirect(url);
    // }

    if (accessToken) {
      if (req.nextUrl.pathname.startsWith("/login")) {
        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }

      const decodedToken = decodeJwt(accessToken ?? "");
      const { exp, Role } = decodedToken;
      const currentTime = Math.floor(Date.now() / 1000);

      if (exp && exp < currentTime) {
        const url = new URL("/login", req.url);
        url.searchParams.set("message", "Phiên đăng nhập đã hết hạn.");
        return NextResponse.redirect(url);
      }

      if (
        req.nextUrl.pathname.startsWith("/dashboard") &&
        !["admin", "staff"].includes((Role as string)?.toLowerCase())
      ) {
        const url = new URL("/", req.url);
        // url.searchParams.set("message", "Bạn không có quyền truy cập.");
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    } else {
      if (req.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.next();
      }
      const url = new URL("/", req.url);

      return NextResponse.redirect(url);
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
