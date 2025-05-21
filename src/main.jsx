import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import theme from "./styles/theme";
import { AuthProvider } from "./context/AuthContext";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-weight: 500;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background: #F6F7F9;
    color: #222;
    min-height: 100vh;
  }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
