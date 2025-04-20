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
  width?: string;
  height?: string;
  wrap?: boolean;
  margin?: string;
}

export const flexboxCss = ({
  direction = "row",
  justify = "flex-start",
  align = "center",
  gap = "5px",
  width = "100%",
  height = "auto",
  wrap = true,
  margin = "0",
}: FlexboxCssProps = {}) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  gap: ${gap};
  width: ${width};
  height: ${height};
  flex-wrap: ${wrap ? "wrap" : "nowrap"};
  margin: ${margin};
`;
