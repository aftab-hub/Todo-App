import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoDetails from "./pages/TodoDetails";
import { AuthContext } from "./Context/AuthContext";
import ProtectedRoute from "./services/ProtectedRoute";
import Welcome from "./components/Welcome";

const App = () => {
  const { token } = useContext(AuthContext); // get token from context

  return (
    <BrowserRouter>
      <Routes>
        {/* Welcome page after login/register */}
        <Route
          path="/welcome"
          element={
            token ? (
              <Welcome />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/"
          element={token ? <Navigate to="/welcome" replace /> : <Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todo/:id"
          element={
            <ProtectedRoute>
              <TodoDetails />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={<Navigate to={token ? "/welcome" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
