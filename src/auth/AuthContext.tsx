import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isTokenValid: () => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// Función para verificar si un token JWT ha expirado
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error al decodificar token:", error);
    return true; // Si no se puede decodificar, consideramos que está expirado
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      // Verificar si el token está expirado
      if (isTokenExpired(savedToken)) {
        console.warn("Token expirado encontrado en localStorage, limpiando...");
        localStorage.removeItem("token");
        setToken(null);
      } else {
        setToken(savedToken);
      }
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isTokenValid = (): boolean => {
    if (!token) return false;
    return !isTokenExpired(token);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};
