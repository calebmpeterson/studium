import { css } from "@emotion/react";
import { FC } from "react";

interface Props {
  book: string;
  chapter: string;
  slug: string;
  isSelected: boolean;
  onSelect: (
    book: string,
    chapter: string,
    slug: string
  ) => Promise<void> | void;
}

const containerCss = css`
  justify-content: start;
`;

export const TableOfContentsItem: FC<Props> = ({
  book,
  chapter,
  slug,
  isSelected,
  onSelect,
}) => (
  <button
    data-borderless
    data-is-active={isSelected}
    css={containerCss}
    onClick={() => onSelect(book, chapter, slug)}
  >
    {book} {chapter}
  </button>
);
