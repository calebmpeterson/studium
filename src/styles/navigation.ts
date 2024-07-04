import { css } from "@emotion/react";

import { transition } from "./transition";
import { BODY_FONT_FAMILY } from "./typography";

export const navigationCss = css`
  button,
  a[role="button"] {
    border: 1px solid var(--button-border);
    background-color: var(--bg);
    color: var(--button-fg);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    box-sizing: border-box;
    font-family: ${BODY_FONT_FAMILY};
    letter-spacing: 1px;
    font-weight: 600;
    cursor: pointer;

    transition: ${transition("color", "background-color", "border-color")};

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      outline: none;
      color: var(--active-fg);
      border-color: var(--active-fg);
      background-color: var(--button-active-bg);
    }

    &:disabled {
      background-color: var(--disabled-bg) !important;
      color: var(--disabled-fg) !important;
      border-color: var(--disabled-fg) !important;
      cursor: not-allowed;
    }

    &[data-borderless="true"] {
      border: none;
    }

    &[data-icon="true"] {
      width: var(--input-size);
      height: var(--input-size);

      padding: 5px;
      flex-shrink: 0;
    }

    &[data-is-active="true"] {
      color: var(--active-fg);
      border-color: var(--active-fg);
    }
  }

  a {
    cursor: pointer;
    display: inline-flex;
    align-items: center;

    color: var(--fg-muted);
    text-decoration: none;
    font-size: 90%;

    transition: ${transition("color")};

    &:hover,
    &:focus {
      color: var(--active-fg);
      outline: none;
    }
  }

  button {
    font-weight: 600;
  }
`;
