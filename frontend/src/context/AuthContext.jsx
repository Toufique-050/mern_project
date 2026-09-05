import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../services/authService";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }
    getCurrentUser().then((data) => setUser(data.user)).catch(() => localStorage.removeItem("token")).finally(() => setLoading(false));
    const onExpired = () => { localStorage.removeItem("token"); setUser(null); };
    window.addEventListener("eventsphere:auth-expired", onExpired);
    return () => window.removeEventListener("eventsphere:auth-expired", onExpired);
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    if (data.success) { localStorage.setItem("token", data.token); setUser(data.user); }
    return data;
  };
  const register = async (payload) => {
    const data = await registerUser(payload);
    if (data.success && data.token) { localStorage.setItem("token", data.token); setUser(data.user); }
    return data;
  };
  const logout = () => { localStorage.removeItem("token"); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
