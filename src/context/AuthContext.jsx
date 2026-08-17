import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext(null);
const USERS_KEY = 'tastenest-users';
const SESSION_KEY = 'tastenest-session';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.email && parsed?.name) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // signin | signup
  const [splashOpen, setSplashOpen] = useState(false);
  const [splashMessage, setSplashMessage] = useState('');
  const [splashKey, setSplashKey] = useState(0);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch {
      /* ignore */
    }
  }, [user]);

  const openAuth = useCallback((mode = 'signin') => {
    setAuthMode(mode);
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const closeSplash = useCallback(() => {
    setSplashOpen(false);
    setSplashMessage('');
  }, []);

  const showWelcomeSplash = useCallback((name) => {
    const first = name.trim().split(' ')[0] || 'foodie';
    setSplashMessage(`Welcome back, ${first}!`);
    setSplashKey((key) => key + 1);
    setSplashOpen(true);
  }, []);

  const signUp = useCallback(({ name, email, password }) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) return { ok: false, message: 'Please enter your name.' };
    if (!trimmedEmail || !EMAIL_PATTERN.test(trimmedEmail)) {
      return { ok: false, message: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 6) {
      return { ok: false, message: 'Password must be at least 6 characters.' };
    }

    const users = readUsers();
    if (users.some((entry) => entry.email === trimmedEmail)) {
      return { ok: false, message: 'An account with this email already exists.' };
    }

    users.push({ name: trimmedName, email: trimmedEmail, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser({ name: trimmedName, email: trimmedEmail });
    setAuthOpen(false);
    showWelcomeSplash(trimmedName);
    return { ok: true };
  }, [showWelcomeSplash]);

  const signIn = useCallback(({ email, password }) => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !EMAIL_PATTERN.test(trimmedEmail)) {
      return { ok: false, message: 'Please enter a valid email address.' };
    }
    if (!password) return { ok: false, message: 'Please enter your password.' };

    const match = readUsers().find(
      (entry) => entry.email === trimmedEmail && entry.password === password,
    );

    if (!match) {
      return { ok: false, message: 'Email or password is incorrect.' };
    }

    setUser({ name: match.name, email: match.email });
    setAuthOpen(false);
    showWelcomeSplash(match.name);
    return { ok: true };
  }, [showWelcomeSplash]);

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({
      user,
      authOpen,
      authMode,
      splashOpen,
      splashMessage,
      splashKey,
      openAuth,
      closeAuth,
      closeSplash,
      setAuthMode,
      signUp,
      signIn,
      signOut,
    }),
    [
      user,
      authOpen,
      authMode,
      splashOpen,
      splashMessage,
      splashKey,
      openAuth,
      closeAuth,
      closeSplash,
      signUp,
      signIn,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
