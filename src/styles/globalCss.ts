import { css } from "@emotion/react";
import colors, { ACTIVE_COLOR, BASE_COLOR } from "./colors";
import { navigationCss } from "./navigation";
import { BODY_FONT_FAMILY, typographyCss } from "./typography";
import { scheme } from "./scheme";
import { formsCss } from "./forms";
import { breakpoints } from "./breakpoints";
import { animationsCss } from "./animations";

export const globalCss = css`
  ${typographyCss}

  html,
  body {
    min-width: 100%;
    max-width: 100%;
    min-height: 100vh;
    font-family: ${BODY_FONT_FAMILY};
    font-weight: 400;
    margin: 0;
    padding: 0;
    scrollbar-width: thin;
  }

  :root {
    --bg: ${BASE_COLOR[900]};
    --fg: ${BASE_COLOR[50]};
    --fg-muted: ${BASE_COLOR[400]};
    --border-color: ${BASE_COLOR[700]};
    --button-fg: ${BASE_COLOR[100]};
    --button-border: ${BASE_COLOR[100]};
    --button-active-bg: ${BASE_COLOR[950]};
    --active-fg: ${ACTIVE_COLOR[300]};
    --active-bg: ${ACTIVE_COLOR[950]};
    --disabled-fg: ${BASE_COLOR[500]};
    --backdrop: rgba(0, 0, 0, 0.75);

    --tooltip-bg: ${BASE_COLOR[800]};

    --info: ${colors.blue[500]};
    --gold: ${colors.yellow[500]};
    --silver: ${colors.zinc[500]};
    --brass: ${colors.amber[800]};
    --iron: ${colors.zinc[500]};

    --red: ${colors.red[400]};
    --orange: ${colors.orange[500]};
    --amber: ${colors.amber[500]};
    --yellow: ${colors.yellow[500]};
    --green: ${colors.emerald[500]};
    --blue: ${colors.blue[500]};
    --purple: ${colors.purple[800]};

    --input-size: 36px;
    --border-radius: 5px;
    --border-radius-lg: 15px;

    @media ${breakpoints["is-mobile"]} {
      --input-size: 42px;
    }

    --skeleton-base-color: ${BASE_COLOR[800]};
    --skeleton-highlight-color: ${BASE_COLOR[900]};
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
      --border-color: ${BASE_COLOR[400]};
      --button-fg: ${BASE_COLOR[800]};
      --button-border: ${BASE_COLOR[800]};
      --button-active-bg: ${ACTIVE_COLOR[100]};
      --active-fg: ${ACTIVE_COLOR[600]};
      --active-bg: ${ACTIVE_COLOR[200]};
      --disabled-fg: ${BASE_COLOR[600]};
      --backdrop: rgba(0, 0, 0, 0.5);
      --tooltip-bg: ${BASE_COLOR[50]};

      --info: ${colors.blue[500]};
      --gold: ${colors.yellow[500]};
      --silver: ${colors.zinc[500]};
      --brass: ${colors.amber[800]};
      --iron: ${colors.zinc[800]};

      --red: ${colors.red[700]};
      --orange: ${colors.orange[700]};
      --amber: ${colors.amber[700]};
      --yellow: ${colors.yellow[500]};
      --green: ${colors.emerald[800]};
      --blue: ${colors.blue[800]};
      --purple: ${colors.purple[800]};

      --skeleton-base-color: ${BASE_COLOR[200]};
      --skeleton-highlight-color: ${BASE_COLOR[100]};
    }
  }

  ${navigationCss}
  ${formsCss}
  ${animationsCss}
`;
