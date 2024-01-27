import { shadows } from "@/styles/shadows";
import { css } from "@emotion/react";
import { FC, PropsWithChildren, useRef } from "react";
import useClickOutside from "use-click-outside";

interface Props extends PropsWithChildren {
  onClickOutside: () => void;
  className?: string;
}

const containerCss = css`
  position: absolute;
  top: calc(100% + 5px);
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--bg);
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  box-shadow: ${shadows["shadow-xl"]};
`;

export const FloatingBox: FC<Props> = ({
  children,
  className,
  onClickOutside,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside, "mousedown");

  return (
    <div ref={ref} css={containerCss} className={className}>
      {children}
    </div>
  );
};
