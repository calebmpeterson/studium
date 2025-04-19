import { css } from "@emotion/react";

export const marginCss = (margin: string) => css`
  margin: ${margin};
`;

interface FlexboxCssProps {
  direction?: "row" | "column";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  gap?: string;
}

export const flexboxCss = ({
  direction = "row",
  justify = "flex-start",
  align = "center",
  gap = "5px",
}: FlexboxCssProps = {}) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  gap: ${gap};
`;
