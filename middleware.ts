import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // For now, we'll rely on client-side auth checks in the dashboard
  // The dashboard page already has authentication protection
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
