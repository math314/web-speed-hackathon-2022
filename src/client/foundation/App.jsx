import React from "react";
import { StyleSheetManager } from "styled-components";

import { AuthContextProvider } from "./contexts/AuthContext";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/GlobalStyle";

/** @type {React.VFC} */
export const App = () => {
  return (
    <StyleSheetManager disableCSSOMInjection>
      <AuthContextProvider>
        <GlobalStyle />
        <Routes />
      </AuthContextProvider>
    </StyleSheetManager>
  );
};

/** @type {React.VFC} */
export const Html = ({children}) => (
  <html>
    <head>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CyberTicket</title>
    <link rel="preload" as="image" href="/assets/images/hero.avif" />
  </head>
  <body>
    {children}
    <script src="/main.js"></script>
  </body>
  </html>
  );
  