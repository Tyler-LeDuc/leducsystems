import React from 'react';
import { Link } from 'react-router-dom';
import { NAV, SITE } from '../data/site';

const ENGAGE = [
  { to: '/services#offer', label: 'What I build' },
  { to: '/services#engagement', label: 'Engagement models' },
  { to: '/services#process', label: 'How I work' },
  { to: '/services#technology', label: 'Technology' },
];

function Footer() {
  const year = new Date().getFullYear();
  const items = NAV.map((item) => ({
    to: item.to || item.path || item.href,
    label: item.label || item.name,
  }));

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
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
            <p className="body body--sm muted">
              A one-person software consultancy. I design, build, and ship production
              software, and I build the AI features inside it. Remote-first, US-based,
              founded 2024.
            </p>
            <a className="site-footer__link link-underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </div>

          <div className="site-footer__col">
            <h2 className="site-footer__title">Navigate</h2>
            {items.map((item) => (
              <Link key={item.to} className="site-footer__link" to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="site-footer__col">
            <h2 className="site-footer__title">Engage</h2>
            {ENGAGE.map((item) => (
              <Link key={item.to} className="site-footer__link" to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="site-footer__col">
            <h2 className="site-footer__title">Legal</h2>
            <Link className="site-footer__link" to="/privacy">
              Privacy Policy
            </Link>
            <Link className="site-footer__link" to="/terms">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>&copy; {year} Le Duc Systems</p>
          <p className="site-footer__legal">Built and shipped by Tyler LeDuc.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
