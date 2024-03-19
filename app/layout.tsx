import { ReactNode } from "react";
import Layout from "../layout/Layout";
import { SidebarProvider } from "../providers/Sidebar";
import { ListsProvider } from "../providers/Lists";
import { combineProviders } from "../helpers/combineProviders";

import "./global.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootProvider>
          <Layout>{children}</Layout>
        </RootProvider>
      </body>
    </html>
  );
}

const RootProvider = combineProviders([ListsProvider, SidebarProvider]);
