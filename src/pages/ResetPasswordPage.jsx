import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthPageShell from '../components/AuthPageShell';
import PasswordField from '../components/PasswordField';
import { useAuth } from '../context/AuthContext';

function ResetPasswordPage() {
  const { resetPassword, validateResetToken } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';

  const tokenStatus = useMemo(() => validateResetToken(token), [token, validateResetToken]);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    const result = resetPassword({ token, password, confirmPassword });

    if (result.ok) {
      setStatus('success');
      setMessage(result.message);
      window.setTimeout(() => navigate('/', { state: { openAuth: 'signin' } }), 1800);
      return;
    }

    setStatus('error');
    setMessage(result.message);
  };

  if (!token || !tokenStatus.valid) {
    return (
      <AuthPageShell
        title="Reset link expired"
        subtitle="This password reset link is invalid or has expired. Request a new one to continue."
        footer={
          <p className="auth-page__footer">
            <Link to="/forgot-password">Request a new reset link</Link>
          </p>
        }
      >
        <p className="auth-page__message auth-page__message--error" role="alert">
          {tokenStatus.message}
        </p>
      </AuthPageShell>
    );
  }

  return (
    <AuthPageShell
      title="Set a new password"
      subtitle={`Create a new password for ${tokenStatus.email}.`}
      footer={
        <p className="auth-page__footer">
          <Link to="/" state={{ openAuth: 'signin' }}>
            Back to sign in
          </Link>
        </p>
      }
    >
      {status === 'success' ? (
        <p className="auth-page__message auth-page__message--success" role="status">
          {message}
        </p>
      ) : (
        <form className="auth-page__form" onSubmit={handleSubmit} noValidate>
          <PasswordField
            label="New password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 6 characters"
            autoComplete="new-password"
            invalid={status === 'error'}
          />

          <PasswordField
            label="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            autoComplete="new-password"
            invalid={status === 'error'}
          />

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
            {status === 'loading' ? 'Updating…' : 'Update password'}
          </button>
        </form>
      )}
    </AuthPageShell>
  );
}

export default ResetPasswordPage;
