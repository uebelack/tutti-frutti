import { Auth0Provider } from '@auth0/auth0-react';
import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ElementType } from 'react';

import Authentication from '../components/providers/AuthenticationCheckProvider';
import RootLayoutProvider from '../components/providers/RootLayoutProvider';
import SecureApolloProvider from '../components/providers/SecureApolloProvider';

import '@szhsin/react-menu/dist/index.css';
import '../styles/styles.css';

function CustomApp({
  Component,
  pageProps,
}: AppProps & {
  Component: { Layout?: ElementType };
}) {
  const ComponentLayout = Component.Layout;

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={typeof window !== 'undefined' && window.location.origin}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
      scope="play:games"
      cacheLocation="localstorage"
    >
      <SecureApolloProvider>
        <Head>
          <title>Tutti Frutti</title>
        </Head>
        <main className="app backdrop:bg-white">
          <Authentication>
            <RootLayoutProvider>
              <AnimatePresence mode="wait">
                {ComponentLayout ? (
                  <ComponentLayout {...pageProps}>
                    <Component {...pageProps} />
                  </ComponentLayout>
                ) : (
                  <Component {...pageProps} />
                )}
              </AnimatePresence>
            </RootLayoutProvider>
          </Authentication>
        </main>
      </SecureApolloProvider>
    </Auth0Provider>
  );
}

export default CustomApp;
