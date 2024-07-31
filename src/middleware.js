import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("user_token")?.value;

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/admin");

  // if (token === undefined && isProtectedRoute) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
