import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FiltroProvider } from "@/concepts/hospede/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de hospedaria",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background flex flex-col min-h-screen pb-8`}
      >
        <div className="h-20 w-full flex items-center p-4 bg-white shadow sticky top-0">
          <h1 className="text-3xl font-bold text-gray-900">
            Sistema de hospedaria
          </h1>
        </div>
        <FiltroProvider>{children}</FiltroProvider>
      </body>
    </html>
  );
}
