import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  const token = authHeader?.split(" ")[1];
  if (!token) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Unauthorized. Token missing.",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // If token exists, continue the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/vendor/:path*"],
};
