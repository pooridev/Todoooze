import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

import '../styles/globals.css';
import Layout from '../layout/Layout';
import { SidebarProvider } from '../providers/Sidebar';
import { ModalProvider } from '../providers/Modal';
import { store } from '../redux/store';
import { combineProviders } from '../helpers/combineProviders';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Provider store={store}>
        <ContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContextProvider>
      </Provider>
    </RecoilRoot>
  );
}

const ContextProvider = combineProviders([ModalProvider, SidebarProvider]);

export default MyApp;
