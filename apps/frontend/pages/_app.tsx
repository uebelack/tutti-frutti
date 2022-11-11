import { AppProps } from 'next/app';
import { Auth0Provider } from '@auth0/auth0-react';

import Head from 'next/head';
import SecureApolloProvider from '../components/SecureApolloProvider';
import Authentication from '../components/Authentication';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  console.log(process.env.NEXT_PUBLIC_AUTH0_DOMAIN);
  console.log(process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID);
  console.log(process.env.NEXT_PUBLIC_AUTH0_AUDIENCE);
  console.log(window.location.origin);
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
        <main className="app">
          <Authentication>
            <Component {...pageProps} />
          </Authentication>
        </main>
      </SecureApolloProvider>
    </Auth0Provider>
  );
}

export default CustomApp;
