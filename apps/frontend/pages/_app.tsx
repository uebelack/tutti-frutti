import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import Head from 'next/head';
import apolloClient from '../apollo.client';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}

export default CustomApp;
