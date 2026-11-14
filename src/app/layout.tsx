import type { Metadata, Viewport } from "next";
import "@fontsource/orbitron/500.css";
import "@fontsource/orbitron/600.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/800.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://achuzi.wannation.africa"),
  title: "ACHUZI#1 — Your Tomorrow Companion",
  description:
    "ACHUZI#1 is WANNATION HOLDINGS' Afrofuturist AI companion — civic guidance, health, work, learning, creativity, capital, culture and safety in your own language, from Venda to the world.",
  applicationName: "ACHUZI#1",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ACHUZI#1",
  },
  openGraph: {
    title: "ACHUZI#1 — Your Tomorrow Companion",
    description:
      "Afrofuturist AI companion from WANNATION HOLDINGS. From Venda to the world.",
    images: ["/brand/anubis-hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/anubis-hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#060407",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-void text-ink">
        {children}
      </body>
    </html>
  );
}
