import { css } from "@emotion/react";

export const BODY_FONT_FAMILY = "'Hind', Verdana, sans-serif";
const HEADING_FONT_FAMILY = "'Expletus Sans', Verdana, sans-serif";

export const typographyCss = css`
  @import url("https://fonts.googleapis.com/css2?family=Expletus+Sans&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Hind&display=swap");

  header {
    font-family: ${HEADING_FONT_FAMILY};
    font-size: 16px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;

    &[data-sub-header="true"] {
      font-size: 80%;
      font-weight: 500;
    }
  }

  p {
    margin: 0 0 10px;
  }

  [data-muted="true"] {
    color: var(--fg-muted);
  }

  [data-italic="true"] {
    font-style: italic;
  }

  strong,
  [data-bold="true"] {
    font-weight: bold;
  }

  [data-text-wrap] {
    text-wrap: wrap;
  }

  [data-text-nowrap] {
    text-wrap: nowrap;
  }

  small,
  [data-text-size="small"] {
    font-size: 90%;
  }

  [data-text-upper] {
    text-transform: uppercase;
  }

  sup {
    color: var(--fg-muted);
    font-size: 12px;

    // Ensure that children retain the <sup> color
    & > * {
      color: inherit !important;
    }
  }

  hr {
    border: none;
    border-bottom: 1px solid var(--border-color);
  }

  [data-is-highlighted="true"],
  [data-is-highlighted="active"] {
    &,
    &:hover,
    &:focus {
      background-color: var(--active-bg) !important;
    }

    a {
      color: var(--active-fg) !important;
    }
  }

  [data-is-highlighted="highlight-1"] {
    &,
    &:hover,
    &:focus {
      background-color: var(--highlight-1-bg) !important;
    }

    a {
      color: var(--highlight-1-fg) !important;
    }
  }
`;
