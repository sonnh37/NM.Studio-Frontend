import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // const jwt = await getToken({ req });

  // const token = jwt.
  //   ? authHeader.split(" ")[1]
  //   : null;

  // if (pathname.startsWith("/dashboard") && !token) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // if (pathname === "/login" && token) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }
  

  return NextResponse.next();
}

// specify for which routes you want to run the above middleware

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
