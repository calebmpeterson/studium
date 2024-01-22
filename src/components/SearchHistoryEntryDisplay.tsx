import { SearchHistoryEntry } from "@/types";
import { css } from "@emotion/react";
import { FC, MouseEvent, useCallback } from "react";

const containerCss = css``;

interface Props extends SearchHistoryEntry {
  onSetSearchQuery: (query: string) => void;
}

export const SearchHistoryEntryDisplay: FC<Props> = ({
  query,
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
    <div css={containerCss}>
      <a onClick={onClick}>{query}</a>
    </div>
  );
};
