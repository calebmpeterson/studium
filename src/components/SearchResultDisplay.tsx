import { SearchResult, Verse } from "@/types";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";
import Link from "next/link";
import { FC } from "react";

export const SearchResultDisplay: FC<Verse> = ({
  book,
  chapter,
  verse,
  text,
}) => (
  <div>
    <Link href={getRouteFromBookAndChapter(book, chapter, verse)}>
      {book} {chapter}:{verse}
    </Link>
    <div>{text}</div>
  </div>
);
