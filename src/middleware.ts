// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getLogger } from "@next-logger/logger";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  getLogger("middleware").info({
    ip: request?.ip,
    method: request?.method,
    url: request?.url,
  });
  const response = NextResponse.next({
    request,
  });
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
