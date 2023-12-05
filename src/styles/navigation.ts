import { css } from "@emotion/react";
import { BODY_FONT_FAMILY } from "./typography";
import { transition } from "./transition";

export const navigationCss = css`
  button {
    border: 1px solid var(--button-border);
    background-color: var(--bg);
    color: var(--button-fg);
    border-radius: 5px;
    padding: 5px 10px;
    box-sizing: border-box;
    font-family: ${BODY_FONT_FAMILY};
    font-weight: 600;
    cursor: pointer;

    transition: ${transition("color", "background-color", "border-color")};

    &:hover,
    &:focus {
      color: var(--active-fg);
      border-color: var(--active-fg);
      background-color: var(--button-active-bg);
    }

    &:disabled {
      background-color: transparent !important;
      color: var(--disabled-fg) !important;
      cursor: not-allowed;
    }

    &[data-borderless="true"] {
      border: none;
    }
  }

  a {
    display: inline-flex;
    align-items: center;

    color: var(--button-fg);
    text-decoration: none;
    text-transform: uppercase;
    font-size: 80%;
    letter-spacing: 2px;

    transition: ${transition("color")};

    &:hover,
    &:focus {
      color: var(--active-fg);
    }
  }
`;
