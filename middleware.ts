// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  if (!session) {
    console.log("No session found");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const parsed = JSON.parse(session);
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminPage && parsed.role !== "ADMIN") {
      console.log("Unauthorized access attempt to admin page");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } catch (err) {
    console.error("Error parsing session in middleware:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/admin"],
};
