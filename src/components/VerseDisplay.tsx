import { css } from "@emotion/react";
import { isEmpty } from "lodash";
import { FC, MouseEvent, useCallback, useState } from "react";

import { useIsVerseHighlighted } from "@/state/useIsVerseHighlighted";
import { transition } from "@/styles/transition";
import { CrossReference, Verse } from "@/types";
import { addToFragment } from "@/utils/addToFragment";
import { isVerseInRange } from "@/utils/isVerseInRange";
import { removeFromFragment } from "@/utils/removeFromFragment";

import { CrossReferencesDisplay } from "./CrossReferencesDisplay";

const containerCss = css`
  position: relative;
`;

const anchorCss = css`
  position: absolute;
  top: -50vh;
`;

const linkCss = css`
  color: var(--fg-muted);
  letter-spacing: initial;
  font-size: 66%;
  text-transform: uppercase;

  &:hover,
  &:focus {
    color: var(--active-fg);
  }

  padding-left: 5px;
`;

const verseCss = css`
  background-color: transparent;
  border-top-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);

  transition: ${transition("background-color")};

  &[data-is-highlighted="true"] {
    background-color: var(--active-bg);
  }
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

  const isHighlighted = useIsVerseHighlighted(verse);

  const onClickAnchor = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();

      const fragment = location.hash.replace("#", "");
      const verseAsNumber = parseInt(verse, 10);
      const updatedFragment = isVerseInRange(verseAsNumber, fragment)
        ? removeFromFragment(fragment, verseAsNumber)
        : addToFragment(fragment, verseAsNumber);

      history.replaceState({}, "", `#${updatedFragment}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));

      (event.target as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },
    [verse]
  );

  return (
    <div css={containerCss}>
      <div id={verse} css={anchorCss} />
      <span css={verseCss} data-is-highlighted={isHighlighted}>
        <sup>
          <a href={`#${verse}`} onClick={onClickAnchor}>
            {verse}
          </a>
        </sup>
        &nbsp;{text}
      </span>
      <span>
        &nbsp;
        {hasCrossReferences && (
          <>
            <a css={linkCss} tabIndex={0} onClick={onToggleCrossReferences}>
              Cross refs
            </a>
            {areCrossReferencesOpen && (
              <CrossReferencesDisplay
                book={book}
                chapter={chapter}
                verse={verse}
                text={text}
                crossReferences={crossReferences}
                onClose={onCloseCrossReferences}
              />
            )}
          </>
        )}
      </span>
    </div>
  );
};
