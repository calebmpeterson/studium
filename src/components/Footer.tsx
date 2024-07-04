import { css } from "@emotion/react";
import { map } from "lodash";
import Link from "next/link";
import { FC } from "react";
import slugify from "slugify";

import BOOK_CATEGORIES from "@/data/json/categorized-books.json";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";

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

const bookContainerCss = css`
  padding: 0 0 0 5px;
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
                <div key={slugify(book)} css={bookContainerCss}>
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
