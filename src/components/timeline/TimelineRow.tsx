import { HistoricalEvent } from "@/types/historical";
import { FC } from "react";
import { TimelineDuration } from "./TimelineDuration";
import { css } from "@emotion/react";

type TimelineRowProps = {
  items: HistoricalEvent[];
};

const layoutCss = css`
  height: 24px;
  width: 100%;
  position: relative;
  margin: 5px;
  z-index: 1;
`;

export const TimelineRow: FC<TimelineRowProps> = ({ items }) => (
  <div css={layoutCss}>
    {items.map((item, index) => (
      <TimelineDuration key={index} item={item} />
    ))}
  </div>
);
