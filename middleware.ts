// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  if (!session) {
    console.log("🔒 No session found");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const parsed = JSON.parse(session);
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
    const isUserPage = req.nextUrl.pathname.startsWith("/produk-unggulan");

    // Cek jika halaman admin, hanya role admin yg boleh
    if (isAdminPage && parsed.role !== "admin") {
      console.log("⛔ Unauthorized admin access");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Cek jika halaman user, hanya role user yg boleh
    if (isUserPage && parsed.role !== "user") {
      console.log("⛔ Unauthorized user access");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } catch (err) {
    console.error("❌ Error parsing session:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // bisa tambah path lain juga
};
