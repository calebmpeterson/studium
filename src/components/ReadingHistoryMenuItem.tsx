import { css } from "@emotion/react";
import { FC, useEffect, useRef } from "react";

import { ReadingHistoryEntry } from "@/types";

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
