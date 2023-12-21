import { css } from "@emotion/react";
import { BASE_COLOR } from "./colors";

export const BODY_FONT_FAMILY = "Verdana, sans-serif";
export const HEADING_FONT_FAMILY = "Verdana, sans-serif";

export const typographyCss = css`
  header {
    font-family: ${HEADING_FONT_FAMILY};
    font-weight: 600;

    &[data-sub-header="true"] {
      font-size: 80%;
      color: var(--fg-muted);
    }
  }

  [data-muted="true"] {
    color: var(--fg-muted);
  }

  small {
    font-size: 66%;
  }

  sup {
    color: var(--fg-muted);
    font-size: 12px;

    // Ensure that children retain the <sup> color
    & > * {
      color: inherit !important;
    }
  }
`;
