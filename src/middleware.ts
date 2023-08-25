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

  // Check if the host starts with any string followed by a dot
  const subdomainPattern = /^[^.]+\./;
  if (host && !subdomainPattern.test(host || "")) {
    return NextResponse.redirect("https://hub.kevolution.app/admin");
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  // matcher: ["/*"],
};
