import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthPageShell from '../components/AuthPageShell';
import { useAuth } from '../context/AuthContext';

function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetLink, setResetLink] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    setResetLink('');

    const result = requestPasswordReset(email);

    if (result.ok) {
      setStatus('success');
      setMessage(result.message);
      if (result.resetLink) setResetLink(result.resetLink);
      return;
    }

    setStatus('error');
    setMessage(result.message);
  };

  return (
    <AuthPageShell
      title="Forgot your password?"
      subtitle="Enter the email linked to your TasteNest account and we will send reset instructions."
      footer={
        <p className="auth-page__footer">
          Remember your password?{' '}
          <Link to="/" state={{ openAuth: 'signin' }}>
            Sign in
          </Link>
        </p>
      }
    >
      {status === 'success' ? (
        <div className="auth-page__form">
          <p className="auth-page__message auth-page__message--success" role="status">
            {message}
          </p>
          {resetLink && (
            <>
              <p className="auth-page__hint">
                Demo mode: no email server is connected, so use the link below to reset
                your password.
              </p>
              <Link to={resetLink.replace(window.location.origin, '')} className="auth-page__reset-link">
                {resetLink}
              </Link>
            </>
          )}
        </div>
      ) : (
        <form className="auth-page__form" onSubmit={handleSubmit} noValidate>
          <label className="auth-page__field">
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

          {message && (
            <p className="auth-page__message auth-page__message--error" role="alert">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="auth-page__submit"
            disabled={status === 'loading'}
          >
            <span className="auth-page__submit-border" aria-hidden="true" />
            {status === 'loading' ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      )}
    </AuthPageShell>
  );
}

export default ForgotPasswordPage;
