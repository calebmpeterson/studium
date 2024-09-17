import { css } from "@emotion/react";
import { split } from "lodash";
import Link from "next/link";
import { FC, FocusEvent, useCallback, useRef, useState } from "react";

import { CURRENT_YEAR } from "@/data/typed/historical";
import { shadows } from "@/styles/shadows";
import { HistoricalEvent } from "@/types/historical";
import { formatYear } from "@/utils/timeline/formatYear";

import { CREATION_YEAR } from "./constants";
import { eventLabelCss } from "./styles";

type TimelineDurationProps = {
  item: HistoricalEvent;
};

const BORDER_WIDTH = 2;

const containerCss = (hasDetails: boolean) => css`
  position: absolute;
  height: 100%;
  font-size: 14px;
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  box-shadow: ${shadows["shadow"]};
  border-radius: 2px;
  background-color: var(--bg);

  cursor: ${hasDetails ? "help" : "inherit"};
`;

const subTitleCss = css`
  color: var(--fg-muted);
`;

const detailsContainerCss = css`
  position: absolute;
  cursor: auto;
  bottom: calc(100% + 5px);
  display: block;
  opacity: 1;
  transition: opacity 300ms ease-in-out;
  overflow: visible;
  min-width: 300px;
  max-width: 400px;
  padding: 10px;
  background-color: var(--tooltip-bg);
  box-shadow: ${shadows["shadow"]};
  border-radius: 2px;

  & > p:last-child {
    margin-bottom: 0;
  }
`;

export const TimelineDuration: FC<TimelineDurationProps> = ({ item }) => {
  const hasDetails = Boolean(item.details || item.link);
  const containerRef = useRef<HTMLDivElement>(null);
  const [areDetailsOpen, setDetailsOpen] = useState(false);

  const onToggleDetails = useCallback(() => {
    setDetailsOpen(true);
  }, []);

  const onBlur = useCallback((event: FocusEvent) => {
    if (!containerRef.current?.contains(event.relatedTarget)) {
      setDetailsOpen(false);
    }
  }, []);

  const containerProps = hasDetails
    ? {
        role: "button",
        tabIndex: 0,
        onClick: onToggleDetails,
        onBlur,
      }
    : {};

  return (
    <div
      ref={containerRef}
      css={containerCss(hasDetails)}
      style={{
        left: `${item.date_started + CREATION_YEAR}px`,
        minWidth: `${item.date_completed - item.date_started - BORDER_WIDTH}px`,
        borderColor: item.color?.startsWith("#")
          ? item.color
          : `var(--${item.color || "light"})`,
      }}
      {...containerProps}
    >
      <div css={eventLabelCss}>
        <div>{item.title}</div>
        {item.subTitle && <small css={subTitleCss}>{item.subTitle}</small>}
        <small>
          {formatYear(item.date_started, item.approximate)}
          {item.date_started !== item.date_completed && (
            <>
              &nbsp;-&nbsp;
              {item.date_completed === CURRENT_YEAR ? (
                <em>CURRENT DAY</em>
              ) : (
                formatYear(item.date_completed)
              )}
            </>
          )}
        </small>
      </div>

      {hasDetails && areDetailsOpen && (
        <div css={detailsContainerCss}>
          {split(item.details, "\n").map((detail, index) => (
            <p key={index}>{detail}</p>
          ))}
          {item.link && (
            <div>
              <Link
                href={item.link}
                target={item.link.startsWith("/") ? undefined : "_blank"}
              >
                Learn more
              </Link>
              &nbsp;&raquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
};
