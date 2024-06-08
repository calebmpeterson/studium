import { css } from "@emotion/react";
import { FC, PropsWithChildren } from "react";

import { shadows } from "@/styles/shadows";
import { BODY_FONT_FAMILY } from "@/styles/typography";

interface Props extends PropsWithChildren {
  placement: "left" | "right";
}

const placementCss = (placement: "left" | "right") => css`
  pointer-events: none;
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100%;
  ${placement}: 20px;
  display: flex;
  align-items: center;
`;

const containerCss = css`
  height: 0;
  overflow: visible;
`;

const appearanceCss = css`
  padding: 2px 10px;
  display: flex;
  align-items: center;
  background-color: var(--bg);
  border-radius: var(--border-radius-lg);
  box-shadow: ${shadows["shadow-lg"]};
  color: var(--active-fg);
  letter-spacing: 1px;
`;

export const SwipeNavigationFeedback: FC<Props> = ({ placement, children }) => (
  <div css={placementCss(placement)}>
    <div css={containerCss}>
      <div css={appearanceCss} data-fade-in>
        {children}
      </div>
    </div>
  </div>
);
