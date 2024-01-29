import { css } from "@emotion/react";
import { FC } from "react";

interface Props {
  chapter: string;
  isSelected: boolean;
  onSelect: (selected: string) => void;
}

const containerCss = css`
  width: 36px;
  height: 36px;
  box-sizing: border-box;
`;

export const ChapterMenuItem: FC<Props> = ({
  chapter,
  isSelected,
  onSelect,
}) => (
  <button
    data-borderless
    data-is-active={isSelected}
    css={containerCss}
    onClick={() => onSelect(chapter)}
  >
    {chapter}
  </button>
);
