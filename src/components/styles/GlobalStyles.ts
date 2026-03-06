import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* WCAG 2.2: visible focus for keyboard users - do not remove */
  :focus {
    outline: 2px solid #077bf1;
    outline-offset: 2px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  :focus-visible {
    outline: 2px solid #077bf1;
    outline-offset: 2px;
  }

  /* Screen-reader only: for live regions and skip link */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .sr-only-focusable:focus {
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 9999;
    width: auto;
    height: auto;
    padding: 0.75rem 1rem;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
    background: #077bf1;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 600;
  }
`;
