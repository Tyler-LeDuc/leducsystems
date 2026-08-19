import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV, SITE } from '../data/site';
import ContactForm from '../ContactForm';

const MENU_ID = 'site-mobile-menu';

function isActivePath(pathname, to) {
  if (to === '/') return pathname === '/';
  return pathname === to || pathname.startsWith(`${to}/`);
}

function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const items = NAV.map((item) => ({
    to: item.to || item.path || item.href,
    label: item.label || item.name,
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const openContact = () => {
    setMenuOpen(false);
    setContactOpen(true);
  };

  return (
    <>
      <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
        <div className="site-header__inner">
          <Link to="/" className="brand" aria-label="Le Duc Systems, home">
            <img
              className="brand__mark"
              src="/duck-icon.png"
              alt=""
              width="30"
              height="30"
            />
            <span className="brand__text">Le Duc Systems</span>
          </Link>

          <nav className="nav" aria-label="Primary">
            <ul>
              {items.map((item) => {
                const active = isActivePath(pathname, item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`nav__link${active ? ' nav__link--active' : ''}`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="nav__actions">
            <button type="button" className="btn btn--primary btn--sm" onClick={openContact}>
              Start a project
            </button>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="menu-toggle__bar" />
              <span className="menu-toggle__bar" />
              <span className="menu-toggle__bar" />
            </button>
          </div>
        </div>
      </header>

      <nav
        id={MENU_ID}
        className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}
        aria-label="Mobile"
      >
        <ul>
          {items.map((item, index) => {
            const active = isActivePath(pathname, item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="mobile-menu__link"
                  aria-current={active ? 'page' : undefined}
                  style={{ '--menu-delay': `${60 + index * 45}ms` }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className="mobile-menu__actions"
          style={{ '--menu-delay': `${60 + items.length * 45}ms` }}
        >
          <button type="button" className="btn btn--primary btn--lg" onClick={openContact}>
            Start a project
          </button>
          <a className="btn btn--ghost btn--lg" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </div>
      </nav>

      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

export default Header;
