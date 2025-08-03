import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies(); // ✅ pakai await
  const session = cookieStore.get("session");

  if (!session) {
    return NextResponse.json({ role: null }, { status: 401 });
  }

  try {
    const parsed = JSON.parse(session.value);
    return NextResponse.json(parsed); // { role: 'ADMIN', id: '...' }
  } catch {
    return NextResponse.json({ role: null }, { status: 401 });
  }
}
