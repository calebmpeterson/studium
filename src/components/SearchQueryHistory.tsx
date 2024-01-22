import { SearchHistory } from "@/types";
import { css } from "@emotion/react";
import { FC, MouseEvent, useCallback } from "react";

interface Props {
  searchHistory: SearchHistory;
  onClearSearchHistory: () => void;
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

const entryCss = css``;

export const SearchQueryHistory: FC<Props> = ({
  searchHistory,
  onClearSearchHistory,
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
        <div key={index} css={entryCss}>
          {entry.query}
        </div>
      ))}
    </div>
  );
};
