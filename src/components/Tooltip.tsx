import { css } from "@emotion/react";
import { FC } from "react";

import { shadows } from "@/styles/shadows";
import { transition } from "@/styles/transition";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  children: React.ReactNode;
  placement?: TooltipPlacement;
}

const getPlacementStyles = (placement: TooltipPlacement) => {
  switch (placement) {
    case "top":
      return css`
        top: auto;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 0;
        margin-bottom: 5px;
      `;
    case "bottom":
      return css`
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 5px;
      `;
    case "left":
      return css`
        top: 50%;
        right: 100%;
        left: auto;
        transform: translateY(-50%);
        margin-top: 0;
        margin-right: 5px;
      `;
    case "right":
      return css`
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        margin-top: 0;
        margin-left: 5px;
      `;
    default:
      return css`
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 5px;
      `;
  }
};

const tooltipCss = (placement: TooltipPlacement = "bottom") => css`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  pointer-events: none;
  background-color: var(--tooltip-bg);
  color: var(--tooltip-fg);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: ${transition("opacity", "visibility")};
  box-shadow: ${shadows["shadow-lg"]};
  ${getPlacementStyles(placement)}
`;

export const Tooltip: FC<TooltipProps> = ({
  children,
  placement = "bottom",
}) => (
  <div data-tooltip-content css={tooltipCss(placement)}>
    {children}
  </div>
);
