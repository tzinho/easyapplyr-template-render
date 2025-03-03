import { type Viewport, type Metadata } from "next";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  title: "Easyapplyr",
  description: "The best A.I Resume Builder",
  manifest: "/manifest.json",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
