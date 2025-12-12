import type React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseProvider } from "@/components/providers/supabase-provider";
import { NavigationLoader } from "@/components/navigation-loader";
import SnowfallBg from "@/components/snowfall-bg";
import ChristmasLights from "@/components/christmas-lights";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NEUES LEBEN | Pharmaceutical Distribution",
  description:
    "NEUES LEBEN LLC is a distribution company operating in the pharmaceutical industry in Uzbekistan. Quality, Timely Delivery, Reliable Partnership.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = null;

  // Try to initialize Supabase, but don't crash if env vars are missing/invalid
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const cookieStore = await (cookies() as any);
      const supabase = createServerComponentClient({ cookies: () => cookieStore });
      const { data: { user } } = await supabase.auth.getUser();
      session = user ? (await supabase.auth.getSession()).data.session : null;
    }
  } catch (error) {
    console.warn("Supabase initialization failed:", error);
    // Continue without Supabase session
  }

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={`${inter.variable} ${josefinSans.variable} font-sans`}>
        <SupabaseProvider initialSession={session}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <LanguageProvider>
              <NavigationLoader />
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <SnowfallBg />
                <ChristmasLights />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </LanguageProvider>
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
