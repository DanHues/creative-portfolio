import type { Metadata } from "next";
import { DM_Mono, Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });
const mono = DM_Mono({ variable: "--font-mono", weight: ["300", "400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Your Name — Multidisciplinary Creative",
    template: "%s — Your Name",
  },
  description:
    "Photography, worlds, films, brands, code, and physical objects by a multidisciplinary creative.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
