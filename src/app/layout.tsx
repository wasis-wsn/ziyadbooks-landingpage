import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import { AppProviders } from "@/components/layout/app-providers";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ziyad Books",
    template: "%s | Ziyad Books",
  },
  description:
    "Landing page e-commerce katalog buku Islami Ziyad Books dengan desain modern, cepat, dan responsif.",
  metadataBase: new URL("https://ziyadbooks.com"),
  applicationName: "Ziyad Books",
  keywords: ["buku islami", "toko buku islami", "katalog buku", "publisher islami", "ziyad books"],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${poppins.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[color:var(--background)] text-[color:var(--foreground)]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
