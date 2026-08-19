import React from 'react';
import useReveal from '../hooks/useReveal';

/**
 * Wraps children in an element that fades and lifts into place the first time
 * it enters the viewport.
 *
 *   <Reveal as="section" className="section" delay={120}>…</Reveal>
 *
 * `delay` is milliseconds and is passed down as the `--reveal-delay` custom
 * property, which is the only inline style this codebase permits.
 */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
  ...rest
}) {
  const ref = useReveal();
  const classes = className ? `reveal ${className}` : 'reveal';

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
