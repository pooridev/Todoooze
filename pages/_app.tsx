import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

import Layout from '../layout/Layout';
import { store } from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </Provider>
  );
}

export default MyApp;
