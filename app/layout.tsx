import type React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "@/lib/supabase/server";
import { SupabaseProvider } from "@/components/providers/supabase-provider";
import { NavigationLoader } from "@/components/navigation-loader";
import GoogleAnalytics from "@/components/google-analytics";

// Note: force-dynamic is required here because createClient() uses cookies()
export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "NEUES LEBEN | Pharmaceutical Distribution in Uzbekistan",
    template: "%s | NEUES LEBEN",
  },
  description:
    "NEUES LEBEN LLC — фармацевтическая дистрибьюторская компания в Узбекистане. Качество, Своевременная Доставка, Надежное Партнерство. Pharmaceutical distribution company in Uzbekistan.",
  keywords: [
    // English
    "NEUES LEBEN", "pharmaceutical distribution", "Uzbekistan", "medical", "healthcare", "drugs", "medicine",
    "pharmaceutical company Uzbekistan", "drug distribution Tashkent",
    // Russian
    "Нойес Лебен", "фармацевтика Узбекистан", "лекарства", "дистрибуция лекарств", "фармацевтическая компания",
    "медикаменты Ташкент", "аптека", "дистрибьютор лекарств Узбекистан", "фармацевтические препараты",
    // Uzbek
    "dori vositalari", "farmatsevtika", "dori taqsimoti", "Toshkent", "O'zbekiston dori",
    "tibbiy mahsulotlar", "dori distribyutsiya",
    // German
    "pharmazeutische Vertrieb", "Usbekistan", "Arzneimittel",
  ],
  authors: [{ name: "NEUES LEBEN LLC" }],
  creator: "NEUES LEBEN LLC",
  publisher: "NEUES LEBEN LLC",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.neuesleben.uz'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US", "uz_UZ", "de_DE"],
    url: "/",
    title: "NEUES LEBEN | Фармацевтическая Дистрибуция в Узбекистане",
    description: "NEUES LEBEN LLC — дистрибьюторская компания, работающая в фармацевтической отрасли Узбекистана. Качество, Своевременная Доставка, Надежное Партнерство.",
    siteName: "NEUES LEBEN",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "NEUES LEBEN Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "NEUES LEBEN | Pharmaceutical Distribution",
    description: "NEUES LEBEN LLC — pharmaceutical distribution company in Uzbekistan. Quality medicines and healthcare products.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
      const supabase = await createClient();
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        session = data?.session || null;
      }
    }
  } catch (error) {
    console.warn("Supabase initialization failed:", error);
    // Continue without Supabase session
  }

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <GoogleAnalytics />
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={`${inter.variable} ${josefinSans.variable} font-sans`} suppressHydrationWarning>
        <SupabaseProvider initialSession={session}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <LanguageProvider>
              <NavigationLoader />
              <div className="flex min-h-screen flex-col">
                <Navbar />
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
