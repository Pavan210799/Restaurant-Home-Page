import { useState } from 'react';
import './Footer.css';

const aboutLinks = [
  { label: 'Fredoka One', href: '#about' },
  { label: 'Special Dish', href: '#deals' },
  { label: 'Reservation', href: '#contact' },
  { label: 'Contact', href: '#contact' },
];

const menuLinks = [
  { label: 'Steaks', href: '#menu' },
  { label: 'Burgers', href: '#menu' },
  { label: 'Coctails', href: '#complimentary' },
  { label: 'Bar B Q', href: '#categories' },
  { label: 'Desserts', href: '#menu' },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/login/' },
  { label: 'Instagram', href: 'https://www.instagram.com/accounts/login/' },
  { label: 'Twitter', href: 'https://x.com/login' },
  { label: 'Youtube', href: 'https://www.youtube.com/' },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | success
  const [message, setMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!value) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    if (!EMAIL_PATTERN.test(value)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setMessage('Subscribed! Thanks for joining.');
    setEmail('');
  };

  return (
    <footer id="contact" className="footer">
      <div className="footer__layout">
        <div className="footer__art footer__art--left" aria-hidden="true">
          <img
            src="/images/footer-left-56586a.png"
            alt=""
            className="footer__decoration footer__decoration--left"
          />
        </div>

        <div className="footer__inner">
          <div className="footer__grid">
            <div className="footer__info-card">
              <a href="#home">
                <img
                  src="/images/logo-69d896.png"
                  alt="TesteNest"
                  className="footer__logo"
                />
              </a>
              <p className="footer__hours">
                Tuesday – Saturday: 12:00pm – 23:00pm
              </p>
              <p className="footer__hours footer__closed">Closed on Sunday</p>
              <p className="footer__rating">5 star rated on TripAdvisor</p>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">About</h3>
              {aboutLinks.map((link) => (
                <a key={link.label} href={link.href} className="footer__link">
                  <i className="fa-solid fa-chevron-right" />
                  {link.label}
                </a>
              ))}
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">Menu</h3>
              {menuLinks.map((link) => (
                <a key={link.label} href={link.href} className="footer__link">
                  <i className="fa-solid fa-chevron-right" />
                  {link.label}
                </a>
              ))}
            </div>

            <div className="footer__column footer__newsletter">
              <h3 className="footer__column-title">Newsletter</h3>
              <p className="footer__newsletter-text">
                Get recent news and updates.
              </p>
              <form className="footer__form" onSubmit={handleSubscribe} noValidate>
                <input
                  className={`footer__input${
                    status === 'error' ? ' footer__input--error' : ''
                  }`}
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') {
                      setStatus('idle');
                      setMessage('');
                    }
                  }}
                  placeholder="Email Address"
                  aria-invalid={status === 'error'}
                  aria-describedby={message ? 'footer-newsletter-msg' : undefined}
                  autoComplete="email"
                />
                <button type="submit" className="footer__subscribe">
                  Subscribe
                </button>
                {message && (
                  <p
                    id="footer-newsletter-msg"
                    className={`footer__form-message footer__form-message--${status}`}
                    role={status === 'error' ? 'alert' : 'status'}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copyright">
              <span className="footer__brand">© 2025 TesteNest</span> | All
              shawonetc3 Themes.
            </p>
            <div className="footer__social">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__art footer__art--right" aria-hidden="true">
          <img
            src="/images/footer-right-56586a.png"
            alt=""
            className="footer__decoration footer__decoration--right"
          />
        </div>
      </div>

      <img
        src="/images/animation-56586a.png"
        alt=""
        className="footer__animation"
        aria-hidden="true"
      />
    </footer>
  );
}

export default Footer;
