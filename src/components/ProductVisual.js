import React, { useState } from 'react';

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

/* Shade names and finishes from the live demo's default palette. */
const SHADES = [
  { name: 'Classic red', finish: 'Satin', color: '#B02A3E' },
  { name: 'Rose tint', finish: 'Sheer', color: '#C86B6A' },
  { name: 'Brick', finish: 'Matte', color: '#8B4A42' },
  { name: 'Nude gloss', finish: 'Gloss', color: '#D48B7E' },
  { name: 'Berry', finish: 'Satin', color: '#7A2A4A' },
];

function TryOnPanel() {
  const [active, setActive] = useState(0);
  const shade = SHADES[active];

  return (
    <figure className="viz viz--tryon">
      <div className="viz__bar">
        <span className="mono">Product page widget</span>
        <span className="mono">Runs on device</span>
      </div>

      <div className="viz__body tryon">
        <div className="tryon__stage">
          <svg className="tryon__lips" viewBox="0 0 200 110" role="img" aria-label={`Lips in ${shade.name}`}>
            <path
              d="M10 52 C38 30 70 16 100 32 C130 16 162 30 190 52 C150 58 50 58 10 52 Z"
              fill={shade.color}
            />
            <path
              d="M10 52 C50 60 150 60 190 52 C166 84 132 98 100 98 C68 98 34 84 10 52 Z"
              fill={shade.color}
            />
            <path d="M10 52 C50 60 150 60 190 52" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="1.5" />
            <path
              d="M62 76 C80 84 120 84 138 76"
              fill="none"
              stroke="rgba(255,255,255,0.32)"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
          <p className="tryon__readout">
            <span>{shade.name}</span>
            <span className="mono">{shade.finish}</span>
          </p>
        </div>

        <div className="tryon__picker">
          <p className="tryon__label">Pick a shade</p>
          <ul className="tryon__swatches">
            {SHADES.map((item, index) => (
              <li key={item.name}>
                <button
                  type="button"
                  className="tryon__swatch"
                  aria-pressed={index === active}
                  aria-label={`${item.name}, ${item.finish}`}
                  onClick={() => setActive(index)}
                  style={{ '--swatch': item.color }}
                />
              </li>
            ))}
          </ul>
          <p className="tryon__hint">Camera or photo. Nothing is uploaded.</p>
        </div>
      </div>

      <figcaption className="viz__caption">
        A sketch of the shade picker. The live demo puts the shade on your own face through your
        camera.
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
  tryon: TryOnPanel,
  convert: ConvertDiagram,
};

export default function ProductVisual({ kind }) {
  const Visual = VISUALS[kind];
  return Visual ? <Visual /> : null;
}
