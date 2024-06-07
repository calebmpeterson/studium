import { shadows } from "@/styles/shadows";
import { TableOfContents } from "@/types";
import { css } from "@emotion/react";
import { mdiClose, mdiTableOfContents } from "@mdi/js";
import Icon from "@mdi/react";
import fuzzysearch from "fuzzysearch";
import { flatMap, isEmpty, map } from "lodash";
import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { FloatingBox } from "../FloatingBox";
import { TableOfContentsItem } from "./TableOfContentsItem";

interface Props {
  tableOfContents: TableOfContents;
  isTableOfContentsOpen: boolean;
  currentBook: string;
  currentChapter: string;
  onToggleTableOfContents: () => void;
  onCloseTableOfContents: () => void;
  onSelectBookAndChapter: (book: string, chapter: string, slug: string) => void;
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

const tableOfContentsButtonCss = css``;

export const TableOfContentsMenu: FC<Props> = ({
  tableOfContents,
  currentBook,
  currentChapter,
  isTableOfContentsOpen,
  onCloseTableOfContents,
  onToggleTableOfContents,
  onSelectBookAndChapter,
}) => {
  const filterInputRef = useRef<HTMLInputElement>(null);

  useHotkeys("ctrl+k", onToggleTableOfContents);

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

  const onToggle = useCallback(() => {
    onToggleTableOfContents();

    setTableOfContentsFilter("");

    setTimeout(() => {
      if (filterInputRef.current) {
        filterInputRef.current.focus();

        const event = new Event("touchstart", { bubbles: true });
        filterInputRef.current.dispatchEvent(event);
      }
    }, 0);
  }, [onToggleTableOfContents]);

  return (
    <>
      <button css={tableOfContentsButtonCss} onClick={onToggle}>
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
              placeholder="Jump to book and chapter..."
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
    </>
  );
};
