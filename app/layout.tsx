import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://danturizo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Daniel Turizo | Full Stack Developer & Systems Engineering Student",
    template: "%s | Daniel Turizo",
  },
  description:
    "Portfolio of Daniel Turizo, Full Stack Developer and Systems Engineering student focused on software architecture, Oracle databases, enterprise applications and modern web development.",
  keywords: [
    "Full Stack Developer",
    "Java Developer",
    "Oracle Database",
    "PLSQL",
    "Software Engineering",
    "Software Architecture",
    "Enterprise Systems",
    "FastAPI",
    "React",
    "Next.js",
    "Colombia",
  ],
  authors: [{ name: "Daniel Turizo", url: siteUrl }],
  creator: "Daniel Turizo",
  openGraph: {
    title: "Daniel Turizo | Full Stack Developer & Systems Engineering Student",
    description:
      "Full Stack Developer and Systems Engineering student focused on software architecture, Oracle databases, enterprise applications and modern web development.",
    url: siteUrl,
    siteName: "Daniel Turizo Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/img/heroback.jpg",
        width: 1200,
        height: 630,
        alt: "Daniel Turizo Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Turizo | Full Stack Developer & Systems Engineering Student",
    description:
      "Full Stack Developer and Systems Engineering student focused on software architecture, Oracle databases, enterprise applications and modern web development.",
    images: ["/img/heroback.jpg"],
    creator: "@danturizo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token", // Replace with your Google Search Console verification token
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
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
        <Analytics />
      </body>
    </html>
  );
}
