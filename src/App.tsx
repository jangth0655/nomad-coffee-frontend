import React from "react";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkVar, isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import NotFoundPage from "./screens/NotFoundPage";
import { GlobalStyles } from "./styles";
import { darkTheme, lightTheme } from "./theme";
import Login from "./screens/Login";
import routes from "./routes";
import SignUp from "./screens/SignUp";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              {!isLoggedIn ? (
                <Route path={routes.signUp} element={<SignUp />} />
              ) : null}
              <Route
                path={routes.home}
                element={isLoggedIn ? <Home /> : <Login />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
