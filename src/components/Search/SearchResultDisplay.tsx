import { css } from "@emotion/react";
import Link from "next/link";
import { FC } from "react";

import { SearchResult } from "@/types";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";

import { FirstMentionPill } from "./FirstMentionPill";

const resultContainerCss = css`
  position: relative;
  padding-top: 20px;
`;

interface Props {
  result: SearchResult;
  onClick: () => void;
}

export const SearchResultDisplay: FC<Props> = ({ result, onClick }) => {
  const { verse } = result;

  return (
    <div css={resultContainerCss}>
      {result.kind === "first-mention" && (
        <FirstMentionPill word={result.word} />
      )}

      <Link
        href={getRouteFromBookAndChapter(verse.book, verse.chapter, verse.verse)}
        onClick={onClick}
      >
        {verse.book} {verse.chapter}:{verse.verse}
      </Link>
      <div>{verse.text}</div>
    </div>
  );
};
