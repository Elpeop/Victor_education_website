import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi, setAuthToken } from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      try {
        const res = await authApi.me();
        setUser(res.data);
      } catch (err) {
        setAuthToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    // DEV: bypass auth if env var set
    if (import.meta.env.VITE_DEV_AUTH === "true") {
      setUser({ username: "devuser", email: "dev@example.com", is_instructor: true });
      setLoading(false);
      return;
    }

    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authApi.login(credentials);
      const { access, refresh } = response.data;
      
      if (!access) {
        throw new Error("No access token returned");
      }
      
      setAuthToken(access);
      if (refresh) {
        localStorage.setItem("refreshToken", refresh);
      }

      // Fetch user profile
      try {
        const userResponse = await authApi.me();
        setUser(userResponse.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setUser({ email: credentials.email });
      }
      
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || "Login failed";
      setError(errorMsg);
      console.error("Login error:", err);
      return false;
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  // Add refreshUser function to manually refetch user data
  const refreshUser = async () => {
    await fetchUser();
  };

  const value = { user, setUser, loading, error, login, logout, setError, refreshUser };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};