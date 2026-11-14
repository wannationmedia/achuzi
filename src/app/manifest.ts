import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ACHUZI#1 — Your Tomorrow Companion",
    short_name: "ACHUZI#1",
    description:
      "Your AI companion for a brighter tomorrow. Civic, Legal, Health, Work, Learn, Create, Capital, Play and Safety — from Venda to the world.",
    start_url: "/home",
    display: "standalone",
    orientation: "portrait",
    background_color: "#060407",
    theme_color: "#060407",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
