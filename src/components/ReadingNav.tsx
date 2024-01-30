import { ReadingHistoryEntry, TableOfContents } from "@/types";
import { css } from "@emotion/react";
import { FC, useCallback, useEffect, useState } from "react";
import { BookMenuItem } from "./BookMenuItem";
import { ChapterMenuItem } from "./ChapterMenuItem";
import { useRouter } from "next/router";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";
import Icon from "@mdi/react";
import { mdiHistory } from "@mdi/js";
import { ReadingHistoryMenuItem } from "./ReadingHistoryMenuItem";
import { useReadingHistory } from "@/state/useReadingHistory";
import { FloatingBox } from "./FloatingBox";
import { marginCss } from "@/styles/layout";

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
