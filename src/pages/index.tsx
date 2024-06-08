import { css } from "@emotion/react";
import { mdiBookOpenPageVariant } from "@mdi/js";
import Icon from "@mdi/react";
import { first } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useReadingHistory } from "@/state/useReadingHistory";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";

const layoutCss = css`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

export default function Home() {
  const [readingHistory] = useReadingHistory();
  const mostRecentReadingHistoryEntry = first(readingHistory);
  const router = useRouter();

  useEffect(() => {
    if (mostRecentReadingHistoryEntry) {
      router.push(
        getRouteFromBookAndChapter(
          mostRecentReadingHistoryEntry.book,
          mostRecentReadingHistoryEntry.chapter
        )
      );
    }
  }, [mostRecentReadingHistoryEntry, router]);

  return (
    <>
      <Head>
        <title>Studium</title>
        <meta name="description" content="Bible study" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={layoutCss}>
        <Icon path={mdiBookOpenPageVariant} size={3} />
        <strong>Studium</strong>
        <a href={getRouteFromBookAndChapter("Genesis", "1")}>
          Start reading&nbsp;⏵
        </a>
      </main>
    </>
  );
}
