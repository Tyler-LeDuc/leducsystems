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
        <div className="bg-glow" aria-hidden="true" />

        <div className="container container--narrow layer">
          <Reveal className="section-head section-head--center" delay={0}>
            <p className="eyebrow eyebrow--bare">404</p>
            <h1 className="h1 hi" id="notfound-title">
              This page does not exist
            </h1>
            <p className="lede">
              The address is wrong, or the page moved and the link did not. Either way it is not
              something you did.
            </p>
            <div className="cluster cluster--center">
              <Link className="btn btn--ghost" to="/">
                Back to home
              </Link>
              <Link className="btn btn--primary" to="/contact">
                Start a project
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
