import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styled from "styled-components";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Components
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./context/AuthContext";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth(false);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("sessionToken");
    setIsAuthenticated(!!sessionToken);
  }, [setIsAuthenticated]);

  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard setIsAuthenticated={setIsAuthenticated} />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
