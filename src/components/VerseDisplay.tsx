import { CrossReference, Verse } from "@/types";
import { css } from "@emotion/react";
import { isEmpty } from "lodash";
import { FC, MouseEvent, useCallback, useState } from "react";
import { CrossReferencesDisplay } from "./CrossReferencesDisplay";
import { useIsVerseHighlighted } from "@/state/useIsVerseHighlighted";
import { transition } from "@/styles/transition";
import { slugifyReference } from "@/utils/slugifyReference";
import { useShare } from "@/hooks/useShare";

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

      history.replaceState({}, "", `#${verse}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));

      (event.target as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },
    [verse]
  );

  const { canShare, share } = useShare({
    title: `${book} ${chapter}:${verse}`,
    url: slugifyReference({ book, chapter, verse }),
  });

  const onShare = useCallback(
    async (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();

      await share();
    },
    [share]
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
                crossReferences={crossReferences}
                onClose={onCloseCrossReferences}
              />
            )}
          </>
        )}
        {canShare && (
          <>
            <a css={linkCss} tabIndex={0} onClick={onShare}>
              Share
            </a>
          </>
        )}
      </span>
    </div>
  );
};
