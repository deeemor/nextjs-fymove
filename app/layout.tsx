import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContextType";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FyMove - Rehabilitation in your hands",
  description: "Smart rehabilitation program to help you recover easily",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        
      <LanguageProvider>
        {children}

        </LanguageProvider>
        </body>
    </html>
  );
}