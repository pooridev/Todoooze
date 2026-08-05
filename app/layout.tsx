import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SidebarProvider } from "../providers/Sidebar";
import { ListsProvider } from "../providers/Lists";
import { ProfileProvider } from "../providers/Profile";
import { combineProviders } from "../helpers/combineProviders";
import Layout from "../layout/Layout";

import "./global.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Todoooze",
    template: "%s · Todoooze",
  },
  description: "A fully client-side project management app. Your tasks, your browser, no account needed.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
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
