import { CrossReference, Verse } from "@/types";
import { css } from "@emotion/react";
import { isEmpty } from "lodash";
import { FC, useCallback, useState } from "react";
import { CrossReferencesDisplay } from "./CrossReferencesDisplay";

const containerCss = css`
  position: relative;
`;

const anchorCss = css`
  position: absolute;
  top: -50vh;
`;

interface Props extends Verse {
  crossReferences: CrossReference[];
}

export const VerseDisplay: FC<Props> = ({
  book,
  chapter,
  verse,
  text,
  crossReferences,
}) => {
  const hasCrossReferences = !isEmpty(crossReferences);
  const [areCrossReferencesOpen, setAreCrossReferencesOpen] = useState(false);

  const onToggleCrossReferences = useCallback(() => {
    setAreCrossReferencesOpen((open) => !open);
  }, []);

  const onCloseCrossReferences = useCallback(() => {
    setAreCrossReferencesOpen(false);
  }, []);

  return (
    <div css={containerCss}>
      <div id={verse} css={anchorCss} />
      <sup>
        <a href={`#${verse}`}>{verse}</a>
      </sup>
      &nbsp;
      {text}
      {hasCrossReferences && (
        <>
          &nbsp;
          <a role="button" tabIndex={0} onClick={onToggleCrossReferences}>
            Cross refs
          </a>
          {areCrossReferencesOpen && (
            <CrossReferencesDisplay
              book={book}
              chapter={chapter}
              verse={verse}
              crossReferences={crossReferences}
              onClose={onCloseCrossReferences}
            />
          )}
        </>
      )}
    </div>
  );
};
