import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => {
    setUser(username);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout"); // backend clears JWT cookie
    } catch (e) {
      console.error("Logout failed:", e);
    }
    setUser(null);
  };

  // ✅ Check if user is already logged in when app loads
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.username);  // ✅ ensure correct structure
    } catch {
      setUser(null);
    }
  };
  fetchUser();
}, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
