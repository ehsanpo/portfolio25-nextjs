import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { LanguageProvider } from "@/lib/LanguageContext";
import HtmlWrapper from "@/components/HtmlWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Multilingual portfolio and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <HtmlWrapper>
            <Header />
            <main className="p-4">{children}</main>
            <footer className="p-4 text-center text-gray-500">
              © 2025 Portfolio
            </footer>
          </HtmlWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
