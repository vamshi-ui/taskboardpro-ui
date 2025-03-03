import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isAuthorized = request.cookies.has("auth-key");
  if (!isAuthorized) {
    const url = new URL("/login", request.url);
    url.searchParams.set('unauthorized','true');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/about/:path*"],
};
