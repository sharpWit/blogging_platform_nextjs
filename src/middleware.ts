import type { Route } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define paths that should be protected
const protectedPaths = ["/posts"];

export async function middleware(req: NextRequest) {
  try {
    // Get the token from the user's cookies
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = req.nextUrl;

    // Check if the user is trying to access a protected path
    const isAccessingProtectedPath = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    if (isAccessingProtectedPath && !token) {
      // Redirect to login if no token found and trying to access a protected page
      const loginUrl = new URL("/login" as Route, req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", req.url); // Path for redirection after login
      return NextResponse.redirect(loginUrl);
    }

    // Allow the request to continue if the token is present or the path is not protected
    return NextResponse.next();
  } catch (error) {
    console.error(error);
  }
}

// Apply the middleware to the /posts/:path* route
export const config = {
  matcher: ["/posts/:path*"],
};
