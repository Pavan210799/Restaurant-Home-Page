import { useState, useEffect } from 'react';
import './Header.css';

const navItems = [
  { label: 'Home', hasChevron: true },
  { label: 'About Us', hasChevron: false },
  { label: 'Shop', hasChevron: true },
  { label: 'Blog', hasChevron: true },
  { label: 'Pages', hasChevron: true },
  { label: 'Contact', hasChevron: false },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1200) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header${menuOpen ? ' header--menu-open' : ''}`}>
      <div className="header__container">
        <a href="#" className="header__logo" onClick={closeMenu}>
          <img src="/images/logo-69d896.png" alt="TesteNest" width={150} height={73} />
        </a>

        <nav className="header__nav" aria-label="Primary">
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.label} className="header__nav-item">
                <a href="#" className="header__nav-link">
                  {item.label}
                  {item.hasChevron && (
                    <i className="fa-solid fa-chevron-down header__chevron" aria-hidden="true" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button className="header__cart" aria-label="Cart">
            <i className="fa-solid fa-shopping-basket" />
            <span className="header__cart-badge">0</span>
          </button>
          <button type="button" className="header__contact-btn">
            Contact Us
          </button>
          <button
            type="button"
            className="header__hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="header__hamburger-line header__hamburger-line--short" />
            <span className="header__hamburger-line header__hamburger-line--long" />
            <span className="header__hamburger-line header__hamburger-line--short" />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`header__mobile${menuOpen ? ' header__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="header__mobile-nav" aria-label="Mobile">
          <ul className="header__mobile-list">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href="#" className="header__mobile-link" onClick={closeMenu}>
                  {item.label}
                  {item.hasChevron && (
                    <i className="fa-solid fa-chevron-down header__chevron" aria-hidden="true" />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="header__mobile-contact" onClick={closeMenu}>
            Contact Us
          </button>
        </nav>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="header__backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}

export default Header;
