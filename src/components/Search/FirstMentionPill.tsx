import { css } from "@emotion/react";
import { FC } from "react";

interface Props {
  word: string;
}

const pillCss = css`
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 12px;
  color: var(--fg-muted);
`;

export const FirstMentionPill: FC<Props> = ({ word }) => (
  <div css={pillCss}>
    <span>First mention: {word}</span>
  </div>
);
