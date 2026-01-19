import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Extract IP address for spam prevention
        const forwardedFor = request.headers.get("x-forwarded-for");
        const realIp = request.headers.get("x-real-ip");
        const ipAddress = forwardedFor?.split(",")[0].trim() || realIp || "unknown";

        // Extract User-Agent
        const userAgent = request.headers.get("user-agent") || "unknown";

        // Insert into database
        const { data, error } = await supabase
            .from("contact_messages")
            .insert({
                name,
                email,
                message,
                ip_address: ipAddress,
                user_agent: userAgent,
            })
            .select()
            .single();

        if (error) {
            console.error("Database error:", error);
            return NextResponse.json(
                { error: "Failed to send message", details: error.message },
                { status: 500 }
            );
        }

        // Send email notification
        if (resend) {
            try {
                await resend.emails.send({
                    from: "Neues Leben Website <noreply@neuesleben.uz>",
                    to: ["info@neuesleben.uz"],
                    replyTo: email,
                    subject: `New Contact Form Message from ${name}`,
                    html: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>From:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
                        <hr />
                        <p style="color: #888; font-size: 12px;">
                            Submitted on: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Tashkent" })}<br/>
                            IP: ${ipAddress}
                        </p>
                    `,
                });
            } catch (emailError) {
                // Log email error but don't fail the request - message is already saved
                console.error("Email sending error:", emailError);
            }
        }

        return NextResponse.json({
            ok: true,
            id: data.id,
            message: "Message sent successfully"
        });
    } catch (error) {
        console.error("Error processing contact form:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
