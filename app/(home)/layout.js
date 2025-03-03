"use client";

import { Inter } from "next/font/google";
import "../globals.css";

import { Navigation } from "../_components/navigation/navigation";

import dynamic from "next/dynamic";

const AuthProvider = dynamic(() => import("../_context/auth/auth-provider"), {
  ssr: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <div className="py-5 px-14 min-h-screen lg:max-w-7xl lg:mx-auto lg:flex-col max-sm:p-0">
            <Navigation />
            <main className="max-sm:p-4 max-sm:pt-16">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
