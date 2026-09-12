import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page not found"
        description="That page does not exist. Head back to the home page, or start a project."
        path="/404"
      />

      <section className="section" aria-labelledby="notfound-title">
        <div className="bg-grid" aria-hidden="true" />

        <div className="container container--narrow layer">
          {/* No title block here. A missing page is one ruled row of a
              register, which is a silhouette no other page on the site
              opens with. */}
          <Reveal className="rows" delay={0}>
            <div className="row">
              <div className="row__label">
                <span className="ordinal ordinal--boxed">404</span>
                <span className="mono">Not found</span>
              </div>
              <div className="stack">
                <h1 className="h3" id="notfound-title">
                  This page does not exist
                </h1>
                <p className="body body--sm">
                  The address is wrong, or the page moved and the link did not. Either way it is
                  not something you did.
                </p>
                {/* Accent first, ghost second — the order every cluster on the
                    site uses. */}
                <div className="cluster">
                  <Link className="btn btn--primary" to="/contact">
                    Start a project
                  </Link>
                  <Link className="btn btn--ghost" to="/">
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
