import { getBookAbbreviation } from "@/data/getBookAbbreviation";
import { CrossReference, Verse } from "@/types";
import { css } from "@emotion/react";
import { isEmpty } from "lodash";
import Link from "next/link";
import { FC, useCallback, useState } from "react";

const containerCss = css`
  position: relative;
`;

const anchorCss = css`
  position: absolute;
  top: -50vh;
`;

const crossReferencesContainerCss = css`
  margin-left: 5px;
  display: inline-flex;
  flex-wrap: wrap;

  & > *:not(:last-child)::after {
    content: ",";
    margin-right: 5px;
  }
`;

const crossReferenceCss = css`
  color: ;
`;

interface Props extends Verse {
  crossReferences: CrossReference[];
}

export const VerseDisplay: FC<Props> = ({ verse, text, crossReferences }) => {
  const hasCrossReferences = !isEmpty(crossReferences);
  const [areCrossReferencesOpen, setAreCrossReferencesOpen] = useState(false);

  const onToggleCrossReferences = useCallback(() => {
    setAreCrossReferencesOpen((open) => !open);
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
          <a role="button" onClick={onToggleCrossReferences}>
            Cross refs
          </a>
          {areCrossReferencesOpen && (
            <div css={crossReferencesContainerCss}>
              {crossReferences.map((crossReference) => (
                <small
                  key={crossReference.slug}
                  data-muted
                  css={crossReferenceCss}
                >
                  <Link href={crossReference.slug}>
                    {getBookAbbreviation(crossReference.book)}{" "}
                    {crossReference.chapter}:{crossReference.verse}
                  </Link>
                </small>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
