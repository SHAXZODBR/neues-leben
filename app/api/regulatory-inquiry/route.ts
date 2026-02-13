import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getSupabaseClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
        throw new Error("Supabase environment variables are not configured");
    }
    return createClient(url, key);
}

// Initialize Resend with API key
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
    try {
        const supabase = getSupabaseClient();
        const body = await request.json();
        const { name, email, company, country, productType, message } = body;

        // Validate required fields
        if (!name || !email || !company || !country || !productType || !message) {
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

        // Extract IP address
        const forwardedFor = request.headers.get("x-forwarded-for");
        const realIp = request.headers.get("x-real-ip");
        const ipAddress = forwardedFor?.split(",")[0].trim() || realIp || "unknown";
        const userAgent = request.headers.get("user-agent") || "unknown";

        // Save to database
        const { data, error } = await supabase
            .from("contact_messages")
            .insert({
                name,
                email,
                message: `[REGULATORY INQUIRY]\n\nCompany: ${company}\nCountry: ${country}\nProduct Type: ${productType}\n\nMessage:\n${message}`,
                ip_address: ipAddress,
                user_agent: userAgent,
            })
            .select()
            .single();

        if (error) {
            console.error("Database error:", error);
            return NextResponse.json(
                { error: "Failed to send inquiry", details: error.message },
                { status: 500 }
            );
        }

        // Send email via Resend
        const recipientEmail = process.env.SMTP_TO || "info@neuesleben.uz";

        if (resend) {
            try {
                await resend.emails.send({
                    from: "Neues Leben Website <onboarding@resend.dev>",
                    to: [recipientEmail],
                    replyTo: email,
                    subject: `New Regulatory Inquiry from ${company} (${country})`,
                    html: `
                        <h2>New Regulatory Services Inquiry</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Company:</strong> ${company}</p>
                        <p><strong>Country:</strong> ${country}</p>
                        <p><strong>Product Type:</strong> ${productType}</p>
                        <h3>Message</h3>
                        <p>${message}</p>
                    `,
                });
                console.log("Email sent via Resend");
            } catch (emailError) {
                console.error("Email error:", emailError);
            }
        }

        return NextResponse.json({ ok: true, id: data.id });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
