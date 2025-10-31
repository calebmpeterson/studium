import { FC, memo } from "react";

import { CrossReference } from "@/types";

import { Overlay } from "../Overlay";
import { CrossReferencesDisplay } from "./CrossReferencesDisplay";

interface Props {
  book: string;
  chapter: string;
  verse: string;
  text: string;
  crossReferences: CrossReference[];
  onClose: () => void;
}

export const ReferencesOverlay: FC<Props> = memo(
  ({ book, chapter, verse, text, crossReferences, onClose }) => (
    <Overlay
      title={
        <div>
          <small data-muted>References</small>
          <div>
            {book} {chapter}:{verse}
          </div>
        </div>
      }
      header={<div data-muted>{text}</div>}
      onClose={onClose}
    >
      <CrossReferencesDisplay
        crossReferences={crossReferences}
        onClose={onClose}
      />
    </Overlay>
  )
);
