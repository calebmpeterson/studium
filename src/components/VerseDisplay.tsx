import { Verse } from "@/types";
import { css } from "@emotion/react";
import { FC } from "react";

const containerCss = css`
  position: relative;
`;

const anchorCss = css`
  position: absolute;
  top: -50vh;
`;

export const VerseDisplay: FC<Verse> = ({ verse, text }) => (
  <div css={containerCss}>
    <div id={verse} css={anchorCss} />
    <sup>
      <a href={`#${verse}`}>{verse}</a>
    </sup>
    &nbsp;
    {text}
  </div>
);
