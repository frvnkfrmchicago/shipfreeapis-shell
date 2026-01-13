import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TechBackdrop } from "@/components/TechBackdrop";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Display font for headlines - futuristic, tech, unique
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ShipFreeAPIs | Free APIs, Skills, and Rules",
  description: "ShipFreeAPIs is a curated library of free APIs, Claude skills, and Cursor rules. Verified monthly so you can ship fast.",
  keywords: ["free apis", "api library", "developer tools 2025", "ai skills", "cursor rules", "shipfreeapis"],
  openGraph: {
    title: "ShipFreeAPIs | APIs, Skills, and Rules",
    description: "52 free APIs, plus AI skills and Cursor rules. Verified monthly. Copy-paste ready.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShipFreeAPIs",
    description: "Free APIs, AI skills, and Cursor rules. Verified monthly for faster shipping.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <TechBackdrop />
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

