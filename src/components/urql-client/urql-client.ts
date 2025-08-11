// import {AuthConfig, authExchange, AuthUtilities} from '@urql/exchange-auth';
// import {cacheExchange, Client, ErrorLike, Exchange, fetchExchange} from "@urql/core";
// import {CDSUserSignIn} from "./graphql";
// import { Node } from "@node-red/registry";
// import {PASSWORD_FIELD, TOKEN_FIELD, USERNAME_FIELD} from "./constants";
// import {getContextInNode, getContextsInNode, setContextInNode} from "./helpers";
// import * as dotenv from 'dotenv';
// dotenv.config();
//
// export type CDSAuthExchangeConfig = {
//  endpoints: {CDS_GRAPHQL_ENDPOINT: string; CDS_SIGNALS_GRAPHQL_ENDPOINT: string}
// };
// async function getToken (username: string, password: string, endpoint: string) {
//
//  const client = new Client({
//   url: endpoint,
//   exchanges: [fetchExchange],
//  });
//
//   const result = await client.mutation(CDSUserSignIn, {
//    username, password
//   });
//
//   console.log('token result', result);
//
//   const token = result?.data?.authenticateBannerUserWithPassword?.token;
//   return token;
// }
//
// export const cdsAuthExchange = (config: CDSAuthExchangeConfig): Exchange  => {
//  const username = 'wcrowson'
//  const password='password1234'
//  const token_field = null;
//  async function fetchToken() {
//
//   // const [ username, password, _token ] = [USERNAME_FIELD, PASSWORD_FIELD, TOKEN_FIELD]
//   // if (_token) {
//   //  console.log("Existing token...", _token);
//   //  return _token;
//   // }
//
//   const token = await getToken(
//       username, password, config.endpoints.CDS_GRAPHQL_ENDPOINT
//   );
//   // setContextInNode(config.node, TOKEN_FIELD, token);
//   token_field = token
//   console.log("Fetching token...", token);
//   return token;
//  }
//
//  /*
//   * On first load, get the token
//   */
//  if (!token_field) {
//   try {
//
//    fetchToken().then ( initialToken =>   console.log("initialToken", initialToken)
//    );
//   } catch (e) {}
//  }
//  return authExchange(async (utilities: AuthUtilities): Promise<AuthConfig> => ({
//    addAuthToOperation: (operation) => {
//    // const token = getContextInNode(config.node, TOKEN_FIELD)
//    const token = token_field
//    if (!token) {
//      return operation;
//    }
//
//    return utilities.appendHeaders(operation, {
//     Authorization: `Bearer ${token}`,
//    });
//   },
//   didAuthError: (error: ErrorLike): boolean => {
//    return (
//        error?.message?.includes('Unauthorized') ||
//        error?.message?.includes('Forbidden')
//    );
//   },
//   refreshAuth: async () => {
//    await fetchToken();
//   },
//  }));
//
// };
//
// export const getUrqlClient = (config: CDSAuthExchangeConfig): Client => {
//  return new Client({
//   url: config.endpoints.CDS_SIGNALS_GRAPHQL_ENDPOINT,
//   exchanges: [ cdsAuthExchange(config), fetchExchange],
//  });
// }