import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Advanced STP | Master In-Demand Tech Skills",
  description:
    "Learn cutting-edge technology skills with hands-on courses. From Beginner to Advanced, accelerate your career with expert-led training.",
  keywords: [
    "e-learning",
    "tech courses",
    "programming",
    "web development",
    "cloud computing",
    "AI",
    "Full Stack",
    "Mulesoft",
    "online education",
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        {children}

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
