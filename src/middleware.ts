import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  try {
    return NextResponse.next();
  } catch (error: any) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login", "/settings"],
};
