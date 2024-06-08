import { css } from "@emotion/react";
import { isEmpty } from "lodash";
import { FC, MouseEvent, useCallback } from "react";

import { SearchHistory } from "@/types";

import { SearchHistoryEntryDisplay } from "./SearchHistoryEntryDisplay";

interface Props {
  searchHistory: SearchHistory;
  onClearSearchHistory: () => void;
  onSetSearchQuery: (query: string) => void;
}

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const headingLayoutCss = css`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const emptyHistoryContainerCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchHistoryDisplay: FC<Props> = ({
  searchHistory,
  onClearSearchHistory,
  onSetSearchQuery,
}) => {
  const onClear = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      onClearSearchHistory();
    },
    [onClearSearchHistory]
  );

  return (
    <div css={containerCss}>
      <div css={headingLayoutCss}>
        <header data-sub-header data-muted>
          Previous searches
        </header>
        <a onClick={onClear}>Clear</a>
      </div>

      {searchHistory.map((entry, index) => (
        <SearchHistoryEntryDisplay
          key={index}
          {...entry}
          onSetSearchQuery={onSetSearchQuery}
        />
      ))}

      {isEmpty(searchHistory) && (
        <div css={emptyHistoryContainerCss}>
          <em>No search history </em>
        </div>
      )}
    </div>
  );
};
