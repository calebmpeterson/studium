import { css } from "@emotion/react";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import fuzzysearch from "fuzzysearch";
import { flatMap, isEmpty, map, size } from "lodash";
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
import { SearchResponse, SearchResults, TableOfContents } from "@/types";

import { Overlay } from "../Overlay";
import { SearchHistoryDisplay } from "./SearchHistoryDisplay";
import { SearchResultDisplay } from "./SearchResultDisplay";
import { TableOfContentsItem } from "./TableOfContentsItem";

interface Props {
  onClose: () => void;
  onSelectBookAndChapter: (book: string, chapter: string, slug: string) => void;
  tableOfContents: TableOfContents;
  currentBook: string;
  currentChapter: string;
}

const searchFormCss = css`
  width: 100%;
  margin-bottom: 10px;
`;

const searchInputCss = css`
  width: 100%;
`;

const tableOfContentsItemsCss = css`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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

export const SearchController: FC<Props> = ({
  onClose,
  tableOfContents,
  currentBook,
  currentChapter,
  onSelectBookAndChapter,
}) => {
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

  const tableOfContentsEntries = flatMap(tableOfContents, (chapters, book) =>
    map(chapters, (slug, chapter) => ({
      book,
      chapter,
      slug,
    }))
  );

  const filteredTableOfContentsEntries =
    size(query) > 2
      ? tableOfContentsEntries.filter((entry) =>
          fuzzysearch(
            query.toLowerCase(),
            `${entry.book} ${entry.chapter}`.toLowerCase()
          )
        )
      : [];

  const performSelectBookAndChapter = useCallback(
    (book: string, chapter: string, slug: string) => {
      onClose();
      onSelectBookAndChapter(book, chapter, slug);
    },
    [onClose, onSelectBookAndChapter]
  );

  const header = (
    <div>
      <form css={searchFormCss} onSubmit={onSearch}>
        <input
          ref={inputRef}
          type="text"
          css={searchInputCss}
          placeholder="Search by reference, words, or topic..."
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
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
      <Overlay
        title="Search"
        onClose={onClose}
        header={header}
        hasInput
        isMaximized
      >
        <header data-sub-header data-muted>
          References
        </header>
        <div css={tableOfContentsItemsCss}>
          {filteredTableOfContentsEntries.map((entry) => (
            <TableOfContentsItem
              key={entry.slug}
              book={entry.book}
              chapter={entry.chapter}
              slug={entry.slug}
              isSelected={
                currentBook === entry.book && currentChapter === entry.chapter
              }
              onSelect={performSelectBookAndChapter}
            />
          ))}

          {size(query) < 2 && (
            <em data-muted>Start typing to look up book and chapter</em>
          )}
        </div>

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
