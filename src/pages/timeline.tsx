import { css } from "@emotion/react";
import { range } from "lodash";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import { CREATION_YEAR, TOTAL_YEARS } from "@/components/timeline/constants";
import { TimelineMilestone } from "@/components/timeline/TimelineMilestone";
import { TimelineRow } from "@/components/timeline/TimelineRow";
import { TimelineSection } from "@/components/timeline/TimelineSection";
import { TopNav } from "@/components/TopNav";
import { processGenealogy } from "@/data/processGenealogy";
import { GENEALOGIES } from "@/data/typed/genealogies";
import {
  BOOKS,
  CHURCH_AGES,
  DISPENSATIONS,
  EVENTS,
  MILESTONES,
} from "@/data/typed/historical";
import { HistoricalEvent, HistoricalMilestone } from "@/types/historical";
import { layout } from "@/utils/intervalScheduling";
import { formatYear } from "@/utils/timeline/formatYear";

type PageData = {
  bookRows: HistoricalEvent[][];
  milestones: HistoricalMilestone[];
  dispensations: HistoricalMilestone[];
  eventRows: HistoricalEvent[][];
  churchAgeRows: HistoricalEvent[][];
  patriarchRows: HistoricalEvent[][];
};

export const getStaticProps: GetStaticProps<PageData> = async () => {
  const bookRows = layout(BOOKS);
  const eventRows = layout(EVENTS);
  const churchAgeRows = CHURCH_AGES.map((event) => [event]);
  const patriarchRows = processGenealogy(GENEALOGIES, -4000).map((event) => [
    event,
  ]);

  return {
    props: {
      bookRows,
      milestones: MILESTONES,
      dispensations: DISPENSATIONS,
      eventRows,
      churchAgeRows,
      patriarchRows,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const scrollingCss = css`
  width: 100%;
  overflow-x: auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const containerCss = css`
  width: 100%;
  min-width: ${TOTAL_YEARS}px;
  min-height: 200px;
  padding: 40px 0;
  position: relative;
`;

const timelineGridLineCss = css`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
`;

const millenniumGridLineCss = css`
  ${timelineGridLineCss};
  border-left: 2px solid #888;
`;

const centuryGridLineCss = css`
  ${timelineGridLineCss};

  border-left: 1px dashed #bbb;
`;

const timelineGridLabelCss = css`
  white-space: nowrap;
  margin-left: 3px;
`;

export default function Timeline(props: Props) {
  return (
    <>
      <Head>
        <title>Timeline</title>
      </Head>

      <TopNav />

      <div css={scrollingCss}>
        <div css={containerCss}>
          <TimelineRow items={[]} />
          <TimelineRow items={[]} />

          {/* Books of the Bible and when they were written */}
          <TimelineSection title="Books" />
          {props.bookRows.map((booksInRow, index) => (
            <TimelineRow key={`books-${index}`} items={booksInRow} />
          ))}

          {/* Ante-deluvian Patriarchs */}
          <TimelineSection title="Patriarchs" />
          {props.patriarchRows.map((eventsInRow, index) => (
            <TimelineRow key={`patriarch-${index}`} items={eventsInRow} />
          ))}

          {/* World events */}
          <TimelineSection title="Significant Historical Events" />
          {props.eventRows.map((eventsInRow, index) => (
            <TimelineRow key={`event-${index}`} items={eventsInRow} />
          ))}

          {/* Church ages */}
          <TimelineSection title="Churches" />
          {props.churchAgeRows.map((eventsInRow, index) => (
            <TimelineRow key={`church-age-${index}`} items={eventsInRow} />
          ))}

          {/* Millennia */}
          {range(0, TOTAL_YEARS + 1)
            .filter((year) => year % 1000 === 0)
            .map((year) => (
              <div
                key={`millennium-${year}`}
                css={
                  year === 0 || year === CREATION_YEAR
                    ? timelineGridLineCss
                    : millenniumGridLineCss
                }
                style={{ left: year }}
              >
                <div css={timelineGridLabelCss}>
                  {formatYear(year - CREATION_YEAR)}
                </div>
              </div>
            ))}

          {/* Centuries */}
          {range(0, TOTAL_YEARS)
            .filter((year) => year % 100 === 0 && year % 1000 !== 0)
            .map((year) => (
              <div
                key={`century-${year}`}
                css={centuryGridLineCss}
                style={{ left: year }}
              >
                <div css={timelineGridLabelCss}>
                  <small>{formatYear(year - CREATION_YEAR)}</small>
                </div>
              </div>
            ))}

          {props.dispensations.map((event, index) => (
            <TimelineMilestone
              key={`dispensation-${index}`}
              event={event}
              offset={20}
            />
          ))}

          {props.milestones.map((event, index) => (
            <TimelineMilestone key={`milestone-${index}`} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
