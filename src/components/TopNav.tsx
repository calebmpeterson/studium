import { css } from "@emotion/react";
import {
  mdiBookOpenPageVariant,
  mdiClose,
  mdiMenu,
  mdiShareVariantOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { FC, MouseEvent, PropsWithChildren, useCallback, useState } from "react";

import { RESOURCE_LINKS } from "@/data/resourceLinks";
import { useShare } from "@/hooks/useShare";
import { breakpoints } from "@/styles/breakpoints";

import { FloatingBox } from "./FloatingBox";
import { Tooltip } from "./Tooltip";

type WasShareHandled = boolean;

interface Props extends PropsWithChildren {
  isResource?: true;
  onShare?: () => WasShareHandled;
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

const resourcesMenuCss = css`
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 200px;
`;

export const TopNav: FC<Props> = ({ children, isResource, onShare }) => {
  const { canShare, share } = useShare();
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
  const onDefaultShare = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault();

      const wasShareHandled = onShare ? onShare() : false;

      if (!wasShareHandled) {
        await share();
      }
    },
    [share, onShare]
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
          <button type="button" onClick={onDefaultShare}>
            <Icon path={mdiShareVariantOutline} size={0.7} />
            <Tooltip placement="left">Share</Tooltip>
          </button>
        )}

        {isResource ? (
          <Link role="button" aria-label="Close" href="/">
            <Icon path={mdiClose} size={0.7} />
            <Tooltip placement="left">Close</Tooltip>
          </Link>
        ) : (
          <>
            <button
              type="button"
              aria-label="Resources"
              onClick={() => setIsResourcesMenuOpen((o) => !o)}
              data-icon
            >
              <Icon path={mdiMenu} size={0.7} />
              <Tooltip placement="left">Resources</Tooltip>
            </button>

            {isResourcesMenuOpen && (
              <FloatingBox
                css={resourcesMenuCss}
                onClickOutside={() => setIsResourcesMenuOpen(false)}
              >
                {RESOURCE_LINKS.map(({ label, href, shallow }) => (
                  <Link
                    key={href}
                    href={href}
                    {...(shallow ? { shallow: true } : {})}
                  >
                    {label}
                  </Link>
                ))}
              </FloatingBox>
            )}
          </>
        )}
      </div>
    </nav>
  );
};
