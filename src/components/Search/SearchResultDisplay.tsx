import Link from "next/link";
import { FC } from "react";

import { SearchResult } from "@/types";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";

interface Props {
  result: SearchResult;
  onClick: () => void;
}

export const SearchResultDisplay: FC<Props> = ({ result, onClick }) => {
  const { verse } = result;

  return (
    <div>
      {result.kind === "first-mention" && (
        <small data-muted>First mention: {result.word}</small>
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
