import type React from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Create and share your professional resume",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
          <ReactQueryProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </ReactQueryProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
