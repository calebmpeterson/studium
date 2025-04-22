import { css } from "@emotion/react";
import { mdiChevronLeft, mdiChevronRight, mdiMapMarkerMultiple } from "@mdi/js";
import Icon from "@mdi/react";
import { motion } from "framer-motion";
import { flatMap, isEmpty } from "lodash";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import slugify from "slugify";

import { Overlay } from "@/components/Overlay";
import { ReadingNav } from "@/components/ReadingNav";
import { SearchController } from "@/components/SearchController";
import { ShareController } from "@/components/ShareController";
import { Tooltip } from "@/components/Tooltip";
import { TopNav } from "@/components/TopNav";
import { VerseDisplay } from "@/components/VerseDisplay";
import { getBookAndChapter } from "@/data/getBookAndChapter";
import { getTableOfContents } from "@/data/getTableOfContents";
import { useToggle } from "@/hooks/useToggle";
import { useVersesToShare } from "@/hooks/useVersesToShare";
import { useCrossReferences } from "@/queries/useCrossReferences";
import { useTrackReadingHistory } from "@/state/useTrackReadingHistory";
import { breakpoints } from "@/styles/breakpoints";
import { fade } from "@/styles/motion";
import { shadows } from "@/styles/shadows";
import { TableOfContents, Verse } from "@/types";
import { getNextBookAndChapter } from "@/utils/getNextBookAndChapter";
import { getPreviousBookAndChapter } from "@/utils/getPreviousBookAndChapter";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";
import { parseFragment } from "@/utils/parseFragment";

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
  gap: 5px;
  justify-content: space-between;

  @media ${breakpoints["is-mobile"]} {
    padding: 0 30px;
  }
`;

const navButtonContainerCss = css``;

const navButtonCss = css`
  position: sticky;
  top: 80%;
  margin-bottom: 20px;
  box-shadow: ${shadows["shadow-md"]};
`;

const navButtonPlaceholderCss = css`
  width: var(--input-size);
  min-width: var(--input-size);
  height: var(--input-size);
`;

const navSearchFormCss = css`
  width: 100%;
  // Override the default form flex layout.
  display: block;
`;

const navSearchCss = css`
  width: 100%;
  box-shadow: ${shadows["shadow-md"]};
`;

const placesContainerCss = css`
  height: 400px;
`;

type DataResult = {
  book: string;
  chapter: string;
  verses: Verse[];
};

type ErrorResult = {
  message: string;
};

type Result = (DataResult | ErrorResult) & {
  tableOfContents: TableOfContents;
};

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

const EMPTY_VERSES: Verse[] = [];

export default function BookAndChapter({ tableOfContents, ...props }: Props) {
  const router = useRouter();
  const [isRouting, setIsRouting] = useState(false);

  const currentBook = "book" in props ? props.book : "Genesis";
  const currentChapter = "chapter" in props ? props.chapter : "1";

  useTrackReadingHistory(currentBook, currentChapter);

  const crossReferences = useCrossReferences(currentBook, currentChapter);

  const verses = "verses" in props ? props.verses : EMPTY_VERSES;

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

  const onPrevious = useCallback(async () => {
    if (!("none" in previousBookAndChapter)) {
      setIsRouting(true);
      await router.push(
        getRouteFromBookAndChapter(
          previousBookAndChapter.book,
          previousBookAndChapter.chapter
        )
      );
      setIsRouting(false);
    }
  }, [previousBookAndChapter, router]);

  const onNext = useCallback(async () => {
    if (!("none" in nextBookAndChapter)) {
      setIsRouting(true);
      await router.push(
        getRouteFromBookAndChapter(
          nextBookAndChapter.book,
          nextBookAndChapter.chapter
        )
      );
      setIsRouting(false);
    }
  }, [nextBookAndChapter, router]);

  const search = useToggle();
  const map = useToggle();
  const share = useToggle();

  const title = `${currentBook} ${currentChapter} | Studium`;

  useEffect(() => {
    const onHashChange = () => {
      const fragment = location.hash.replace("#", "");
      const areVersesHighlighted = !isEmpty(parseFragment(fragment));
      share.change(areVersesHighlighted);
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [share]);

  const { versesToShare } = useVersesToShare(verses);
  const onShare = useCallback(() => {
    if (versesToShare.length > 0) {
      share.open();
      return true;
    }

    return false;
  }, [share, versesToShare]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <TopNav onShare={onShare}>
        <ReadingNav
          tableOfContents={tableOfContents}
          currentBook={currentBook}
          currentChapter={currentChapter}
        />
      </TopNav>

      <motion.main
        key={`${currentBook} ${currentChapter}`}
        css={layoutCss}
        {...fade}
      >
        <div css={versesCss}>
          {"verses" in props &&
            props.verses.map((verse) => (
              <VerseDisplay
                key={verse.verse}
                {...verse}
                crossReferences={crossReferences[verse.verse]}
              />
            ))}
        </div>
      </motion.main>

      <nav css={chapterNavigationCss}>
        <div css={navButtonContainerCss}>
          {hasPrevious ? (
            <button
              data-icon
              aria-label={previousBookAndChapter.label}
              css={navButtonCss}
              disabled={isRouting}
              onClick={onPrevious}
            >
              <Icon path={mdiChevronLeft} size={0.7} />
              <Tooltip placement="top">Previous chapter</Tooltip>
            </button>
          ) : (
            <div css={navButtonPlaceholderCss} />
          )}
        </div>

        <form css={navSearchFormCss}>
          <input
            type="text"
            css={navSearchCss}
            placeholder="Search by words or topic..."
            onFocus={search.open}
          />
        </form>

        <button
          data-icon
          css={navButtonCss}
          onClick={map.open}
          aria-label="View places"
        >
          <Icon path={mdiMapMarkerMultiple} size={0.7} />
        </button>

        <div css={navButtonContainerCss}>
          {hasNext ? (
            <button
              data-icon
              aria-label={nextBookAndChapter.label}
              disabled={isRouting}
              css={navButtonCss}
              onClick={onNext}
            >
              <Icon path={mdiChevronRight} size={0.7} />
              <Tooltip placement="top">Next chapter</Tooltip>
            </button>
          ) : (
            <div css={navButtonPlaceholderCss} />
          )}
        </div>
      </nav>

      {map.isOpen && (
        <Overlay
          title={`Places in ${currentBook} ${currentChapter}`}
          onClose={map.close}
        >
          <div css={placesContainerCss}>
            <DynamicPlacesDisplay
              book={currentBook}
              chapter={currentChapter}
              verses={verses}
            />
          </div>
        </Overlay>
      )}

      {search.isOpen && <SearchController onClose={search.close} />}

      {share.isOpen && (
        <ShareController
          book={currentBook}
          chapter={currentChapter}
          verses={verses}
          onClose={share.close}
        />
      )}
    </>
  );
}
