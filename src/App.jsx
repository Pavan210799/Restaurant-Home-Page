import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import SplashScreen from './components/SplashScreen';

const INTRO_SPLASH_KEY = 'tastenest-splash-seen';

function MainApp() {
  const { splashOpen, splashMessage, splashKey, closeSplash, openAuth } = useAuth();
  const location = useLocation();
  const [introDone, setIntroDone] = useState(() => {
    try {
      return !!sessionStorage.getItem(INTRO_SPLASH_KEY);
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const authIntent = location.state?.openAuth;
    if (authIntent === 'signin' || authIntent === 'signup') {
      openAuth(authIntent);
    }
  }, [location.state, openAuth]);

  const onIntroDone = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SPLASH_KEY, '1');
    } catch {
      /* ignore */
    }
    setIntroDone(true);
  }, []);

  const showIntro = !introDone;
  const showAuthSplash = splashOpen;

  return (
    <>
      {introDone && <HomePage />}
      {showIntro && (
        <SplashScreen
          key="intro"
          message="Preparing something delicious…"
          onDone={onIntroDone}
        />
      )}
      {showAuthSplash && (
        <SplashScreen
          key={`auth-${splashKey}`}
          message={splashMessage}
          onDone={closeSplash}
        />
      )}
      <AuthModal />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
