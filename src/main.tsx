import ReactDOM from 'react-dom/client';
import App from './App';
import {StrictMode} from "react";
import {BrowserRouter} from "react-router-dom";
import {MantineProvider} from "@mantine/core";
import {theme} from "./theme.ts";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {Client, cacheExchange, fetchExchange} from "@urql/core";
import {Provider as UrqlProvider} from "urql";

// const client = new Client({
//  url :'/api', // Your GraphQL API endpoint
//  exchanges: [cacheExchange,fetchExchange], //  Exchanges like fetchExchange for network requests
//
// });
const client = new ApolloClient({
 uri: '/api',
 cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <MantineProvider theme={theme}>
   <BrowserRouter>
    <ApolloProvider client={client}>
     <App/>
    </ApolloProvider>
   </BrowserRouter>
  </MantineProvider>
  </StrictMode>
);