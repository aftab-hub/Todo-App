import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoDetails from "./pages/TodoDetails";
import { AuthContext } from "./Context/AuthContext";
import ProtectedRoute from "./services/ProtectedRoute";

const App = () => {
  const { token } = useContext(AuthContext); // get token from context

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <Register />}
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
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
