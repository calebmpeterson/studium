import { css } from "@emotion/react";
import { BODY_FONT_FAMILY } from "./typography";
import { transition } from "./transition";
import { breakpoints } from "./breakpoints";

export const navigationCss = css`
  button {
    border: 1px solid var(--button-border);
    background-color: var(--bg);
    color: var(--button-fg);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    box-sizing: border-box;
    font-family: ${BODY_FONT_FAMILY};
    font-weight: 600;
    cursor: pointer;

    transition: ${transition("color", "background-color", "border-color")};

    &:hover,
    &:focus {
      outline: none;
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

    &[data-icon="true"] {
      width: 36px;
      height: 36px;

      padding: 5px;

      @media ${breakpoints["is-mobile"]} {
        width: 42px;
        height: 42px;
      }
    }
  }

  a {
    cursor: pointer;
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

  a[role="button"] {
    color: var(--fg-muted);
    letter-spacing: initial;
    font-size: 66%;

    &:hover,
    &:focus {
      color: var(--active-fg);
    }
  }
`;
