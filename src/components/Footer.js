import React from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_NAV, NAV, SITE } from '../data/site';

const ELSEWHERE = [
  { href: SITE.itchio, label: 'itch.io' },
  { href: SITE.github, label: 'GitHub' },
  { href: SITE.linkedin, label: 'LinkedIn' },
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
            <Link to="/" className="brand" aria-label={`${SITE.name}, home`}>
              <img
                className="brand__mark"
                src="/leduc-mark.svg"
                alt=""
                width="30"
                height="30"
              />
              <span className="brand__text">{SITE.name}</span>
            </Link>
            <p className="body body--sm muted">
              Small, fast, slightly unhinged browser games, shipped on itch.io under the handle{' '}
              {SITE.itchioHandle}. Based in {SITE.city}, {SITE.region}.
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
            <h2 className="site-footer__title">Elsewhere</h2>
            {ELSEWHERE.map((item) => (
              <a
                key={item.href}
                className="site-footer__link"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="site-footer__col">
            <h2 className="site-footer__title">Legal</h2>
            {LEGAL_NAV.map((item) => (
              <Link key={item.path} className="site-footer__link" to={item.path}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>&copy; {year} {SITE.name}</p>
          <p className="site-footer__legal">Made by {SITE.founder}.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
