import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

import "../styles/globals.css";
import Layout from "../layout/Layout";
import { SidebarProvider } from "../providers/Sidebar";
import { ModalProvider } from "../providers/Modal";
import { store } from "../redux/store";
import { combineProviders } from "../helpers/combineProviders";
import { ProjectsProvider } from "../providers/Projects";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </Provider>
  );
}

const ContextProvider = combineProviders([
  ProjectsProvider,
  ModalProvider,
  SidebarProvider,
  ModalProvider,
]);

export default MyApp;
