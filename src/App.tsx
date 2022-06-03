import React from "react";
import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkVar, isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import NotFoundPage from "./screens/NotFoundPage";
import { GlobalStyles } from "./styles";
import { darkTheme, lightTheme } from "./theme";
import Login from "./screens/Login";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!isLoggedIn ? <Home /> : <Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
