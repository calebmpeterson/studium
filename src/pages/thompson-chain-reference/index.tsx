import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { mapValues } from "lodash";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { MouseEvent, useCallback } from "react";

import { TopNav } from "@/components/TopNav";
import { getThompsonChainReferences } from "@/data/getThompsonChainReferences";
import { fade } from "@/styles/motion";

type Result = {
  entries: Record<string, string>;
  firstIdPerLetter: Record<string, string>;
};

const containerCss = css`
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const layoutCss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const navLayoutCss = css`
  display: flex;
  align-items: center;
`;

const firstLetterLinksContainerCss = css`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const letterCss = css`
  border-bottom: 1px solid var(--border-color);
`;

const linkCss = css`
  padding: 0 0 0 10px;
`;

export const getServerSideProps: GetServerSideProps<Result, {}> = async (
  context
) => {
  const entries = mapValues(
    getThompsonChainReferences(),
    (entry) => entry.name
  );

  const firstIdPerLetter = Object.entries(entries).reduce(
    (accum, [id, name]) => {
      const firstLetter = name[0];
      if (firstLetter in accum) {
        return accum;
      }
      return { ...accum, [firstLetter]: id };
    },
    {}
  );

  return {
    props: {
      entries,
      firstIdPerLetter,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ThompsonChainReferences({
  entries,
  firstIdPerLetter,
}: Props) {
  const onJumpToLetter = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const href = event.currentTarget.getAttribute("href");
    if (href) {
      const targetElement = document.querySelector(href);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Thompson Chain References</title>
      </Head>

      <TopNav>
        <div css={navLayoutCss}>
          <small>Thompson Chain References</small>
        </div>
      </TopNav>

      <motion.div
        key="thompson-chain-reference-index"
        css={containerCss}
        {...fade}
      >
        <header>Thompson Chain References</header>

        <div css={firstLetterLinksContainerCss}>
          {Object.entries(firstIdPerLetter).map(([letter, id]) => (
            <a
              key={letter}
              href={`#${letter}`}
              role="button"
              data-borderless
              data-icon
              onClick={onJumpToLetter}
            >
              {letter}
            </a>
          ))}
        </div>

        <div css={layoutCss}>
          {Object.entries(entries).map(([id, name]) => (
            <div key={id} id={id}>
              {firstIdPerLetter[name[0]] === id && (
                <header css={letterCss} id={name[0]}>
                  {name[0]}
                </header>
              )}

              <Link href={`/thompson-chain-reference/${id}`} css={linkCss}>
                {id}&nbsp;{name}
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
