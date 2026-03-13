import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FPL Hub — Fantasy Premier League Dashboard",
  description:
    "Explore players, fixtures, gameweek stats, and team comparisons for Fantasy Premier League.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <div className="flex-1 overflow-auto p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
