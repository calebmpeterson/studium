import { CrossReference } from "@/types";
import { css } from "@emotion/react";
import Link from "next/link";
import { FC, memo } from "react";
import { Overlay } from "./Overlay";

const crossReferenceCss = css``;

interface Props {
  book: string;
  chapter: string;
  verse: string;
  crossReferences: CrossReference[];
  onClose: () => void;
}

export const CrossReferencesDisplay: FC<Props> = memo(
  ({ book, chapter, verse, crossReferences, onClose }) => (
    <Overlay
      title={
        <div>
          <small data-muted>Cross References</small>
          <div>
            {book} {chapter}:{verse}
          </div>
        </div>
      }
      onClose={onClose}
    >
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
    </Overlay>
  )
);
