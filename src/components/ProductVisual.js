import React from 'react';

/* Schematic visuals for the featured products. They are diagrams of how each
   product works, drawn in HTML/CSS/SVG so they stay sharp, light and
   accessible — not screenshots, and not mock customer data. Styles live in
   HomePage.css under `.viz`. */

function RelayDiagram() {
  return (
    <figure className="viz viz--relay">
      <div className="viz__bar">
        <span className="mono">Scan path</span>
        <span className="mono">after Dec 2026</span>
      </div>

      <div className="viz__body">
        <p className="relay-old">
          <span className="relay-old__path">Copier &rarr; smtp.office365.com, username + password</span>
          <span className="relay-old__status">Rejected: basic auth off</span>
        </p>

        <ol className="relay" aria-label="How a scan travels with Scan Relay">
          <li className="relay__node">
            <span className="mono">Office network</span>
            <strong>Copier or MFP</strong>
            <span className="relay__note">Scan to email, unchanged</span>
          </li>
          <li className="relay__link" aria-hidden="true">
            <span>SMTP · port 25</span>
          </li>
          <li className="relay__node relay__node--key">
            <span className="mono">Office PC</span>
            <strong>Scan Relay</strong>
            <span className="relay__note">Windows service, queues to disk</span>
          </li>
          <li className="relay__link" aria-hidden="true">
            <span>OAuth · Graph</span>
          </li>
          <li className="relay__node">
            <span className="mono">Cloud</span>
            <strong>Microsoft 365</strong>
            <span className="relay__note">Sent from your mailbox</span>
          </li>
        </ol>
      </div>

      <figcaption className="viz__caption">
        The copier sends SMTP to a PC on its own network. Scan Relay signs in to Microsoft 365 the
        modern way and sends the scan on. No server of mine sits in the middle.
      </figcaption>
    </figure>
  );
}

function ConvertDiagram() {
  const outputs = [
    { ext: '.pptx', app: 'PowerPoint' },
    { ext: '.docx', app: 'Word' },
    { ext: '.idml', app: 'InDesign' },
  ];

  return (
    <figure className="viz viz--convert">
      <div className="viz__bar">
        <span className="mono">One upload</span>
        <span className="mono">Three editable files</span>
      </div>

      <div className="viz__body convert">
        <div className="convert__in">
          <span className="file-chip file-chip--in">
            <span className="file-chip__ext">.pub</span>
            <span className="file-chip__name">spring-newsletter.pub</span>
          </span>
          <span className="convert__step mono">Free preview of every page</span>
        </div>

        <span className="convert__arrow" aria-hidden="true" />

        <ul className="convert__out">
          {outputs.map((item) => (
            <li key={item.ext} className="file-chip">
              <span className="file-chip__ext">{item.ext}</span>
              <span className="file-chip__name">Editable in {item.app}</span>
            </li>
          ))}
        </ul>
      </div>

      <figcaption className="viz__caption">
        Text stays text and pictures stay pictures, laid out where they were on the page.
      </figcaption>
    </figure>
  );
}

const VISUALS = {
  relay: RelayDiagram,
  convert: ConvertDiagram,
};

export default function ProductVisual({ kind }) {
  const Visual = VISUALS[kind];
  return Visual ? <Visual /> : null;
}
