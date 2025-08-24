import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // simple login: username; if username === 'admin' -> admin
  const login = (username) => {
    const isAdmin = username && username.toLowerCase() === "admin";
    setUser({ username, isAdmin });
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
