import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { login as apiLogin, register as apiRegister, setToken, logout as apiLogout, getToken } from "../api/authApi";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  // 🔹 Restaurer le token et l’utilisateur au démarrage
  useEffect(() => {
    const token = getToken();
    if (token) {
      setToken(token); // configure axios avec le header Authorization
      // tu peux stocker l’email dans localStorage aussi si besoin
      const savedEmail = localStorage.getItem("email");
      if (savedEmail) setUser(savedEmail);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { token } = await apiLogin(email, password);
    setToken(token);
    localStorage.setItem("email", email); // 🔹 stocker l’email
    setUser(email);
  };

  const register = async (email: string, password: string) => {
    const { token } = await apiRegister(email, password);
    setToken(token);
    localStorage.setItem("email", email);
    setUser(email);
  };

  const logout = () => {
    apiLogout();
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
