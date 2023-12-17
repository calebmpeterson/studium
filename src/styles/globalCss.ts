import { css } from "@emotion/react";
import { ACTIVE_COLOR, BASE_COLOR } from "./colors";
import { navigationCss } from "./navigation";
import { BODY_FONT_FAMILY, typographyCss } from "./typography";
import { scheme } from "./scheme";

export const globalCss = css`
  html,
  body {
    min-width: 100%;
    max-width: 100%;
    min-height: 100vh;
    font-family: ${BODY_FONT_FAMILY};
    margin: 0;
    padding: 0;
  }

  :root {
    --bg: ${BASE_COLOR[900]};
    --fg: ${BASE_COLOR[50]};
    --fg-muted: ${BASE_COLOR[400]};
    --border-color: ${BASE_COLOR[400]};
    --button-fg: ${BASE_COLOR[100]};
    --button-border: ${BASE_COLOR[100]};
    --button-active-bg: ${BASE_COLOR[800]};
    --active-fg: ${ACTIVE_COLOR[300]};
    --disabled-fg: ${BASE_COLOR[500]};
    --backdrop: rgba(0, 0, 0, 0.5);
  }

  body {
    background-color: var(--bg);
    color: var(--fg);
  }

  @media ${scheme.light} {
    :root {
      --bg: ${BASE_COLOR[50]};
      --fg: ${BASE_COLOR[800]};
      --fg-muted: ${BASE_COLOR[600]};
      --border-color: ${BASE_COLOR[600]};
      --button-fg: ${BASE_COLOR[800]};
      --button-border: ${BASE_COLOR[800]};
      --button-active-bg: ${ACTIVE_COLOR[100]};
      --active-fg: ${ACTIVE_COLOR[600]};
      --disabled-fg: ${BASE_COLOR[600]};
    }
  }

  ${typographyCss}
  ${navigationCss}
`;
