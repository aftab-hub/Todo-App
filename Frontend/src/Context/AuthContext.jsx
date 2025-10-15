import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);   // getting token from the localstorage

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token); // update state -> triggers re-render while we register
  };

  
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000; // milliseconds
      const now = Date.now();

      if (now >= expiryTime) {
        logout(); // Token already expired
        return;
      }

      // Auto logout when the token expires
      const timeout = expiryTime - now;
      const timer = setTimeout(() => {
        logout();
      }, timeout);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
