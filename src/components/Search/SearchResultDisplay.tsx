import { css } from "@emotion/react";
import Link from "next/link";
import { FC } from "react";

import { SearchResult } from "@/types";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";

import { FirstMentionPill } from "./FirstMentionPill";

const headerCss = css`
  display: flex;
  align-items: baseline;
  gap: 5px;
`;

interface Props {
  result: SearchResult;
  onClick: () => void;
}

export const SearchResultDisplay: FC<Props> = ({ result, onClick }) => {
  const { verse } = result;

  return (
    <div>
      <div css={headerCss}>
        <Link
          href={getRouteFromBookAndChapter(
            verse.book,
            verse.chapter,
            verse.verse,
          )}
          onClick={onClick}
        >
          {verse.book} {verse.chapter}:{verse.verse}
        </Link>

        {result.kind === "first-mention" && (
          <FirstMentionPill word={result.word} />
        )}
      </div>

      <div>{verse.text}</div>
    </div>
  );
};
