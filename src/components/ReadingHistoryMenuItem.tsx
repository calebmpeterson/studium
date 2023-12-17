import { ReadingHistoryEntry } from "@/types";
import { css } from "@emotion/react";
import { FC } from "react";

interface Props {
  entry: ReadingHistoryEntry;
  onSelect: (selected: ReadingHistoryEntry) => void;
}

const containerCss = css`
  justify-content: start;
`;

export const ReadingHistoryMenuItem: FC<Props> = ({ entry, onSelect }) => (
  <button data-borderless css={containerCss} onClick={() => onSelect(entry)}>
    {entry.book} {entry.chapter}
  </button>
);
