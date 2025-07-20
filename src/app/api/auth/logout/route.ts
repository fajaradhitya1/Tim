import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const expiredCookie = serialize("session", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  const res = NextResponse.json({ message: "Logged out" });
  res.headers.set("Set-Cookie", expiredCookie);
  return res;
}
