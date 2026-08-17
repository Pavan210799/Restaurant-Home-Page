import { useCallback, useState } from 'react';
import HomePage from './pages/HomePage';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import SplashScreen from './components/SplashScreen';

const INTRO_SPLASH_KEY = 'tastenest-splash-seen';

function AppContent() {
  const { splashOpen, splashMessage, splashKey, closeSplash } = useAuth();
  const [introDone, setIntroDone] = useState(() => {
    try {
      return !!sessionStorage.getItem(INTRO_SPLASH_KEY);
    } catch {
      return true;
    }
  });

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
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
