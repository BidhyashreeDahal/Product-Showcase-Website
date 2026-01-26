import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect /dashboard and its children
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  // No token → go to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Token exists → proceed (validation handled in API routes)
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
