import { css } from "@emotion/react";
import { FC } from "react";

interface Props {
  title: string;
}

const containerCss = css`
  position: relative;
  height: 20px;
  border-bottom: 1px dashed var(--border-color);
`;

const placementCss = css`
  position: sticky;
  left: 10px;
  float: left;
`;

export const TimelineSection: FC<Props> = ({ title }) => (
  <div css={containerCss}>
    <div css={placementCss}>
      <strong data-muted>{title}</strong>
    </div>
  </div>
);
