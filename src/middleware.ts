import {NextRequest, NextResponse} from "next/server";
import {decodeJwt} from "jose";

export function middleware(req: NextRequest) {
    try {
        const accessToken = req.cookies.get("accessToken")?.value;
        const refreshToken = req.cookies.get("refreshToken")?.value;

        if(!accessToken && !refreshToken) { throw new Error("Not find token!"); }

        if (!accessToken && refreshToken) {
            return NextResponse.next();
        }

        if (accessToken && !refreshToken) {
            const url = new URL("/login", req.url);
            url.searchParams.set("message", "Vui lòng đăng nhập để tiếp tục.");
            return NextResponse.redirect(url);
        }

        if (req.nextUrl.pathname.startsWith("/login")) {
            const url = new URL("/", req.url);
            if (accessToken && refreshToken) {
                return NextResponse.redirect(url);
            }
            return NextResponse.next();
        }

        const decodedToken = decodeJwt(accessToken ?? "");
        const {exp, Role} = decodedToken;
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
