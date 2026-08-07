import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SidebarProvider } from "../providers/Sidebar";
import { ListsProvider } from "../providers/Lists";
import { ProfileProvider } from "../providers/Profile";
import { combineProviders } from "../helpers/combineProviders";
import Layout from "../layout/Layout";
import OfflineBanner from "../components/OfflineBanner";

import "./global.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Todoooze",
    template: "%s · Todoooze",
  },
  description: "A fully client-side project management app. Works offline — your data stays on this device.",
  applicationName: "Todoooze",
  manifest: "/manifest.webmanifest",
  themeColor: "#1f2023",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Todoooze",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <OfflineBanner />
        {/* The app shell (sidebar + main area) lives in the root layout so it
            persists across route navigations instead of remounting per page. */}
        <RootProvider>
          <Layout>{children}</Layout>
        </RootProvider>
      </body>
    </html>
  );
}

const RootProvider = combineProviders([ListsProvider, SidebarProvider, ProfileProvider]);
