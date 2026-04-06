import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Sanitize HTML to prevent XSS
function sanitizeHTML(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (basic validation)
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
}

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + 60000, // 1 minute window
    });
    return true;
  }

  if (limit.count >= 3) {
    // Max 3 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { fullName, email, phone, company, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !company) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (fullName.length > 100 || company.length > 100) {
      return NextResponse.json(
        { success: false, error: "Field length exceeds maximum allowed" },
        { status: 400 }
      );
    }

    if (message && message.length > 1000) {
      return NextResponse.json(
        { success: false, error: "Message too long" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Sanitize all inputs to prevent XSS
    const sanitizedData = {
      fullName: sanitizeHTML(fullName.trim()),
      email: sanitizeHTML(email.trim().toLowerCase()),
      phone: sanitizeHTML(phone.trim()),
      company: sanitizeHTML(company.trim()),
      message: message ? sanitizeHTML(message.trim()) : "No message provided",
    };

    // Send email with sanitized data
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "a.abdelraouf@bridge-xglobal.com",
      subject: "New Demo Request - BridgeX",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1671E2 0%, #08E4D2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #1671E2; }
              .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">New Demo Request - BridgeX</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Full Name:</div>
                  <div class="value">${sanitizedData.fullName}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${sanitizedData.email}</div>
                </div>
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${sanitizedData.phone}</div>
                </div>
                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${sanitizedData.company}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${sanitizedData.message}</div>
                </div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                  <p>Request received from IP: ${ip}</p>
                  <p>Timestamp: ${new Date().toISOString()}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", result);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
