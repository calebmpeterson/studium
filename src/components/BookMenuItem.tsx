import { css } from "@emotion/react";
import { FC } from "react";

interface Props {
  book: string;
  onSelect: (selected: string) => void;
}

const containerCss = css`
  text-align: start;
`;

export const BookMenuItem: FC<Props> = ({ book, onSelect }) => (
  <button data-borderless css={containerCss} onClick={() => onSelect(book)}>
    {book}
  </button>
);
