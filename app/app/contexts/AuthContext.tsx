"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";

type User = {
  name: string;
  username: string;
  email: string;
  pictureUrl: string;
}

interface AuthContextData {
  user: User | null;
  Login(data: InputLogin): Promise<void>;
  Logout(): void;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

type InputLogin = {
  email: string;
  password: string;
}

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem("@App:user");
    const storagedToken = localStorage.getItem("@App:token");

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
    }
  }, []);

  async function Login(data: InputLogin) {
    const response = await api.post("/users/authenticate", data);
    if (response.status === 200) {
      setUser(response.data.user);
      api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      localStorage.setItem("@App:user", JSON.stringify(response.data.user));
      localStorage.setItem("@App:token", response.data.token);
    }
  }

  function Logout() {
    setUser(null);
    localStorage.removeItem("@App:user");
    localStorage.removeItem("@App:token");
  }

  return (
    <AuthContext.Provider value={{ user, Login, Logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export default AuthContext;