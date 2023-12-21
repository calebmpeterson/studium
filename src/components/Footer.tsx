import { FC } from "react";
import BOOK_CATEGORIES from "@/data/json/categorized-books.json";
import slugify from "slugify";
import { map } from "lodash";
import { css } from "@emotion/react";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";
import Link from "next/link";

type Testament = keyof typeof BOOK_CATEGORIES;

const testamentsLayoutCss = css`
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: stretch;
  gap: 20px;
`;

const testamentLayoutCss = css`
  box-sizing: border-box;
  padding: 20px;
  flex: 1 1 auto;
`;

const categoriesLayoutCss = css`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: start;
  gap: 20px;
`;

const categoryLayoutCss = css`
  box-sizing: border-box;
  padding: 20px 0;
  flex: 1 1 auto;
`;

export const Footer: FC = () => (
  <footer css={testamentsLayoutCss}>
    {map(BOOK_CATEGORIES, (categories, testament: Testament) => (
      <div key={slugify(testament)} css={testamentLayoutCss}>
        <header>{testament}</header>

        <div css={categoriesLayoutCss}>
          {map(categories, (books, category) => (
            <div key={slugify(category)} css={categoryLayoutCss}>
              <header data-sub-header>{category}</header>
              {books.map((book) => (
                <div key={slugify(book)}>
                  <Link href={getRouteFromBookAndChapter(book, "1")}>
                    {book}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ))}
  </footer>
);
