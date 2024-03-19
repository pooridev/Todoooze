import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

import "../styles/globals.css";
import Layout from "../layout/Layout";
import { SidebarProvider } from "../providers/Sidebar";

import { combineProviders } from "../helpers/combineProviders";
import { ListsProvider } from "../providers/Lists";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RootProvider>
  );
}

const RootProvider = combineProviders([ListsProvider, SidebarProvider]);

export default MyApp;
