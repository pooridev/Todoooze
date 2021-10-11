import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

import '../styles/globals.css';
import Layout from '../layout/Layout';
import { SidebarProvider } from '../providers/Sidebar';
import { wrapper } from './../redux/store';
import { ModalProvider } from '../providers/Modal';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <SidebarProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SidebarProvider>
    </ModalProvider>
  );
}

export default wrapper.withRedux(MyApp);
