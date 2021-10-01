import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

import Layout from '../layout/Layout';
import { store } from '../redux/store';
import { SidebarProvider } from '../providers/Sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SidebarProvider>
    </Provider>
  );
}

export default MyApp;
