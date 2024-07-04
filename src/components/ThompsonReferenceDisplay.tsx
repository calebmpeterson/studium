import { css } from "@emotion/react";
import Link from "next/link";
import { FC } from "react";

import { Reference } from "@/types/chain-reference";
import { getRouteFromBookAndChapter } from "@/utils/getRouteFromBookAndChapter";

interface Props {
  reference: Reference;
}

const chainLayoutCss = css`
  display: flex;
  align-items: baseline;
  gap: 5px;
`;

export const ThompsonReferenceDisplay: FC<Props> = ({ reference }) => {
  if (reference.type === "verse") {
    return (
      <div>
        <Link
          href={getRouteFromBookAndChapter(
            reference.book,
            reference.chapter,
            reference.verse
          )}
        >
          {reference.book} {reference.chapter}:{reference.verse}
        </Link>
      </div>
    );
  }

  return (
    <div css={chainLayoutCss}>
      <span data-muted data-text-upper>
        See
      </span>
      {reference.entries.map((entry, id) => (
        <div key={id}>
          <Link href={`/thompson-chain-reference/${entry.id}`}>
            {entry.label} {entry.id}
          </Link>
        </div>
      ))}
    </div>
  );
};
