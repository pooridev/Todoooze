import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

import '../styles/globals.css';
import Layout from '../layout/Layout';
import { SidebarProvider } from '../providers/Sidebar';
import { wrapper } from './../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SidebarProvider>
  );
}

export default wrapper.withRedux(MyApp);
