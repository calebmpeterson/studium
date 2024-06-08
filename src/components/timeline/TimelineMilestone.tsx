import { css } from "@emotion/react";
import { FC } from "react";

import { HistoricalMilestone } from "@/types/historical";
import { formatYear } from "@/utils/timeline/formatYear";

import { eventLabelCss } from "./styles";

type TimelineMilestoneProps = {
  event: HistoricalMilestone;
};

const containerCss = css`
  position: absolute;
  top: 20px;
  bottom: 0;
  font-size: 14px;
  border-left: 2px dotted var(--blue);
  margin-left: 1px;
`;

const getLabelPositionStyle = ({ labelPosition = "right" }) =>
  labelPosition === "left"
    ? {
        right: 0,
      }
    : {
        left: 0,
      };

export const TimelineMilestone: FC<TimelineMilestoneProps> = ({ event }) => (
  <div
    css={containerCss}
    style={{
      left: `${event.date + 4000}px`,
      borderColor: `var(--${event.color || "black"})`,
    }}
  >
    <div
      css={eventLabelCss}
      style={{
        color: `var(--${event.color || "black"})`,
        ...getLabelPositionStyle(event),
      }}
    >
      <div>
        <div>{event.title}</div>
        <small>{formatYear(event.date, event.approximate)}</small>
      </div>
    </div>
  </div>
);
