import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/siteConfig";
import CipoBot from "./components/CipoBot";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_CONFIG.seo.title,
  description: SITE_CONFIG.seo.description,
  keywords: [
    "constructora",
    "Talca",
    "remodelación",
    "construcción habitacional",
    "obras civiles",
    "Cipo",
  ],
  openGraph: {
    title: SITE_CONFIG.name,
    description: "Construimos el espacio que mereces. Talca, Chile.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full antialiased bg-[#020205] text-[#f5f0e8]">
        {children}
        <CipoBot />
      </body>
    </html>
  );
}
