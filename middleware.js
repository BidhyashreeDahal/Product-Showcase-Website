import { NextResponse } from "next/server";
import { verifyToken } from "./src/lib/auth";

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

  // Invalid / expired token → go to login
  const user = verifyToken(token);
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Everything OK → proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
