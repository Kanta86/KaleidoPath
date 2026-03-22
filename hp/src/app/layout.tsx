import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: {
    template: "%s | 株式会社KaleidoPath",
    default: "香りでコミュニティの熱量を最大化 | 株式会社KaleidoPath",
  },
  description: "記憶や感情に最も訴えかけられる嗅覚へのアプローチ（空間の香りの演出や、香るグッズ作製）であなたのコミュニティの熱量を最大化します。",
  openGraph: {
    title: "香りでコミュニティの熱量を最大化",
    description: "記憶や感情に最も訴えかけられる嗅覚へのアプローチであなたのコミュニティの熱量を最大化します。",
    type: "website",
    locale: "ja_JP",
    siteName: "株式会社KaleidoPath",
    images: ["/kplogo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "株式会社KaleidoPath",
    description: "香りでコミュニティの熱量を最大化",
    images: ["/kplogo.png"],
  },
  icons: {
    icon: "/favicon.ico", // Next.js auto-detects favicon.ico but explicit is fine.
  },
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/layout/CTASection";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <CTASection />
        <Footer />
      </body>
    </html>
  );
}
