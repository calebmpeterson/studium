import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { capitalize } from "lodash";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { TopNav } from "@/components/TopNav";
import { getFirstMentionIndex } from "@/data/getFirstMentionIndex";
import { FirstMentionIndex } from "@/schemas/first-mention-index";
import { flexboxCss, marginCss } from "@/styles/layout";
import { fade } from "@/styles/motion";
import { slugifyReference } from "@/utils/slugifyReference";

type Result = {
  entries: FirstMentionIndex;
};

const containerCss = css`
  max-width: 800px;
  width: 100%;
  min-height: 100vh;
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
  width: 100%;
`;

const navLayoutCss = css`
  display: flex;
  align-items: center;
`;

const separatorCss = css`
  border-bottom: 1px solid var(--border-color);
  width: 100%;
  flex: 1 1 auto;
`;

const textCss = css`
  word-break: none;
  flex-shrink: 0;
`;

const linkCss = css`
  padding: 0 11px;
`;

const searchInputCss = css`
  width: 100%;
`;

export const getServerSideProps: GetServerSideProps<Result, {}> = async (
  context
) => {
  const entries = getFirstMentionIndex();

  return {
    props: {
      entries,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function FirstMentionIndexPage({ entries }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries =
    searchQuery.length >= 2
      ? Object.entries(entries).filter(([word]) =>
          word.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Head>
        <title>First Mentions | Studium</title>
      </Head>

      <TopNav isResource>
        <div css={navLayoutCss}>
          <header>First Mentions</header>
        </div>
      </TopNav>

      <motion.div key="first-mention-index" css={containerCss} {...fade}>
        <div css={marginCss("10px 0")}>
          <input
            ref={searchInputRef}
            data-shadow-sm
            type="text"
            placeholder="Search first word mentions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            css={searchInputCss}
          />
        </div>

        {filteredEntries.length === 0 && (
          <div
            css={flexboxCss({
              justify: "center",
              align: "center",
              gap: "40px",
              margin: "40px 0",
            })}
          >
            <div css={marginCss("0 11px")}>
              The <strong>Law of First Mention</strong> is a principle used in
              Bible study and interpretation. It suggests that the first time a
              concept, word, or doctrine appears in the Bible sets a pattern or
              foundation for how that idea will be understood throughout the
              rest of Scripture.
            </div>

            <small data-muted data-italic>
              Type at least 2 characters to begin searching&hellip;
            </small>
          </div>
        )}

        <div css={layoutCss}>
          {filteredEntries.map(([word, verse]) => (
            <Link key={word} href={slugifyReference(verse)} css={linkCss}>
              <div id={word} css={flexboxCss({ wrap: false })}>
                <strong css={textCss}>{capitalize(word)}</strong>
                <div css={separatorCss} />
                <span css={textCss}>
                  {verse.book} {verse.chapter}:{verse.verse}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
}
