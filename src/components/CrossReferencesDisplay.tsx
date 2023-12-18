import { shadows } from "@/styles/shadows";
import { CrossReference, Verse } from "@/types";
import { css } from "@emotion/react";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { FC } from "react";

const crossReferencesBackgroundCss = css`
  position: fixed;
  z-index: 1001;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--backdrop);
`;

const crossReferencesContainerCss = css`
  position: fixed;
  z-index: 1002;
  bottom: 0px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  max-width: 800px;
  padding: 20px 20px 0;
  border-radius: 5px 5px 0 0;
  background-color: var(--bg);
  max-height: 80vh;

  box-shadow: ${shadows["shadow-xl"]};
`;

const crossReferencesBodyCss = css`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
`;

const crossReferencesHeaderCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const crossReferenceCss = css`
  color: ;
`;

interface Props {
  book: string;
  chapter: string;
  verse: string;
  crossReferences: CrossReference[];
  onClose: () => void;
}

export const CrossReferencesDisplay: FC<Props> = ({
  book,
  chapter,
  verse,
  crossReferences,
  onClose,
}) => (
  <>
    <div css={crossReferencesBackgroundCss} />
    <div css={crossReferencesContainerCss}>
      <div css={crossReferencesHeaderCss}>
        <strong data-muted>
          <small>
            {book} {chapter}:{verse} Cross References
          </small>
        </strong>

        <button
          role="button"
          aria-label="Close cross references"
          data-icon
          onClick={onClose}
        >
          <Icon path={mdiClose} size={0.7} />
        </button>
      </div>

      <div css={crossReferencesBodyCss}>
        {crossReferences.map((crossReference) => (
          <div key={crossReference.slug}>
            {crossReference.text ?? (
              <em data-muted>Failed to look up cross reference text.</em>
            )}
            <div>
              <small data-muted css={crossReferenceCss}>
                <Link href={crossReference.slug}>
                  {crossReference.book} {crossReference.chapter}:
                  {crossReference.verse}
                </Link>
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);
