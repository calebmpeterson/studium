import { css } from "@emotion/react";
import { FC } from "react";

interface Props {
  chapter: string;
  onSelect: (selected: string) => void;
}

const containerCss = css`
  width: 36px;
  height: 36px;
  box-sizing: border-box;
`;

export const ChapterMenuItem: FC<Props> = ({ chapter, onSelect }) => (
  <button data-borderless css={containerCss} onClick={() => onSelect(chapter)}>
    {chapter}
  </button>
);
