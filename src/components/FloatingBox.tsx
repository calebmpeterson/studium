import { css } from "@emotion/react";
import { FC, PropsWithChildren, useRef } from "react";
import useClickOutside from "use-click-outside";

import { breakpoints } from "@/styles/breakpoints";
import { shadows } from "@/styles/shadows";

interface Props extends PropsWithChildren {
  onClickOutside: () => void;
  className?: string;
  shouldMaximizeOnMobile?: boolean;
}

const maximizedOnMobileCss = css`
  @media ${breakpoints["is-mobile"]} {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    max-height: unset;
    box-shadow: none;
    border: none;
    border-radius: 0;
  }
`;

const containerCss = (shouldMaximizeOnMobile: boolean) => css`
  position: absolute;
  z-index: 1005;
  top: calc(100% + 5px);
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  background-color: var(--bg);
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  box-shadow: ${shadows["shadow-xl"]};

  ${shouldMaximizeOnMobile && maximizedOnMobileCss}
`;

export const FloatingBox: FC<Props> = ({
  children,
  className,
  onClickOutside,
  shouldMaximizeOnMobile = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside, "pointerdown");

  return (
    <div
      ref={ref}
      css={containerCss(shouldMaximizeOnMobile)}
      className={className}
    >
      {children}
    </div>
  );
};
