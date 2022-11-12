import React, { useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  ApolloProvider, ApolloClient, InMemoryCache, createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

function SecureApolloProvider({ children }) {
  const {
    isAuthenticated, getAccessTokenSilently,
  } = useAuth0();

  const apolloClient = useMemo(() => {
    if (isAuthenticated) {
      const httpLink = createHttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
      });

      const authLink = setContext(async (_, { headers }) => {
        const token = await getAccessTokenSilently({
          audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
          scope: 'manage:quizzes',
        });

        return {
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          },
        };
      });

      return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      });
    }

    return new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
      cache: new InMemoryCache(),
    });
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
  );
}

export default SecureApolloProvider;
