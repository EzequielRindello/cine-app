import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import * as loginService from "../../services/loginService";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [pendingAuth, setPendingAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(userData);

          await loginService.getUserById(userData.id);
        } catch (err) {
          console.error("Token inválido o expirado:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken("");
          setUser(null);
        }
      } else if (storedToken) {
        localStorage.removeItem("token");
        setToken("");
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginService.login(email, password);
      setPendingAuth({ token: res.token, user: res.user, userId: res.user.id });
      localStorage.setItem("token", res.token);
      setAuthError("");
      return { success: true };
    } catch {
      setAuthError("Invalid credentials");
      return { success: false };
    }
  };

  const completeLogin = async () => {
    if (pendingAuth) {
      setToken(pendingAuth.token);
      try {
        const userData = await loginService.getUserById(pendingAuth.userId);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.error("Error fetching user data:", err);
        setUser(pendingAuth.user);
        localStorage.setItem("user", JSON.stringify(pendingAuth.user));
      }
      setPendingAuth(null);
    }
  };

  const register = async (data) => {
    try {
      await loginService.register(data);
      await login(data.email, data.password);
      return { success: true };
    } catch {
      setAuthError("Registration failed");
      return { success: false };
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    setPendingAuth(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        register,
        logout,
        authError,
        completeLogin,
        pendingAuth,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
