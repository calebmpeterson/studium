import { css } from "@emotion/react";
import { FC } from "react";

interface Props {
  word: string;
}

const pillCss = css`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  line-height: 1.4;
  border: 1px solid var(--border-color);
  background: var(--foreground-100);
  color: var(--foreground-700);
`;

export const FirstMentionPill: FC<Props> = ({ word }) => (
  <span css={pillCss}>First mention: {word}</span>
);
