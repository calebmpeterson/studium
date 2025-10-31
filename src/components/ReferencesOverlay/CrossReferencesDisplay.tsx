import { css } from "@emotion/react";
import Link from "next/link";
import { FC } from "react";

import { CrossReference } from "@/types";

interface Props {
  crossReferences: CrossReference[];
  onClose: () => void;
}

const layoutCss = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
`;

export const CrossReferencesDisplay: FC<Props> = ({
  crossReferences,
  onClose,
}) => (
  <div css={layoutCss}>
    {crossReferences.map((crossReference) => (
      <div key={crossReference.slug}>
        <div>
          <Link href={crossReference.slug} onClick={onClose}>
            {crossReference.book} {crossReference.chapter}:
            {crossReference.verse}
          </Link>
        </div>

        {crossReference.text ?? (
          <em data-muted>Failed to look up cross reference text.</em>
        )}
      </div>
    ))}
  </div>
);
