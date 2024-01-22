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
import { VerseDisplay } from "./VerseDisplay";
import { SearchResultDisplay } from "./SearchResultDisplay";
import { Overlay } from "./Overlay";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import { Spinner } from "./Spinner";
import { isEmpty } from "lodash";

interface Props {
  onClose: () => void;
}

const searchFormCss = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
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

  const onQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);
  const onSearch = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

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
    [query]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
      <Overlay title="Search" onClose={onClose} header={header}>
        {isLoading && (
          <div css={statusContainerCss}>
            Loading
            <Spinner />
          </div>
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
