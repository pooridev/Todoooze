import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

import '../styles/globals.css';
import Layout from '../layout/Layout';
import { SidebarProvider } from '../providers/Sidebar';
import { ModalProvider } from '../providers/Modal';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ModalProvider>
        <SidebarProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SidebarProvider>
      </ModalProvider>
    </Provider>
  );
}

export default MyApp;
