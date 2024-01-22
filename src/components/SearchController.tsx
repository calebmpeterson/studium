import { SearchResponse, SearchResults } from "@/types";
import { css } from "@emotion/react";
import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SearchResultDisplay } from "./SearchResultDisplay";
import { Overlay } from "./Overlay";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import { Spinner } from "./Spinner";
import { isEmpty } from "lodash";
import { useTextSearchHistory } from "@/state/useTextSearchHistory";
import { SearchHistoryDisplay } from "./SearchHistoryDisplay";

interface Props {
  onClose: () => void;
}

const searchFormCss = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const searchInputCss = css`
  width: 100%;
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
    <form css={searchFormCss} onSubmit={onSearch}>
      <input
        ref={inputRef}
        type="text"
        css={searchInputCss}
        placeholder="Search the scriptures..."
        value={query}
        onChange={onQueryChange}
      />

      <button role="submit" aria-label="Close search" data-icon>
        <Icon path={mdiMagnify} size={0.7} />
      </button>
    </form>
  );

  return (
    <>
      <Overlay title="Search" onClose={onClose} header={header} hasInput>
        {isLoading && (
          <div css={statusContainerCss}>
            Loading
            <Spinner />
          </div>
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
            <SearchResultDisplay key={index} {...result.item} />
          ))}
        </div>
      </Overlay>
    </>
  );
};
