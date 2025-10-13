import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);   // getting token from the localstorage

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token); // update state -> triggers re-render while we register
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
