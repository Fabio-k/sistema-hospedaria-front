import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FiltroProvider } from "@/concepts/hospede/context";
import { PaginationPrevious } from "@/components/ui/pagination";
import { PaginationProvider } from "@/concepts/context/paginationContext";
import Providers from "./providers";
import { Navbar } from "@/concepts/navigation/organism/navbar";
import SessionGuard from "./sessionGuard";

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
        <PaginationProvider>
            <Providers>
              <SessionGuard>
                <Navbar />
                <FiltroProvider>{children}</FiltroProvider>
                </SessionGuard>
            </Providers>
        </PaginationProvider>
      </body>
    </html>
  );
}
