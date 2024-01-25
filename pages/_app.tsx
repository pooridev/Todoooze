import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

import "../styles/globals.css";
import Layout from "../layout/Layout";
import { SidebarProvider } from "../providers/Sidebar";
import { ModalProvider } from "../providers/Modal";
import { combineProviders } from "../helpers/combineProviders";
import { ProjectsProvider } from "../providers/Projects";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RootProvider>
  );
}

const RootProvider = combineProviders([ProjectsProvider, ModalProvider, SidebarProvider, ModalProvider]);

export default MyApp;
