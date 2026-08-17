import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartDrawer from './CartDrawer';
import './Header.css';

const navItems = [
  { label: 'Home', href: '#home', hasChevron: true },
  { label: 'About Us', href: '#about', hasChevron: false },
  { label: 'Shop', href: '#menu', hasChevron: true },
  { label: 'Blog', href: '#blog', hasChevron: true },
  { label: 'Pages', href: '#packages', hasChevron: true },
  { label: 'Contact', href: '#contact', hasChevron: false },
];

const SECTION_IDS = navItems.map((item) => item.href.slice(1));

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');
  const { count, cartBump } = useCart();
  const { user, openAuth, signOut } = useAuth();

  const cartButtonRef = useRef(null);
  const cartPanelRef = useRef(null);
  const userButtonRef = useRef(null);
  const userPanelRef = useRef(null);
  const [cartBumping, setCartBumping] = useState(false);

  useEffect(() => {
    if (!cartBump) return undefined;
    setCartBumping(true);
    const id = window.setTimeout(() => setCartBumping(false), 520);
    return () => window.clearTimeout(id);
  }, [cartBump]);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!cartOpen) return undefined;

    const onPointerDown = (event) => {
      const insidePanel = cartPanelRef.current?.contains(event.target);
      const onButton = cartButtonRef.current?.contains(event.target);
      if (!insidePanel && !onButton) setCartOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setCartOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [cartOpen]);

  useEffect(() => {
    if (!userOpen) return undefined;

    const onPointerDown = (event) => {
      const insidePanel = userPanelRef.current?.contains(event.target);
      const onButton = userButtonRef.current?.contains(event.target);
      if (!insidePanel && !onButton) setUserOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setUserOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [userOpen]);

  useEffect(() => {
    const headerOffset = 110;

    const updateActive = () => {
      const scrollY = window.scrollY + headerOffset;
      let current = '#home';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) {
          current = `#${id}`;
        }
      }

      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 40) {
        current = '#contact';
      }

      setActiveHref(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const badgeLabel = count > 99 ? '99+' : String(count);
  const initial = user?.name?.charAt(0)?.toUpperCase() ?? '?';

  return (
    <header
      className={`header${menuOpen ? ' header--menu-open' : ''}${
        scrolled ? ' header--scrolled' : ''
      }`}
    >
      <div className="header__container">
        <a href="#home" className="header__logo" onClick={closeMenu}>
          <img src="/images/logo-69d896.png" alt="TesteNest" width={150} height={73} />
        </a>

        <nav className="header__nav" aria-label="Primary">
          <ul className="header__nav-list">
            {navItems.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <li key={item.label} className="header__nav-item">
                  <a
                    href={item.href}
                    className={`header__nav-link${isActive ? ' header__nav-link--active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {item.hasChevron && (
                      <i className="fa-solid fa-chevron-down header__chevron" aria-hidden="true" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header__actions">
          <button
            type="button"
            ref={cartButtonRef}
            className={`header__cart${cartBumping ? ' header__cart--bump' : ''}`}
            aria-label={`Your bag, ${count} item${count === 1 ? '' : 's'}`}
            aria-expanded={cartOpen}
            aria-haspopup="dialog"
            onClick={() => {
              setCartOpen((open) => !open);
              setMenuOpen(false);
              setUserOpen(false);
            }}
          >
            <i className="fa-solid fa-shopping-basket" />
            <span
              className={`header__cart-badge${
                cartBumping ? ' header__cart-badge--bump' : ''
              }`}
            >
              {badgeLabel}
            </span>
          </button>

          {user ? (
            <div className="header__user-wrap">
              <button
                type="button"
                ref={userButtonRef}
                className="header__user-btn"
                aria-expanded={userOpen}
                aria-haspopup="true"
                onClick={() => {
                  setUserOpen((open) => !open);
                  setCartOpen(false);
                }}
              >
                <span className="header__user-avatar">{initial}</span>
                <span className="header__user-name">{user.name.split(' ')[0]}</span>
              </button>
              {userOpen && (
                <div className="header__user-menu" ref={userPanelRef}>
                  <p className="header__user-greet">Hi, {user.name}!</p>
                  <p className="header__user-email">{user.email}</p>
                  <button
                    type="button"
                    className="header__user-signout"
                    onClick={() => {
                      signOut();
                      setUserOpen(false);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              className="header__signin"
              onClick={() => {
                openAuth('signin');
                setCartOpen(false);
                setMenuOpen(false);
              }}
            >
              Sign In
            </button>
          )}

          <a href="#contact" className="header__contact-btn">
            Contact Us
          </a>
          <button
            type="button"
            className="header__hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => {
              setMenuOpen((open) => !open);
              setCartOpen(false);
              setUserOpen(false);
            }}
          >
            <span className="header__hamburger-line header__hamburger-line--short" />
            <span className="header__hamburger-line header__hamburger-line--long" />
            <span className="header__hamburger-line header__hamburger-line--short" />
          </button>
        </div>

        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          panelRef={cartPanelRef}
        />
      </div>

      <div
        id="mobile-nav"
        className={`header__mobile${menuOpen ? ' header__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="header__mobile-nav" aria-label="Mobile">
          <ul className="header__mobile-list">
            {navItems.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`header__mobile-link${isActive ? ' header__mobile-link--active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                    {item.hasChevron && (
                      <i className="fa-solid fa-chevron-down header__chevron" aria-hidden="true" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          {!user && (
            <button
              type="button"
              className="header__mobile-signin"
              onClick={() => {
                openAuth('signin');
                closeMenu();
              }}
            >
              Sign In
            </button>
          )}
          <a href="#contact" className="header__mobile-contact" onClick={closeMenu}>
            Contact Us
          </a>
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
