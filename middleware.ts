import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers to all responses
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  // Additional protection for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    // Check for suspicious patterns in request
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /onerror=/i,
      /onclick=/i,
      /onload=/i,
      /<iframe/i,
      /eval\(/i,
      /base64/i,
    ];

    // Check request body if it exists
    const url = request.nextUrl.toString();
    const isSuspicious = suspiciousPatterns.some((pattern) =>
      pattern.test(url)
    );

    if (isSuspicious) {
      console.warn("Suspicious request detected:", {
        url: request.nextUrl.pathname,
        ip: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent"),
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Verify content type for POST requests
    if (request.method === "POST") {
      const contentType = request.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        return NextResponse.json(
          { error: "Invalid content type" },
          { status: 400 }
        );
      }
    }
  }

  return response;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
