import { css } from "@emotion/react";
import {
  mdiBookOpenPageVariant,
  mdiChartTimeline,
  mdiClose,
  mdiShareVariantOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { FC, MouseEvent, PropsWithChildren, useCallback } from "react";

import { useShare } from "@/hooks/useShare";
import { breakpoints } from "@/styles/breakpoints";

interface Props extends PropsWithChildren {
  isResource?: true;
}

const layoutCss = css`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  padding: 10px 15px;
  position: sticky;
  z-index: 1001;
  top: 0;
  height: 50px;
  box-sizing: border-box;
  background-color: var(--bg);

  & > div {
    width: 100%;

    @media ${breakpoints["is-mobile"]} {
      width: auto;
    }
  }
`;

const titleLayoutCss = css`
  display: flex;
  align-items: center;
  gap: 5px;

  // No title on mobile
  @media ${breakpoints["is-mobile"]} {
    display: none;
  }
`;

const centerContainerCss = css`
  width: 100%;
  position: relative;
  display: flex;
  gap: 5px;
  justify-content: center;

  @media ${breakpoints["is-mobile"]} {
    flex: 1 0 auto;
    justify-content: start;
  }
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

export const TopNav: FC<Props> = ({ children, isResource }) => {
  const { canShare, share } = useShare();
  const onShare = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault();

      await share();
    },
    [share]
  );

  return (
    <nav css={layoutCss}>
      <div css={titleLayoutCss}>
        <Icon path={mdiBookOpenPageVariant} size={0.7} />
        <header css={titleCss}>Studium</header>
      </div>

      <div css={centerContainerCss}>{children}</div>

      <div css={rightContainerCss}>
        {canShare && (
          <button type="button" onClick={onShare}>
            <Icon path={mdiShareVariantOutline} size={0.7} />
          </button>
        )}

        {isResource ? (
          <Link role="button" aria-label="Close" href="/">
            <Icon path={mdiClose} size={0.7} />
          </Link>
        ) : (
          <Link
            role="button"
            aria-label="View Biblical timeline"
            href="/timeline"
          >
            <Icon path={mdiChartTimeline} size={0.7} />
          </Link>
        )}
      </div>
    </nav>
  );
};
