import { css } from "@emotion/react";
import { transitionDuration, transitionTimingFunction } from "./transition";

export const animationsCss = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  [data-fade-in="true"] {
    animation: fadeIn ${transitionDuration} ${transitionTimingFunction};
  }
`;
