import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EditKaro | Enterprise Video Production & Creative Operations Platform",
  description:
    "We craft hyper-engaging video edits that scale creators and brands. High-retention short-form reels, cinematic YouTube deep dives, DaVinci color grading, and end-to-end client review OS.",
  keywords: [
    "video editing agency",
    "creative operations",
    "frame-by-frame review",
    "short-form reels",
    "youtube documentary editing",
    "color grading",
    "davinci resolve",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-gray-100 antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
