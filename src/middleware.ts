import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token: any = request.cookies.get("auth-key")?.value;
  const decoded: any = token ? jwtDecode(token) : {};

  if (!decoded?.isEmailVerified || !decoded?.isActive) {
    const url = new URL("/login", request.url);
    url.searchParams.set("unauthorized", "true");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tasklist/:path*",
    "/notifications/:path*",
    "/userinfo/:path*",
  ],
};
