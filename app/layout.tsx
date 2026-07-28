import type { Metadata } from "next";
import { DM_Mono, Heebo } from "next/font/google";
import "./globals.css";

const sans = Heebo({ variable: "--font-sans", subsets: ["latin"] });
const mono = DM_Mono({
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

const siteUrl = "https://danhues.github.io/creative-portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DanHues — Multidisciplinary Creative",
    template: "%s — DanHues",
  },
  description:
    "Photography, Minecraft worlds, films, brands, code, 3D design, and physical objects by DanHues.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "DanHues — Multidisciplinary Creative",
    description:
      "A living archive of images, worlds, stories, brands, code, and physical objects.",
    url: siteUrl,
    siteName: "DanHues",
    images: [
      {
        url: `${siteUrl}/danhues-banner.png`,
        width: 854,
        height: 480,
        alt: "DanHues logo in layered pink and purple forms",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'if(navigator.userAgent.includes("Firefox")){const e=document.documentElement;e.classList.add("is-firefox");let t=0;addEventListener("scroll",()=>{e.classList.add("is-scrolling");clearTimeout(t);t=setTimeout(()=>e.classList.remove("is-scrolling"),140)},{passive:true})}',
          }}
        />
      </head>
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
