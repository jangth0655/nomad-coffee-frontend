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
import CreateShops from "./screens/shops/CreateShop";
import EditShop from "./screens/shops/EditShop";
import Me from "./screens/shops/user/Me";
import Profile from "./screens/shops/user/Profile";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
              {!isLoggedIn ? (
                <Route path={routes.signUp} element={<SignUp />} />
              ) : null}
              <Route
                path={routes.home}
                element={isLoggedIn ? <Home /> : <Login />}
              />
              <Route path={routes.upload} element={<CreateShops />} />
              <Route path={routes.editShop} element={<EditShop />} />
              <Route path={routes.me} element={<Me />} />
              <Route path={routes.profile} element={<Profile />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
