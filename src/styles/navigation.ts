import { css } from "@emotion/react";
import { ACTIVE_COLOR, BASE_COLOR } from "./colors";
import { BODY_FONT_FAMILY } from "./typography";
import { transition } from "./transition";

export const navigationCss = css`
  button {
    border: 1px solid ${BASE_COLOR[100]};
    background-color: transparent;
    color: ${BASE_COLOR[100]};
    border-radius: 5px;
    padding: 5px 10px;
    font-family: ${BODY_FONT_FAMILY};
    font-weight: 600;
    cursor: pointer;

    transition: ${transition("color", "background-color", "border-color")};

    &:hover,
    &:focus {
      color: ${ACTIVE_COLOR[300]};
      border-color: ${ACTIVE_COLOR[300]};
    }

    &:disabled {
      background-color: transparent !important;
      color: ${BASE_COLOR[500]} !important;
      cursor: not-allowed;
    }

    &[data-borderless="true"] {
      border: none;

      &:hover,
      &:focus {
        background-color: ${BASE_COLOR[800]};
      }
    }
  }
`;
