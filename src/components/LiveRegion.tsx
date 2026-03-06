import React from 'react';

interface LiveRegionProps {
  message: string;
  politeness?: 'polite' | 'assertive';
}

/**
 * WCAG 2.2: Announces dynamic updates to screen readers.
 * - polite: non-urgent (e.g. language change, success)
 * - assertive: interrupts for critical info (e.g. errors)
 */
const LiveRegion = ({ message, politeness = 'polite' }: LiveRegionProps) => (
  <div
    role="status"
    aria-live={politeness}
    aria-atomic="true"
    className="sr-only"
  >
    {message}
  </div>
);

export default LiveRegion;
