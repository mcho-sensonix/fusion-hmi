import ReactDOM from 'react-dom/client';
import App from './App';
import {StrictMode} from "react";
import {BrowserRouter} from "react-router-dom";
import {MantineProvider} from "@mantine/core";
import {theme} from "./theme.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <MantineProvider theme={theme}>
   <BrowserRouter>
     <App/>
   </BrowserRouter>
  </MantineProvider>
  </StrictMode>
);