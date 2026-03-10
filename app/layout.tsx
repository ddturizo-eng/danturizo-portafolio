import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dan Turizo | Full Stack Developer & UI/UX Designer",
  description: "Portfolio of Daniel Turizo - Full Stack Developer specializing in React, Next.js, Java, and modern web technologies. Building scalable applications with optimal performance.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Java", "Portfolio", "Web Developer", "UI/UX Designer"],
  authors: [{ name: "Daniel Turizo" }],
  openGraph: {
    title: "Dan Turizo | Full Stack Developer & UI/UX Designer",
    description: "Building modern, scalable web applications with optimal performance",
    type: "website",
    locale: "en_US",
  },
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
        {children}
      </body>
    </html>
  );
}
