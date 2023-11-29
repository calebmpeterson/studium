import { css } from "@emotion/react";
import { BASE_COLOR } from "./colors";
import { navigationCss } from "./navigation";
import { BODY_FONT_FAMILY, typographyCss } from "./typography";

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

  body {
    background-color: ${BASE_COLOR[900]};
    color: ${BASE_COLOR[50]};
  }

  ${typographyCss}
  ${navigationCss}
`;
