// frontend/src/AuthProviderWrapper.jsx
import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api";

// const AuthContext = createContext();
export const AuthContext = createContext(); 
export function AuthProviderWrapper({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("auth")) || null
  );

  const login = async (username, password) => {
    const data = await loginUser(username, password);
    if (data.token) {
      const authData = { username, role: data.role, token: data.token };
      setUser(authData);
      localStorage.setItem("auth", JSON.stringify(authData));
    }
    return data;
  };

  const register = async (username, password) => {
    return await registerUser(username, password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
