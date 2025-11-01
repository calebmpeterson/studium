import { FC, memo, useState } from "react";

import { flexboxCss } from "@/styles/layout";
import { CrossReference } from "@/types";

import { Overlay } from "../Overlay";
import { CrossReferencesDisplay } from "./CrossReferencesDisplay";
import { FirstMentionsDisplay } from "./FirstMentionsDisplay";
import { ReferenceTabId } from "./types";

interface Props {
  book: string;
  chapter: string;
  verse: string;
  text: string;
  crossReferences: CrossReference[];
  onClose: () => void;
}

export const ReferencesOverlay: FC<Props> = memo(
  ({ book, chapter, verse, text, crossReferences, onClose }) => {
    const [activeTab, setActiveTab] =
      useState<ReferenceTabId>("first-mentions");

    const onShowCrossReferences = () => {
      setActiveTab("cross-references");
    };

    const onShowFirstMentions = () => {
      setActiveTab("first-mentions");
    };

    const overlayHeaderContent = (
      <div css={flexboxCss({ direction: "column", gap: "10px" })}>
        <div data-muted>{text}</div>
        <div css={flexboxCss({ gap: "10px" })}>
          <button
            data-is-active={activeTab === "first-mentions"}
            onClick={onShowFirstMentions}
          >
            First Mentions
          </button>
          <button
            data-is-active={activeTab === "cross-references"}
            onClick={onShowCrossReferences}
          >
            Cross References
          </button>
        </div>
      </div>
    );

    return (
      <Overlay
        title={
          <div>
            <small data-muted>References</small>
            <div>
              {book} {chapter}:{verse}
            </div>
          </div>
        }
        header={overlayHeaderContent}
        onClose={onClose}
      >
        {activeTab === "cross-references" && (
          <CrossReferencesDisplay
            crossReferences={crossReferences}
            onClose={onClose}
          />
        )}

        {activeTab === "first-mentions" && (
          <FirstMentionsDisplay text={text} onClose={onClose} />
        )}
      </Overlay>
    );
  }
);
