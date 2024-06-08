import Link from "next/link";
import { FC } from "react";

import { Verse } from "@/types";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";

interface Props extends Verse {
  onClick: () => void;
}

export const SearchResultDisplay: FC<Props> = ({
  book,
  chapter,
  verse,
  text,
  onClick,
}) => (
  <div>
    <Link
      href={getRouteFromBookAndChapter(book, chapter, verse)}
      onClick={onClick}
    >
      {book} {chapter}:{verse}
    </Link>
    <div>{text}</div>
  </div>
);
