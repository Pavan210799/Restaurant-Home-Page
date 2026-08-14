import './Footer.css';

const aboutLinks = ['Fredoka One', 'Special Dish', 'Reservation', 'Contact'];
const menuLinks = ['Steaks', 'Burgers', 'Coctails', 'Bar B Q', 'Desserts'];
const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/login/' },
  { label: 'Instagram', href: 'https://www.instagram.com/accounts/login/' },
  { label: 'Twitter', href: 'https://x.com/login' },
  { label: 'Youtube', href: 'https://www.youtube.com/' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__layout">
        <img
          src="/images/footer-left-56586a.png"
          alt=""
          className="footer__decoration footer__decoration--left"
          aria-hidden="true"
        />

        <div className="footer__inner">
          <div className="footer__grid">
            <div className="footer__info-card">
              <img
                src="/images/logo-69d896.png"
                alt="TesteNest"
                className="footer__logo"
              />
              <p className="footer__hours">
                Tuesday – Saturday: 12:00pm – 23:00pm
              </p>
              <p className="footer__hours footer__closed">Closed on Sunday</p>
              <p className="footer__rating">5 star rated on TripAdvisor</p>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">About</h3>
              {aboutLinks.map((link) => (
                <a key={link} href="#" className="footer__link">
                  <i className="fa-solid fa-chevron-right" />
                  {link}
                </a>
              ))}
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">Menu</h3>
              {menuLinks.map((link) => (
                <a key={link} href="#" className="footer__link">
                  <i className="fa-solid fa-chevron-right" />
                  {link}
                </a>
              ))}
            </div>

            <div className="footer__column footer__newsletter">
              <h3 className="footer__column-title">Newsletter</h3>
              <p className="footer__newsletter-text">
                Get recent news and updates.
              </p>
              <form
                className="footer__form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="footer__input"
                  type="email"
                  placeholder="Email Address"
                />
                <button type="submit" className="footer__subscribe">
                  Subscribe
                </button>
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

        <img
          src="/images/footer-right-56586a.png"
          alt=""
          className="footer__decoration footer__decoration--right"
          aria-hidden="true"
        />
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
