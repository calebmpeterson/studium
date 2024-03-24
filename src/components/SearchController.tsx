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
import { isEmpty } from "lodash";
import { useTextSearchHistory } from "@/state/useTextSearchHistory";
import { SearchHistoryDisplay } from "./SearchHistoryDisplay";
import Skeleton from "react-loading-skeleton";

interface Props {
  onClose: () => void;
}

const searchFormCss = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
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
  const [searchType, setSearchType] = useState("text");

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

      const endpoint =
        searchType === "text" ? "/api/search" : "/api/semantic-search";

      try {
        const response = await fetch(
          `${endpoint}?query=${encodeURIComponent(query)}`
        );
        const { results } = (await response.json()) as SearchResponse;

        setResults(results);
      } finally {
        setIsLoading(false);
      }
    },
    [searchType, setSearchHistory]
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

  const onChangeSearchType = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchType(event.target.value);
    },
    []
  );

  const header = (
    <div>
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

      <div css={searchTypeSelectorCss}>
        <label>
          <input
            type="radio"
            value="text"
            checked={searchType === "text"}
            onChange={onChangeSearchType}
          />
          &nbsp;Text
        </label>

        <label>
          <input
            type="radio"
            value="semantic"
            checked={searchType === "semantic"}
            onChange={onChangeSearchType}
          />
          &nbsp;Semantic
        </label>
      </div>
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
