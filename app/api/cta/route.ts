import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { fullName, email, phone, company, message } = await request.json();

    if (!fullName || !email || !phone || !company) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "samer.abualia@bridge-xglobal.com",
      subject: "New Demo Request - BridgeX Global",
      html: `
        <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; background: #202328; color: #ededed; padding: 32px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="background: linear-gradient(to right, #1671E2, #08E4D2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0;">
              BridgeX Global
            </h1>
            <p style="color: #9CA3AF; margin-top: 8px;">New Demo Request</p>
          </div>

          <div style="background: rgba(40,44,52,0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 24px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #9CA3AF; width: 130px; vertical-align: top;">Full Name</td>
                <td style="padding: 10px 0; color: #ededed; font-weight: 500;">${fullName}</td>
              </tr>
              <tr style="border-top: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 10px 0; color: #9CA3AF; vertical-align: top;">Email</td>
                <td style="padding: 10px 0;">
                  <a href="mailto:${email}" style="color: #1671E2; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr style="border-top: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 10px 0; color: #9CA3AF; vertical-align: top;">Phone</td>
                <td style="padding: 10px 0;">
                  <a href="tel:${phone}" style="color: #1671E2; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr style="border-top: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 10px 0; color: #9CA3AF; vertical-align: top;">Company</td>
                <td style="padding: 10px 0; color: #ededed;">${company}</td>
              </tr>
              ${
                message
                  ? `
              <tr style="border-top: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 10px 0; color: #9CA3AF; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #ededed; line-height: 1.6;">${message}</td>
              </tr>`
                  : ""
              }
            </table>
          </div>

          <div style="text-align: center; color: #9CA3AF; font-size: 12px; margin-top: 24px;">
            <p style="margin: 4px 0;">📞 <a href="tel:+966599704899" style="color: #08E4D2; text-decoration: none;">+966 59 9704899</a></p>
            <p style="margin: 4px 0;">✉️ <a href="mailto:samer.abualia@bridge-xglobal.com" style="color: #08E4D2; text-decoration: none;">samer.abualia@bridge-xglobal.com</a></p>
            <p style="margin-top: 16px;">All rights reserved for BridgeX Global</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", result);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
