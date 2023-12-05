import Head from "next/head";
import { css } from "@emotion/react";
import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { getBookAndChapter } from "@/data/getBookAndChapter";
import { Place, TableOfContents, Verse } from "@/types";
import { getTableOfContents } from "@/data/getTableOfContents";
import { TopNav } from "@/components/TopNav";
import { VerseDisplay } from "@/components/VerseDisplay";
import { useCallback, useEffect } from "react";
import { getNextBookAndChapter } from "@/utils/getNextBookAndChapter";
import { getPreviousBookAndChapter } from "@/utils/getPreviousBookAndChapter";
import { useRouter } from "next/router";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";
import { getPlacesFromBookAndChapter } from "@/data/getPlacesInBookAndChapter";

import dynamic from "next/dynamic";
import { BASE_COLOR } from "@/styles/colors";
import { shadows } from "@/styles/shadows";
import { breakpoints } from "@/styles/breakpoints";
import { first, flatMap, isEqual, values } from "lodash";
import slugify from "slugify";
import { useReadingHistory } from "@/state/useReadingHistory";
import { useTrackReadingHistory } from "@/state/useTrackReadingHistory";

const DynamicPlacesDisplay = dynamic(
  async () => import("@/components/PlacesController"),
  {
    ssr: false,
  }
);

const layoutCss = css`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 20px auto;
  gap: 20px;
`;

const versesCss = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 800px;
  box-sizing: border-box;
  padding: 0 20px;
  gap: 10px;
`;

const chapterNavigationCss = css`
  position: sticky;
  bottom: 0px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 0px;
  max-width: 800px;
  display: flex;
  justify-content: space-between;

  @media ${breakpoints["is-mobile"]} {
    padding: 0 30px;
  }
`;

const navButtonContainerCss = css``;

const navButtonCss = css`
  width: 36px;
  height: 36px;
  position: sticky;
  top: 80%;
  margin-bottom: 20px;
  box-shadow: ${shadows["shadow-md"]};
`;

const navButtonPlaceholderCss = css`
  width: 36px;
  min-width: 36px;
  height: 36px;
`;

const placesContainerCss = css`
  height: 400px;
  border-top: 1px solid ${BASE_COLOR[400]};
  background-color: ${BASE_COLOR[800]};
`;

type DataResult = {
  book: string;
  chapter: string;
  verses: Verse[];
};

type ErrorResult = {
  message: string;
};

type Result = (DataResult | ErrorResult) & { tableOfContents: TableOfContents };

export const getStaticPaths = async () => {
  const tableOfContents = getTableOfContents();
  const paths = flatMap(tableOfContents, (chapters, book) =>
    Object.keys(chapters).map((chapter) => ({
      book: slugify(book.toLowerCase()),
      chapter,
    }))
  );

  return {
    paths: paths.map(({ book, chapter }) => ({ params: { book, chapter } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  Result & { status: "success" | "failure" },
  { book: string; chapter: string }
> = async (context) => {
  const { book, chapter } = context.params ?? {};
  const [result, status] = getBookAndChapter(book, chapter);
  const tableOfContents = getTableOfContents();
  return {
    props: {
      ...result,
      tableOfContents,
      status: status === 200 ? "success" : "failure",
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function BookAndChapter({ tableOfContents, ...props }: Props) {
  const currentBook = "book" in props ? props.book : "Genesis";
  const currentChapter = "chapter" in props ? props.chapter : "1";
  useTrackReadingHistory(currentBook, currentChapter);

  const verses = "verses" in props ? props.verses : [];

  const previousBookAndChapter = getPreviousBookAndChapter(
    tableOfContents,
    currentBook,
    currentChapter
  );
  const hasPrevious = !("none" in previousBookAndChapter);

  const nextBookAndChapter = getNextBookAndChapter(
    tableOfContents,
    currentBook,
    currentChapter
  );
  const hasNext = !("none" in nextBookAndChapter);

  const router = useRouter();

  const onPrevious = useCallback(() => {
    if (!("none" in previousBookAndChapter)) {
      router.push(
        getRouteFromBookAndChapter(
          previousBookAndChapter.book,
          previousBookAndChapter.chapter
        )
      );
    }
  }, [previousBookAndChapter, router]);

  const onNext = useCallback(() => {
    if (!("none" in nextBookAndChapter)) {
      router.push(
        getRouteFromBookAndChapter(
          nextBookAndChapter.book,
          nextBookAndChapter.chapter
        )
      );
    }
  }, [nextBookAndChapter, router]);

  return (
    <>
      <Head>
        <title>
          {currentBook} {currentChapter} | Studium
        </title>
        <meta name="description" content="Bible study" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopNav
        tableOfContents={tableOfContents}
        currentBook={currentBook}
        currentChapter={currentChapter}
      />

      <main css={layoutCss}>
        <div css={versesCss}>
          {"verses" in props &&
            props.verses.map((verse) => (
              <VerseDisplay key={verse.verse} {...verse} />
            ))}
        </div>
      </main>

      <nav css={chapterNavigationCss}>
        <div css={navButtonContainerCss}>
          {hasPrevious ? (
            <button
              css={navButtonCss}
              onClick={onPrevious}
              aria-label={previousBookAndChapter.label}
            >
              ⏴
            </button>
          ) : (
            <div css={navButtonPlaceholderCss} />
          )}
        </div>

        <div css={navButtonContainerCss}>
          {hasNext ? (
            <button
              css={navButtonCss}
              onClick={onNext}
              aria-label={nextBookAndChapter.label}
            >
              ⏵
            </button>
          ) : (
            <div css={navButtonPlaceholderCss} />
          )}
        </div>
      </nav>

      <aside css={placesContainerCss}>
        <DynamicPlacesDisplay
          book={currentBook}
          chapter={currentChapter}
          verses={verses}
        />
      </aside>
    </>
  );
}
