import { ReadingHistoryEntry, TableOfContents } from "@/types";
import { css } from "@emotion/react";
import { FC, useCallback, useEffect, useState } from "react";
import { BookMenuItem } from "./BookMenuItem";
import { ChapterMenuItem } from "./ChapterMenuItem";
import { useRouter } from "next/router";
import { shadows } from "@/styles/shadows";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";
import Icon from "@mdi/react";
import { mdiHistory } from "@mdi/js";
import { ReadingHistoryMenuItem } from "./ReadingHistoryMenuItem";
import { useReadingHistory } from "@/state/useReadingHistory";

interface Props {
  tableOfContents: TableOfContents;
  currentBook: string;
  currentChapter: string;
}

const bookButtonCss = css`
  width: 150px;
`;

const chapterButtonCss = css`
  width: 50px;
`;

const readingHistoryButtonCss = css``;

const menuCss = css`
  position: absolute;
  top: calc(100% + 5px);
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--bg);
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  box-shadow: ${shadows["shadow-xl"]};
  min-width: 200px;

  & > header {
    padding: 5px 10px;
    font-size: 12px;
    color: var(--border-color);
    font-weight: normal;
    text-transform: uppercase;
  }
`;

const bookMenuCss = css`
  ${menuCss}

  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const chapterMenuCss = css`
  ${menuCss}

  max-width: 372px;
`;

const readingHistoryMenuCss = css`
  ${menuCss}

  display: flex;
  flex-direction: column;
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

  const [isChapterMenuOpen, setIsChapterMenuOpen] = useState(false);
  const onToggleChapterMenu = useCallback(() => {
    setIsBookMenuOpen(false);
    setIsChapterMenuOpen((open) => !open);
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
  const [readingHistory] = useReadingHistory();
  const onSelectReadingHistoryEntry = useCallback(
    (entry: ReadingHistoryEntry) => {
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
        <div css={bookMenuCss}>
          {Object.keys(tableOfContents).map((book) => (
            <BookMenuItem key={book} book={book} onSelect={onSelectBook} />
          ))}
        </div>
      )}

      <button css={chapterButtonCss} onClick={onToggleChapterMenu}>
        {selectedChapter}
      </button>
      {isChapterMenuOpen && (
        <div css={chapterMenuCss}>
          {Object.keys(tableOfContents[selectedBook]).map((chapter) => (
            <ChapterMenuItem
              key={chapter}
              chapter={chapter}
              onSelect={onSelectChapter}
            />
          ))}
        </div>
      )}
      <button
        css={readingHistoryButtonCss}
        onClick={onToggleReadingHistoryMenu}
      >
        <Icon path={mdiHistory} size={0.7} />
      </button>
      {isReadingHistoryMenuOpen && (
        <div css={readingHistoryMenuCss}>
          <header>Reading History</header>
          {readingHistory.map((entry, index) => (
            <ReadingHistoryMenuItem
              key={index}
              entry={entry}
              onSelect={onSelectReadingHistoryEntry}
            />
          ))}
        </div>
      )}
    </>
  );
};
