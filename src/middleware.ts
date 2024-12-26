import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'
// import { decodeJwt } from "jose";
// import { cookies } from "next/headers";
// import axios from "axios";
// import https from "https";
// import { TokenResponse } from "./types/response/token-response";


export async function middleware(req: NextRequest, event: NextFetchEvent) {
  return NextResponse.next();
  // const url = `https://localhost:7192/users/get-token`;
  // const agent = new https.Agent({
  //   rejectUnauthorized: false, // Bỏ qua kiểm tra SSL
  // });
  // // axios
  // //   .get(url, { withCredentials: true })
  // //   .then((response) => {
  // //     const data = response.data as TokenResponse;
  // //     console.log("check_token", data.accessToken);
  // //   })
  // //   .catch((error) => {
  // //     console.error("check_error", error);
  // //   });

  // event.waitUntil(
  //   (async () => {
  //     try {
  //       const response = await fetch('https://localhost:7192/users/get-token', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         credentials: 'include',
  //       });
  //       const data = await response.json();
  //       console.log('Response data:', data);
  //     } catch (error) {
  //       console.error('Error in middleware fetch:', error);
  //     }
  //   })()
  // );

  // try {
  //   console.log("Check_token", req.cookies.get("token"));
  //   const accessToken = req.cookies.get("token")?.value;
  //   if (accessToken) {
  //     const decodedToken = decodeJwt(accessToken ?? "");
  //     const { exp, Role } = decodedToken;
  //     // Kiểm tra token có hết hạn không
  //     const currentTime = Math.floor(Date.now() / 1000);
  //     if (exp && currentTime >= exp) {
  //       // Token đã hết hạn, chuyển hướng đến trang đăng nhập
  //       const url = new URL("/login", req.url);
  //       return NextResponse.redirect(url);
  //     }

  //     // check /login và role admin, staff, customer
  //     if (req.nextUrl.pathname.startsWith("/login")) {
  //       if (["admin", "staff"].includes((Role as string)?.toLowerCase())) {
  //         const url = new URL("/dashboard", req.url);
  //         return NextResponse.redirect(url);
  //       }

  //       const url = new URL("/", req.url);
  //       return NextResponse.redirect(url);
  //     }

  //     if (req.nextUrl.pathname.startsWith("/dashboard")) {
  //       if (!["admin", "staff"].includes((Role as string)?.toLowerCase())) {
  //         const url = new URL("/", req.url);
  //         return NextResponse.redirect(url);
  //       }

  //       return NextResponse.next();
  //     }

  //     return NextResponse.next();
  //   } else {
  //     if (req.nextUrl.pathname.startsWith("/dashboard")) {
  //       const url = new URL("/", req.url);
  //       return NextResponse.redirect(url);
  //     }

  //     return NextResponse.next();
  //   }
  // } catch (error) {
  //   console.error("Error in middleware:", error);
  //   const url = new URL("/error", req.url);
  //   url.searchParams.set("message", error as string);
  //   return NextResponse.redirect(url);
  // }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login", "/settings"],
};
