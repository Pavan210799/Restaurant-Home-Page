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
const RESET_KEY = 'tastenest-reset-tokens';
const RESET_TTL_MS = 60 * 60 * 1000;

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

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readResetTokens() {
  try {
    const raw = localStorage.getItem(RESET_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeResetTokens(tokens) {
  localStorage.setItem(RESET_KEY, JSON.stringify(tokens));
}

function pruneResetTokens(tokens) {
  const now = Date.now();
  return tokens.filter((entry) => entry.expiresAt > now);
}

function createResetToken() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
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
    writeUsers(users);
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

  const requestPasswordReset = useCallback((email) => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !EMAIL_PATTERN.test(trimmedEmail)) {
      return { ok: false, message: 'Please enter a valid email address.' };
    }

    const users = readUsers();
    const account = users.find((entry) => entry.email === trimmedEmail);

    if (!account) {
      return {
        ok: true,
        message:
          'If an account exists for that email, reset instructions have been prepared.',
      };
    }

    const token = createResetToken();
    const expiresAt = Date.now() + RESET_TTL_MS;
    const activeTokens = pruneResetTokens(readResetTokens()).filter(
      (entry) => entry.email !== trimmedEmail,
    );

    activeTokens.push({ email: trimmedEmail, token, expiresAt });
    writeResetTokens(activeTokens);

    const resetPath = `/reset-password?token=${encodeURIComponent(token)}`;
    const resetLink =
      typeof window !== 'undefined'
        ? `${window.location.origin}${resetPath}`
        : resetPath;

    return {
      ok: true,
      message: 'Your reset link is ready. Use it within the next hour.',
      resetLink,
    };
  }, []);

  const validateResetToken = useCallback((token) => {
    if (!token) {
      return { valid: false, message: 'No reset token was provided.' };
    }

    const match = pruneResetTokens(readResetTokens()).find(
      (entry) => entry.token === token,
    );

    if (!match) {
      return {
        valid: false,
        message: 'This reset link is invalid or has expired.',
      };
    }

    return { valid: true, email: match.email };
  }, []);

  const resetPassword = useCallback(({ token, password, confirmPassword }) => {
    const tokenStatus = validateResetToken(token);

    if (!tokenStatus.valid) {
      return { ok: false, message: tokenStatus.message };
    }

    if (!password || password.length < 6) {
      return { ok: false, message: 'Password must be at least 6 characters.' };
    }

    if (password !== confirmPassword) {
      return { ok: false, message: 'Passwords do not match.' };
    }

    const users = readUsers();
    const index = users.findIndex((entry) => entry.email === tokenStatus.email);

    if (index === -1) {
      return { ok: false, message: 'Account not found. Please sign up again.' };
    }

    users[index] = { ...users[index], password };
    writeUsers(users);

    const remaining = pruneResetTokens(readResetTokens()).filter(
      (entry) => entry.token !== token,
    );
    writeResetTokens(remaining);

    return {
      ok: true,
      message: 'Password updated! Redirecting you to sign in…',
    };
  }, [validateResetToken]);

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
      requestPasswordReset,
      validateResetToken,
      resetPassword,
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
      requestPasswordReset,
      validateResetToken,
      resetPassword,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
