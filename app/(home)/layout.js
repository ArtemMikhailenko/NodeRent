"use client";

import { Inter } from "next/font/google";
import "../globals.css";

import dynamic from "next/dynamic";

const AuthProvider = dynamic(() => import("../_context/auth/auth-provider"), {
  ssr: false,
});

const Navigation = dynamic(
  () => import("../_components/navigation/navigation"),
  {
    ssr: false,
  },
);

import { Footer } from "./_comoponents/layout/footer/footer";

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
          <div className="flex flex-col py-5 px-14 min-h-screen lg:max-w-7xl lg:mx-auto lg:flex-col max-lg:p-0">
            <Navigation />
            <main className="max-lg:p-4 max-lg:pt-16">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
