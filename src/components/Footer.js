import React from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS, LEGAL_NAV, SITE } from '../data/site';

/* Product pages live under /tools/ (outside the router), so they are plain
   <a> links; site pages use <Link>. */
const COMPANY = [
  { to: '/about', label: 'About' },
  { to: '/games', label: 'Games' },
  { to: '/contact', label: 'Contact' },
];

const ELSEWHERE = [
  { href: SITE.github, label: 'GitHub' },
  { href: SITE.itchio, label: 'itch.io' },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link to="/" className="brand" aria-label={`${SITE.name}, home`}>
              <img className="brand__logo" src="/leduc-logo.svg" alt={SITE.name} width="172" height="30" />
            </Link>
            <p className="body body--sm muted">
              Focused software built and sold by {SITE.founder} in {SITE.city}, {SITE.region}.
            </p>
            <a className="site-footer__link link-underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </div>

          <nav className="site-footer__col" aria-labelledby="footer-products">
            <h2 className="site-footer__title" id="footer-products">
              Products
            </h2>
            {FEATURED_PRODUCTS.map((product) => (
              <a key={product.slug} className="site-footer__link" href={product.primary.href}>
                {product.name}
              </a>
            ))}
            <a className="site-footer__link" href="/tools/">
              All products
            </a>
          </nav>

          <nav className="site-footer__col" aria-labelledby="footer-company">
            <h2 className="site-footer__title" id="footer-company">
              Company
            </h2>
            {COMPANY.map((item) => (
              <Link key={item.to} className="site-footer__link" to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>

          <nav className="site-footer__col" aria-labelledby="footer-elsewhere">
            <h2 className="site-footer__title" id="footer-elsewhere">
              Elsewhere
            </h2>
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
          </nav>

          <nav className="site-footer__col" aria-labelledby="footer-legal">
            <h2 className="site-footer__title" id="footer-legal">
              Legal
            </h2>
            {LEGAL_NAV.map((item) => (
              <Link key={item.path} className="site-footer__link" to={item.path}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>
            &copy; {year} {SITE.legalName}
          </p>
          <p className="site-footer__legal">
            {SITE.city}, {SITE.regionShort}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
