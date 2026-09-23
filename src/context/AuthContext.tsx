import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, setToken } from '../api/client';

export type Role = 'student' | 'teacher' | 'advisor' | 'editor' | 'admin' | 'super_admin';

export interface AuthUser {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  studentRef: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string, studentRef?: string) => Promise<AuthUser>;
  register: (email: string, password: string, fullName: string) => Promise<AuthUser>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!localStorage.getItem('pluriperf_token')) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { user: u } = await api.get<{ user: AuthUser }>('/auth/me');
      setUser(u);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string, studentRef?: string) => {
    const res = await api.post<{ token: string; user: AuthUser }>('/auth/login', {
      email,
      password,
      studentRef,
    });
    setToken(res.token);
    setUser(res.user);
    return res.user;
  }, []);

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    const res = await api.post<{ token: string; user: AuthUser }>('/auth/register', {
      email,
      password,
      fullName,
    });
    setToken(res.token);
    setUser(res.user);
    return res.user;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refresh }),
    [user, loading, login, register, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}