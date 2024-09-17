import { css } from "@emotion/react";
import { FC } from "react";

interface Props {
  title: string;
  id?: string;
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
  color: var(--fg-muted);
  text-transform: uppercase;
  font-spacing: 2px;
  font-size: 80%;
`;

const anchorCss = css`
  position: relative;
  top: -60px;
`;

export const TimelineSection: FC<Props> = ({ title, id }) => (
  <>
    {id && <div id={id} css={anchorCss} />}
    <div css={containerCss}>
      <div css={placementCss}>{title}</div>
    </div>
  </>
);
