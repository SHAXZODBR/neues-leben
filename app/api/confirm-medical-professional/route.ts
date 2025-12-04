import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { disclaimerText } = body;

    if (!disclaimerText) {
      return NextResponse.json(
        { error: "Disclaimer text is required" },
        { status: 400 }
      );
    }

    // Extract IP address
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ipAddress = forwardedFor?.split(",")[0].trim() || realIp || "unknown";

    // Extract User-Agent
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Calculate SHA-256 hash of disclaimer text
    const textHash = crypto
      .createHash("sha256")
      .update(disclaimerText)
      .digest("hex");

    // Insert into database
    const { data, error } = await supabase
      .from("doctor_confirmations")
      .insert({
        ip_address: ipAddress,
        user_agent: userAgent,
        disclaimer_text: disclaimerText,
        text_hash: textHash,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to save confirmation", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    console.error("Error processing confirmation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
