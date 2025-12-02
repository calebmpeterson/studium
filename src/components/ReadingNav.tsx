import { css } from "@emotion/react";
import { mdiClose, mdiHistory } from "@mdi/js";
import Icon from "@mdi/react";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";

import { useReadingHistory } from "@/state/useReadingHistory";
import { ReadingHistoryEntry, TableOfContents } from "@/types";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";

import { BookMenuItem } from "./BookMenuItem";
import { ChapterMenuItem } from "./ChapterMenuItem";
import { FloatingBox } from "./FloatingBox";
import { ReadingHistoryMenuItem } from "./ReadingHistoryMenuItem";
import { Tooltip } from "./Tooltip";

interface Props {
  tableOfContents: TableOfContents;
  currentBook: string;
  currentChapter: string;
}

const bookButtonCss = css`
  white-space: pre;
`;

const chapterButtonCss = css`
  width: 50px;
`;

const readingHistoryButtonCss = css``;

const bookMenuCss = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 5px;
  min-width: 240px;
`;

const chapterMenuCss = css`
  width: fit-content;
  max-width: 400px;
  padding: 5px;

  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const readingHistoryMenuCss = css`
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 240px;
`;

const overlayHeaderCss = css`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 5px 0 5px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg);
`;

const overlayTitleCss = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ReadingNav: FC<Props> = ({
  tableOfContents,
  currentBook,
  currentChapter,
}) => {
  const router = useRouter();

  const [isBookMenuOpen, setIsBookMenuOpen] = useState(false);
  const onToggleBookMenu = useCallback(() => {
    setIsBookMenuOpen((open) => !open);
    setIsChapterMenuOpen(false);
  }, []);
  const onCloseBookMenu = useCallback(() => {
    setIsBookMenuOpen(false);
  }, []);

  const [isChapterMenuOpen, setIsChapterMenuOpen] = useState(false);
  const onToggleChapterMenu = useCallback(() => {
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

  useEffect(() => {
    setSelectedBook(currentBook);
    setSelectedChapter(currentChapter);
  }, [currentBook, currentChapter]);

  return (
    <>
      <button css={bookButtonCss} onClick={onToggleBookMenu}>
        {selectedBook}
      </button>
      {isBookMenuOpen && (
        <FloatingBox
          shouldMaximizeOnMobile
          css={bookMenuCss}
          onClickOutside={onCloseBookMenu}
        >
          <div css={overlayHeaderCss}>
            <header css={overlayTitleCss}>Books</header>

            <button
              role="button"
              aria-label="Close books menu"
              data-icon
              data-borderless
              onClick={onCloseBookMenu}
            >
              <Icon path={mdiClose} size={0.7} />
            </button>
          </div>
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

        <Tooltip placement="right">Reading history</Tooltip>
      </button>
      {isReadingHistoryMenuOpen && (
        <FloatingBox
          shouldMaximizeOnMobile
          css={readingHistoryMenuCss}
          onClickOutside={onCloseReadingHistoryMenu}
        >
          <div css={overlayHeaderCss}>
            <header css={overlayTitleCss}>Reading History</header>

            <button
              role="button"
              aria-label="Close cross references"
              data-icon
              data-borderless
              onClick={onCloseReadingHistoryMenu}
            >
              <Icon path={mdiClose} size={0.7} />
            </button>
          </div>

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
