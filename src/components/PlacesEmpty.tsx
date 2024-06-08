import { css } from "@emotion/react";
import { mdiAlert, mdiAlertOutline, mdiMapMarkerRadiusOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { FC, useEffect, useState } from "react";

import { BASE_COLOR, DANGER_COLOR } from "@/styles/colors";

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
  flex-direction: column;
  gap: 5px;
  color: ${BASE_COLOR[400]};
`;

export const PlacesEmpty: FC<Props> = ({ book, chapter }) => (
  <div css={layoutCss}>
    <Icon path={mdiMapMarkerRadiusOutline} size={3} />
    <em>
      No places identified in {book} {chapter}.
    </em>
  </div>
);
