import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

function AuthModal() {
  const {
    authOpen,
    authMode,
    closeAuth,
    setAuthMode,
    signIn,
    signUp,
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!authOpen) return undefined;

    const onKey = (event) => {
      if (event.key === 'Escape') closeAuth();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [authOpen, closeAuth]);

  useEffect(() => {
    if (!authOpen) return;
    setName('');
    setEmail('');
    setPassword('');
    setMessage('');
    setStatus('idle');
  }, [authOpen, authMode]);

  if (!authOpen) return null;

  const switchMode = (mode) => {
    setAuthMode(mode);
    setMessage('');
    setStatus('idle');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('loading');

    const result =
      authMode === 'signup'
        ? signUp({ name, email, password })
        : signIn({ email, password });

    if (result.ok) {
      setStatus('success');
      return;
    }

    setStatus('error');
    setMessage(result.message);
  };

  return (
    <div className="auth-modal" role="presentation">
      <button
        type="button"
        className="auth-modal__backdrop"
        aria-label="Close sign in"
        onClick={closeAuth}
      />

      <div
        className="auth-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <div className="auth-modal__hero" aria-hidden="true">
          <div className="auth-modal__plate">
            <span className="auth-modal__layer auth-modal__layer--bun-top" />
            <span className="auth-modal__layer auth-modal__layer--lettuce" />
            <span className="auth-modal__layer auth-modal__layer--patty" />
            <span className="auth-modal__layer auth-modal__layer--cheese" />
            <span className="auth-modal__layer auth-modal__layer--bun-bottom" />
          </div>
          <p className="auth-modal__tagline">Taste the difference</p>
        </div>

        <div className="auth-modal__form-wrap">
          <button
            type="button"
            className="auth-modal__close"
            onClick={closeAuth}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>

          <div className="auth-modal__tabs">
            <button
              type="button"
              className={`auth-modal__tab${
                authMode === 'signin' ? ' auth-modal__tab--active' : ''
              }`}
              onClick={() => switchMode('signin')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-modal__tab${
                authMode === 'signup' ? ' auth-modal__tab--active' : ''
              }`}
              onClick={() => switchMode('signup')}
            >
              Join Free
            </button>
          </div>

          <h2 id="auth-modal-title" className="auth-modal__title">
            {authMode === 'signup' ? 'Create your TasteNest account' : 'Welcome back, foodie'}
          </h2>
          <p className="auth-modal__subtitle">
            {authMode === 'signup'
              ? 'Unlock faster ordering and saved favourites.'
              : 'Sign in to checkout and track your orders.'}
          </p>

          <form className="auth-modal__form" onSubmit={handleSubmit} noValidate>
            {authMode === 'signup' && (
              <label className="auth-modal__field">
                <span>Full name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Chef Alex"
                  autoComplete="name"
                  aria-invalid={status === 'error' && !name.trim()}
                />
              </label>
            )}

            <label className="auth-modal__field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
                aria-invalid={status === 'error'}
              />
            </label>

            <label className="auth-modal__field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                autoComplete={
                  authMode === 'signup' ? 'new-password' : 'current-password'
                }
                aria-invalid={status === 'error'}
              />
            </label>

            {message && (
              <p className="auth-modal__error" role="alert">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="auth-modal__submit"
              disabled={status === 'loading'}
            >
              <span className="auth-modal__submit-border" aria-hidden="true" />
              {status === 'loading'
                ? 'Cooking…'
                : authMode === 'signup'
                  ? 'Create Account'
                  : 'Sign In'}
            </button>
          </form>

          <p className="auth-modal__switch">
            {authMode === 'signup' ? 'Already a member?' : 'New here?'}{' '}
            <button
              type="button"
              onClick={() =>
                switchMode(authMode === 'signup' ? 'signin' : 'signup')
              }
            >
              {authMode === 'signup' ? 'Sign in' : 'Create an account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
