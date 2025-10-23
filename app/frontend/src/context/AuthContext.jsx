import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as loginRequest } from '../services/auth.js';
import { clearAuthTokens, setAuthTokens } from '../services/api.js';

const STORAGE_KEY = 'disagua.auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }){
  const [auth, setAuth] = useState(() => {
    if(typeof window === 'undefined') return { user: null, access: null, refresh: null };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return { user: null, access: null, refresh: null };
      const parsed = JSON.parse(raw);
      setAuthTokens({ access: parsed.access, refresh: parsed.refresh });
      return parsed;
    } catch {
      return { user: null, access: null, refresh: null };
    }
  });

  useEffect(() => {
    if(auth?.access){
      setAuthTokens({ access: auth.access, refresh: auth.refresh });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    } else {
      clearAuthTokens();
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [auth]);

  async function login(credentials){
    const response = await loginRequest(credentials);
    setAuth({
      access: response.access,
      refresh: response.refresh,
      user: response.user,
    });
    return response;
  }

  function logout(){
    setAuth({ user: null, access: null, refresh: null });
  }

  const value = useMemo(() => ({
    user: auth?.user || null,
    access: auth?.access || null,
    refresh: auth?.refresh || null,
    isAuthenticated: Boolean(auth?.access),
    login,
    logout,
  }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
  const ctx = useContext(AuthContext);
  if(!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
