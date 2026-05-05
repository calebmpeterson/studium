import { css } from "@emotion/react";
import Link from "next/link";
import { FC } from "react";

import { SearchResult } from "@/types";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";

interface Props {
  result: SearchResult;
  onClick: () => void;
}

const headerCss = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const firstMentionPillCss = css`
  border: 1px solid var(--border-color);
  border-radius: 999px;
  padding: 1px 8px;
`;

export const SearchResultDisplay: FC<Props> = ({ result, onClick }) => {
  const { verse } = result;

  return (
    <div>
      <div css={headerCss}>
        <Link
          href={getRouteFromBookAndChapter(
            verse.book,
            verse.chapter,
            verse.verse
          )}
          onClick={onClick}
        >
          {verse.book} {verse.chapter}:{verse.verse}
        </Link>

        {result.kind === "first-mention" && (
          <small css={firstMentionPillCss} data-muted>
            First mention: {result.word}
          </small>
        )}
      </div>

      <div>{verse.text}</div>
    </div>
  );
};
