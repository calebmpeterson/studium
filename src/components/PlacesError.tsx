import { DANGER_COLOR } from "@/styles/colors";
import { css } from "@emotion/react";
import { mdiAlert, mdiAlertOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { FC } from "react";

interface Props {
  book: string;
  chapter: string;
}

const layoutCss = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: ${DANGER_COLOR[300]};
`;

export const PlacesError: FC<Props> = ({ book, chapter }) => (
  <div css={layoutCss}>
    <Icon path={mdiAlert} size={0.7} />
    Unable to fetch places for {book} {chapter}.
  </div>
);
