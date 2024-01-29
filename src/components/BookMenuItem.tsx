import { css } from "@emotion/react";
import { FC, useEffect, useRef } from "react";

interface Props {
  book: string;
  isSelected: boolean;
  onSelect: (selected: string) => void;
}

const containerCss = css`
  justify-content: start;
`;

export const BookMenuItem: FC<Props> = ({ book, isSelected, onSelect }) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current && isSelected) {
      ref.current.scrollIntoView({ block: "center" });
    }
  }, [isSelected]);

  return (
    <button
      ref={ref}
      data-borderless
      data-is-active={isSelected}
      css={containerCss}
      onClick={() => onSelect(book)}
    >
      {book}
    </button>
  );
};
