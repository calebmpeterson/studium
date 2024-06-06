import { ReadingHistoryEntry, TableOfContents } from "@/types";
import { css } from "@emotion/react";
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BookMenuItem } from "./BookMenuItem";
import { ChapterMenuItem } from "./ChapterMenuItem";
import { useRouter } from "next/router";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";
import Icon from "@mdi/react";
import { mdiClose, mdiHistory, mdiTableOfContents } from "@mdi/js";
import { ReadingHistoryMenuItem } from "./ReadingHistoryMenuItem";
import { useReadingHistory } from "@/state/useReadingHistory";
import { FloatingBox } from "./FloatingBox";
import { marginCss } from "@/styles/layout";
import { flatMap, isEmpty, map } from "lodash";
import { TableOfContentsItem } from "./TableOfContentsItem";
import { useHotkeys } from "react-hotkeys-hook";
import fuzzysearch from "fuzzysearch";
import { shadows } from "@/styles/shadows";

interface Props {
  tableOfContents: TableOfContents;
  currentBook: string;
  currentChapter: string;
}

const overlayHeaderCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const overlayTitleCss = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

interface TableOfContentsProps {
  onClose: () => void;
}

const TableOfContentsTitle: FC<TableOfContentsProps> = ({ onClose }) => (
  <div css={overlayHeaderCss}>
    <header css={overlayTitleCss}>Table of Contents</header>

    <button
      role="button"
      aria-label="Close cross references"
      data-icon
      data-borderless
      onClick={onClose}
    >
      <Icon path={mdiClose} size={0.7} />
    </button>
  </div>
);

const tableOfContentsButtonCss = css``;

const bookButtonCss = css`
  white-space: pre;
`;

const chapterButtonCss = css`
  width: 50px;
`;

const readingHistoryButtonCss = css``;

const tableOfContentsCss = css`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  // Override the default FloatingBox padding
  // so that the top controls will be full-width.
  padding: 0px;
`;

const topControlsCss = css`
  position: sticky;
  top: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 5px;
  box-sizing: border-box;
  padding: 10px;
  background-color: var(--bg);
  box-shadow: ${shadows["shadow-inset"]};
`;

const tableOfContentsFilterCss = css`
  width: 100%;
  box-sizing: border-box;
`;

const tableOfContentsItemsCss = css`
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const emptyTableOfContentsCss = css`
  padding: 0 10px;
`;

const bookMenuCss = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-right: 10px;
`;

const chapterMenuCss = css`
  width: fit-content;
  max-width: 400px;
  padding-right: 10px;

  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const readingHistoryMenuCss = css`
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 240px;
`;

export const ReadingNav: FC<Props> = ({
  tableOfContents,
  currentBook,
  currentChapter,
}) => {
  const router = useRouter();

  const filterInputRef = useRef<HTMLInputElement>(null);
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);
  const onToggleTableOfContents = useCallback(() => {
    setTableOfContentsFilter("");
    setIsTableOfContentsOpen((open) => !open);
    setIsBookMenuOpen(false);
    setIsChapterMenuOpen(false);

    setTimeout(() => {
      if (filterInputRef.current) {
        filterInputRef.current.focus();
      }
    }, 0);
  }, []);
  const onCloseTableOfContents = useCallback(() => {
    setIsTableOfContentsOpen(false);
  }, []);

  useHotkeys("ctrl+k", onToggleTableOfContents);

  const [isBookMenuOpen, setIsBookMenuOpen] = useState(false);
  const onToggleBookMenu = useCallback(() => {
    setIsTableOfContentsOpen(false);
    setIsBookMenuOpen((open) => !open);
    setIsChapterMenuOpen(false);
  }, []);
  const onCloseBookMenu = useCallback(() => {
    setIsBookMenuOpen(false);
  }, []);

  const [isChapterMenuOpen, setIsChapterMenuOpen] = useState(false);
  const onToggleChapterMenu = useCallback(() => {
    setIsTableOfContentsOpen(false);
    setIsBookMenuOpen(false);
    setIsChapterMenuOpen((open) => !open);
  }, []);
  const onCloseChapterMenu = useCallback(() => {
    setIsChapterMenuOpen(false);
  }, []);

  const [selectedBook, setSelectedBook] = useState(currentBook);
  const onSelectBook = useCallback((selected: string) => {
    setSelectedBook(selected);
    setIsBookMenuOpen(false);
    setIsChapterMenuOpen(true);
  }, []);

  const [selectedChapter, setSelectedChapter] = useState(currentChapter);
  const onSelectChapter = useCallback(
    (selected: string) => {
      setSelectedChapter(selected);
      setIsChapterMenuOpen(false);
      router.push(getRouteFromBookAndChapter(selectedBook, selected));
    },
    [router, selectedBook]
  );

  const onSelectBookAndChapter = useCallback(
    (book: string, chapter: string, slug: string) => {
      setIsTableOfContentsOpen(false);
      setSelectedBook(book);
      setSelectedChapter(chapter);
      router.push(getRouteFromBookAndChapter(book, chapter));
    },
    [router]
  );

  const [isReadingHistoryMenuOpen, setIsReadingHistoryMenuOpen] =
    useState(false);
  const onToggleReadingHistoryMenu = useCallback(() => {
    setIsReadingHistoryMenuOpen((open) => !open);
  }, []);
  const onCloseReadingHistoryMenu = useCallback(() => {
    setIsReadingHistoryMenuOpen(false);
  }, []);
  const [readingHistory] = useReadingHistory();
  const onSelectReadingHistoryEntry = useCallback(
    (entry: ReadingHistoryEntry) => {
      setIsReadingHistoryMenuOpen(false);
      router.push(getRouteFromBookAndChapter(entry.book, entry.chapter));
    },
    [router]
  );

  const tableOfContentsEntries = flatMap(tableOfContents, (chapters, book) =>
    map(chapters, (slug, chapter) => ({
      book,
      chapter,
      slug,
    }))
  );

  const [tableOfContentsFilter, setTableOfContentsFilter] = useState("");
  const onChangeTableOfContentsFilter = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTableOfContentsFilter(event.target.value);
    },
    []
  );

  const filteredTableOfContentsEntries = tableOfContentsEntries.filter(
    (entry) =>
      fuzzysearch(
        tableOfContentsFilter.toLowerCase(),
        `${entry.book} ${entry.chapter}`.toLowerCase()
      )
  );

  useEffect(() => {
    setSelectedBook(currentBook);
    setSelectedChapter(currentChapter);
  }, [currentBook, currentChapter]);

  return (
    <>
      <button css={tableOfContentsButtonCss} onClick={onToggleTableOfContents}>
        <Icon path={mdiTableOfContents} size={0.7} />
      </button>
      {isTableOfContentsOpen && (
        <FloatingBox
          shouldMaximizeOnMobile
          css={tableOfContentsCss}
          onClickOutside={onCloseTableOfContents}
        >
          <div css={topControlsCss}>
            <TableOfContentsTitle onClose={onCloseTableOfContents} />
            <input
              ref={filterInputRef}
              type="text"
              css={tableOfContentsFilterCss}
              placeholder="Start typing to filter"
              value={tableOfContentsFilter}
              onChange={onChangeTableOfContentsFilter}
            />
          </div>

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
                onSelect={onSelectBookAndChapter}
              />
            ))}

            {isEmpty(filteredTableOfContentsEntries) && (
              <div css={emptyTableOfContentsCss}>
                <em data-muted>Nothing matches your filter.</em>
              </div>
            )}
          </div>
        </FloatingBox>
      )}

      <button css={bookButtonCss} onClick={onToggleBookMenu}>
        {selectedBook}
      </button>
      {isBookMenuOpen && (
        <FloatingBox css={bookMenuCss} onClickOutside={onCloseBookMenu}>
          {Object.keys(tableOfContents).map((book) => (
            <BookMenuItem
              key={book}
              book={book}
              isSelected={currentBook === book}
              onSelect={onSelectBook}
            />
          ))}
        </FloatingBox>
      )}

      <button css={chapterButtonCss} onClick={onToggleChapterMenu}>
        {selectedChapter}
      </button>
      {isChapterMenuOpen && (
        <FloatingBox css={chapterMenuCss} onClickOutside={onCloseChapterMenu}>
          {Object.keys(tableOfContents[selectedBook]).map((chapter) => (
            <ChapterMenuItem
              key={chapter}
              chapter={chapter}
              isSelected={currentChapter === chapter}
              onSelect={onSelectChapter}
            />
          ))}
        </FloatingBox>
      )}

      <button
        css={readingHistoryButtonCss}
        onClick={onToggleReadingHistoryMenu}
      >
        <Icon path={mdiHistory} size={0.7} />
      </button>
      {isReadingHistoryMenuOpen && (
        <FloatingBox
          css={readingHistoryMenuCss}
          onClickOutside={onCloseReadingHistoryMenu}
        >
          <header data-sub-header data-muted css={marginCss("5px")}>
            Reading History
          </header>

          {readingHistory.map((entry, index) => (
            <ReadingHistoryMenuItem
              key={index}
              entry={entry}
              onSelect={onSelectReadingHistoryEntry}
            />
          ))}
        </FloatingBox>
      )}
    </>
  );
};
