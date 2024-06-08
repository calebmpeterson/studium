import { css } from "@emotion/react";
import { FC, MouseEvent, useCallback } from "react";
import ago from "s-ago";

import { SearchHistoryEntry } from "@/types";

const containerCss = css`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 20px;
  width: 100%;
`;

interface Props extends SearchHistoryEntry {
  onSetSearchQuery: (query: string) => void;
}

export const SearchHistoryEntryDisplay: FC<Props> = ({
  query,
  timestamp,
  onSetSearchQuery,
}) => {
  const onClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();

      onSetSearchQuery(query);
    },
    [query, onSetSearchQuery]
  );

  return (
    <a css={containerCss} onClick={onClick}>
      <span>{query}</span>
      <em>{timestamp && ago(new Date(timestamp))}</em>
    </a>
  );
};
