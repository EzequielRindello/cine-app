import { createContext, useContext, useState } from "react";
import * as loginService from "../services/loginService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  const login = async (email, password) => {
    try {
      const res = await loginService.login(email, password);
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("token", res.token);
      setAuthError("");
      return { success: true };
    } catch (err) {
      setAuthError("Invalid credentials");
      return { success: false };
    }
  };

  const register = async (data) => {
  try {
    const res = await loginService.register(data);
    // auto-login after registration
    await login(data.email, data.password);
    return { success: true };
  } catch (err) {
    setAuthError("Registration failed");
    return { success: false };
  }
};


  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, register, logout, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
