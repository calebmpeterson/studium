import { css } from "@emotion/react";
import { FC, PropsWithChildren } from "react";
import Icon from "@mdi/react";
import { mdiBookOpenPageVariant, mdiChartTimeline } from "@mdi/js";
import { breakpoints } from "@/styles/breakpoints";
import Link from "next/link";

interface Props extends PropsWithChildren {}

const layoutCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  padding: 10px;
  position: sticky;
  z-index: 1001;
  top: 0;
  height: 50px;
  box-sizing: border-box;
  background-color: var(--bg);

  & > div {
    width: 100%;
  }
`;

const titleLayoutCss = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const centerContainerCss = css`
  width: 100%;
  position: relative;
  display: flex;
  gap: 5px;
  justify-content: center;
`;

const rightContainerCss = css`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 5px;
`;

const titleCss = css`
  @media ${breakpoints["is-mobile"]} {
    display: none;
  }
`;

export const TopNav: FC<Props> = ({ children }) => (
  <nav css={layoutCss}>
    <div css={titleLayoutCss}>
      <Icon path={mdiBookOpenPageVariant} size={0.7} />
      <strong css={titleCss}>Studium</strong>
    </div>

    <div css={centerContainerCss}>{children}</div>

    <div css={rightContainerCss}>
      <Link role="button" aria-label="View Biblical timeline" href="/timeline">
        <Icon path={mdiChartTimeline} size={0.7} />
      </Link>
    </div>
  </nav>
);
