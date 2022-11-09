import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { Auth0Provider } from '@auth0/auth0-react';

import Head from 'next/head';
import apolloClient from '../apollo.client';
import Authentication from '../components/Authentication';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={typeof window !== 'undefined' && window.location.origin}
      // audience={`${window.location.origin}/api/v1`}
      // scope="manage:quizzes"
      cacheLocation="localstorage"
    >
      <ApolloProvider client={apolloClient}>
        <Head>
          <title>Tutti Frutti</title>
        </Head>
        <main className="app">
          <Authentication>
            <Component {...pageProps} />
          </Authentication>
        </main>
      </ApolloProvider>
    </Auth0Provider>
  );
}

export default CustomApp;
