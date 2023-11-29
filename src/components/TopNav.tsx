import { BASE_COLOR } from "@/styles/colors";
import { TableOfContents } from "@/types";
import { css } from "@emotion/react";
import { FC, useCallback, useEffect, useState } from "react";
import { BookMenuItem } from "./BookMenuItem";
import { ChapterMenuItem } from "./ChapterMenuItem";
import { useRouter } from "next/router";
import slugify from "slugify";
import { shadows } from "@/styles/shadows";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";
import Icon from "@mdi/react";
import { mdiBookOpenPageVariant } from "@mdi/js";

interface Props {
  tableOfContents: TableOfContents;
  currentBook: string;
  currentChapter: string;
}

const layoutCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${BASE_COLOR[400]};
  padding: 10px;
  position: sticky;
  z-index: 1000;
  top: 0;
  background-color: ${BASE_COLOR[900]};

  & > div {
    width: 100%;
  }
`;

const tocContainerCss = css`
  width: 100%;
  position: relative;
  display: flex;
  gap: 5px;
  justify-content: center;
`;

const titleLayoutCss = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const bookButtonCss = css`
  width: 150px;
`;

const chapterButtonCss = css`
  width: 50px;
`;

const menuCss = css`
  position: absolute;
  top: calc(100% + 5px);
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${BASE_COLOR[900]};
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid ${BASE_COLOR[400]};
  box-shadow: ${shadows["shadow-xl"]};
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

export const TopNav: FC<Props> = ({
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

  useEffect(() => {
    setSelectedBook(currentBook);
    setSelectedChapter(currentChapter);
  }, [currentBook, currentChapter]);

  return (
    <nav css={layoutCss}>
      <div css={titleLayoutCss}>
        <Icon path={mdiBookOpenPageVariant} size={0.7} />
        <strong>Studium</strong>
      </div>

      <div css={tocContainerCss}>
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
      </div>

      <div></div>
    </nav>
  );
};
