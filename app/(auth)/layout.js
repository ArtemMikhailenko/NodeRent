"use client";

import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased astro-bg`}
        suppressHydrationWarning
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
