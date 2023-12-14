import slugify from "slugify";

type Props = {
  book: string;
  chapter: string;
  verse?: string | number;
};

export const slugifyReference = ({ book, chapter, verse }: Props) =>
  `/${slugify(book.toLowerCase())}/${chapter}${verse ? "#" + verse : ""}`;
