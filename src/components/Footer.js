import React from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_NAV, NAV, SITE } from '../data/site';

/* Deep links into the home page's numbered clauses. These used to point at
   /services#…; that route now only redirects here, so linking through it
   from our own footer bounced every visitor through a second navigation.
   The ids are the ones HomePage renders — see CONTENTS there.

   /agencies is in this column on purpose: it is deliberately absent from
   NAV, and the footer is the one place on the site that links it. */
const ENGAGE = [
  { to: '/#offer', label: 'What we build' },
  { to: '/#engagement', label: 'Engagement models' },
  { to: '/#process', label: 'How we work' },
  { to: '/#technology', label: 'Technology' },
  { to: '/agencies', label: 'For agencies' },
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
                src="/leduc-mark.svg"
                alt=""
                width="30"
                height="30"
              />
              <span className="brand__text">Le Duc Systems</span>
            </Link>
            <p className="body body--sm muted">
              Custom web and mobile applications, internal tools, and data migrations. Based in{' '}
              {SITE.city}, {SITE.region}, working remote across US time zones.
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
            {LEGAL_NAV.map((item) => (
              <Link key={item.path} className="site-footer__link" to={item.path}>
                {item.label}
              </Link>
            ))}
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
