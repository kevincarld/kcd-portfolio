"use client";

import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const strapiGraph: string | undefined =
    process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL;
  if (!strapiGraph) {
    throw new Error(
      "Supply a Strapi GraphQL URL in NEXT_PUBLIC_STRAPI_GRAPHQL_URL"
    );
  }
  const httpLink = new HttpLink({
    uri: strapiGraph,
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
