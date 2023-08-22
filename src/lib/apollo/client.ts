"server-only";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
export { gql } from "@apollo/client";

export const { getClient } = registerApolloClient(() => {
  const strapiGraph: string | undefined =
    process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL;
  if (!strapiGraph) {
    throw new Error(
      "Supply a Strapi GraphQL URL in NEXT_PUBLIC_STRAPI_GRAPHQL_URL"
    );
  }

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: strapiGraph,
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});
export const apollo = getClient();
export default apollo;
