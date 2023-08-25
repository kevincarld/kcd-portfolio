import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    return NextResponse.next();
  }

  if (host && host.startsWith("local")) {
    return NextResponse.next();
  }

  // if in main root, redirect to hub login
  if (host && !host.startsWith(".")) {
    return NextResponse.redirect("https://hub.kevolution.app/admin");
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  // matcher: ["/*"],
};
