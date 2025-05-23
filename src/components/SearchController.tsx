import { css } from "@emotion/react";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { isEmpty } from "lodash";
import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Skeleton from "react-loading-skeleton";

import { useTextSearchHistory } from "@/state/useTextSearchHistory";
import { SearchResponse, SearchResults } from "@/types";

import { Overlay } from "./Overlay";
import { SearchHistoryDisplay } from "./SearchHistoryDisplay";
import { SearchResultDisplay } from "./SearchResultDisplay";

interface Props {
  onClose: () => void;
}

const searchFormCss = css`
  width: 100%;
  margin-bottom: 10px;
`;

const searchInputCss = css`
  width: 100%;
`;

const searchTypeSelectorCss = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const searchResultsContainerCss = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const statusContainerCss = css`
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchController: FC<Props> = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResults>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchHistory, setSearchHistory] = useTextSearchHistory();

  const performSearch = useCallback(
    async (query: string) => {
      // Don't search for empty queries
      if (query.trim().length === 0) {
        setHasSearched(false);
        setResults([]);
        return;
      }

      setSearchHistory((previous) => [
        { query, timestamp: Date.now() },
        ...previous,
      ]);

      setResults([]);
      setIsLoading(true);
      setHasSearched(true);

      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`
        );
        const { results } = (await response.json()) as SearchResponse;

        setResults(results);
      } finally {
        setIsLoading(false);
      }
    },
    [setSearchHistory]
  );

  const onClearSearchHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);

  const onQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const onSearch = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      await performSearch(query);
    },
    [query, performSearch]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSetSearchQuery = useCallback(
    async (query: string) => {
      setQuery(query);

      if (inputRef.current) {
        inputRef.current.focus();
      }

      await performSearch(query);
    },
    [performSearch]
  );

  const header = (
    <div>
      <form css={searchFormCss} onSubmit={onSearch}>
        <input
          ref={inputRef}
          type="text"
          css={searchInputCss}
          placeholder="Search by words or topic..."
          value={query}
          onChange={onQueryChange}
        />

        <button role="submit" aria-label="Close search" data-icon>
          <Icon path={mdiMagnify} size={0.7} />
        </button>
      </form>
    </div>
  );

  return (
    <>
      <Overlay title="Search" onClose={onClose} header={header} hasInput>
        {isLoading && (
          <>
            <div>
              <Skeleton containerClassName="flex-1" height={14} width="100px" />
              <Skeleton containerClassName="flex-1" height={20} />
            </div>

            <div>
              <Skeleton containerClassName="flex-1" height={14} width="100px" />
              <Skeleton containerClassName="flex-1" height={20} />
            </div>

            <div>
              <Skeleton containerClassName="flex-1" height={14} width="100px" />
              <Skeleton containerClassName="flex-1" height={20} />
            </div>
          </>
        )}

        {!hasSearched && (
          <SearchHistoryDisplay
            searchHistory={searchHistory}
            onClearSearchHistory={onClearSearchHistory}
            onSetSearchQuery={onSetSearchQuery}
          />
        )}

        {hasSearched && !isLoading && isEmpty(results) && (
          <div css={statusContainerCss}>
            Nothing found for &ldquo;{query}&rdquo;
          </div>
        )}

        <div css={searchResultsContainerCss}>
          {results.map((result, index) => (
            <SearchResultDisplay key={index} {...result} onClick={onClose} />
          ))}
        </div>
      </Overlay>
    </>
  );
};
