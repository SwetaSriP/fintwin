'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type StoredUser = { name: string; email: string; password: string };
type PublicUser = Omit<StoredUser, 'password'>;

type AuthContextValue = {
  user: PublicUser | null;
  login: (email: string, password: string) => string | null;
  signup: (name: string, email: string, password: string, confirmPassword: string) => string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const USER_KEY = 'fintwin-user';
const SESSION_KEY = 'fintwin-session';
const publicPaths = new Set(['/login', '/signup']);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function readUser(): StoredUser | null {
  try {
    const value = window.localStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) as StoredUser : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<PublicUser | null>(null);

  useEffect(() => {
    const storedUser = readUser();
    const activeSession = window.localStorage.getItem(SESSION_KEY) === 'active';
    if (storedUser && activeSession) setUser({ name: storedUser.name, email: storedUser.email });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    login(email, password) {
      const storedUser = readUser();
      const normalizedEmail = normalizeEmail(email);
      if (!normalizedEmail || !password) return 'Enter your email and password.';
      if (!storedUser || storedUser.email !== normalizedEmail || storedUser.password !== password) return 'Those details do not match an account.';
      window.localStorage.setItem(SESSION_KEY, 'active');
      setUser({ name: storedUser.name, email: storedUser.email });
      return null;
    },
    signup(name, email, password, confirmPassword) {
      const normalizedEmail = normalizeEmail(email);
      if (name.trim().length < 2) return 'Enter your full name.';
      if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) return 'Enter a valid email address.';
      if (password.length < 8) return 'Use at least 8 characters for your password.';
      if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return 'Password needs one uppercase letter and one number.';
      if (password !== confirmPassword) return 'Passwords do not match.';
      const nextUser = { name: name.trim(), email: normalizedEmail, password };
      window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      window.localStorage.setItem(SESSION_KEY, 'active');
      setUser({ name: nextUser.name, email: nextUser.email });
      return null;
    },
    logout() {
      window.localStorage.removeItem(SESSION_KEY);
      setUser(null);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}

export function AuthGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);
  useEffect(() => {
    if (!ready) return;
    if (!user && !publicPaths.has(pathname)) router.replace('/login');
    if (user && publicPaths.has(pathname)) router.replace('/dashboard');
  }, [pathname, ready, router, user]);

  if (!ready) return <div className="route-loading"><div className="route-loading-mark">F</div><span>Opening your workspace...</span></div>;
  if ((!user && !publicPaths.has(pathname)) || (user && publicPaths.has(pathname))) return null;
  return <>{children}</>;
}
