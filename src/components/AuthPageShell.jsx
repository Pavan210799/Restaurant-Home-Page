import { Link } from 'react-router-dom';
import './AuthPage.css';

function AuthPageShell({ title, subtitle, children, footer }) {
  return (
    <div className="auth-page">
      <div className="auth-page__panel">
        <div className="auth-page__hero" aria-hidden="true">
          <Link to="/" className="auth-page__logo-link" aria-label="TasteNest home">
            <img
              src="/images/logo-69d896.png"
              alt=""
              className="auth-page__logo"
              width={140}
              height={68}
            />
          </Link>
          <div className="auth-page__plate">
            <span className="auth-page__layer auth-page__layer--bun-top" />
            <span className="auth-page__layer auth-page__layer--lettuce" />
            <span className="auth-page__layer auth-page__layer--patty" />
            <span className="auth-page__layer auth-page__layer--cheese" />
            <span className="auth-page__layer auth-page__layer--bun-bottom" />
          </div>
          <p className="auth-page__tagline">Taste the difference</p>
        </div>

        <div className="auth-page__form-wrap">
          <Link to="/" className="auth-page__back" aria-label="Back to home">
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            <span>Back to home</span>
          </Link>

          <h1 className="auth-page__title">{title}</h1>
          {subtitle && <p className="auth-page__subtitle">{subtitle}</p>}

          {children}

          {footer}
        </div>
      </div>
    </div>
  );
}

export default AuthPageShell;
