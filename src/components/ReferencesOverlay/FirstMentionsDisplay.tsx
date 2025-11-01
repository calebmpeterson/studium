import { css } from "@emotion/react";
import Link from "next/link";
import { FC, Fragment } from "react";

import { useFirstMentions } from "@/queries/useFirstMentions";
import { slugifyReference } from "@/utils/slugifyReference";

import { FirstMentionsLoader } from "./FirstMentionsLoader";

interface Props {
  text: string;
  onClose: () => void;
}

const layoutCss = css`
  display: grid;
  grid-template-columns: min-content 1fr;
  column-gap: 5px;
  row-gap: 10px;
`;

export const FirstMentionsDisplay: FC<Props> = ({ text, onClose }) => {
  const { firstMentions, isLoading } = useFirstMentions(text);

  return (
    <div css={layoutCss}>
      {isLoading && <FirstMentionsLoader />}
      {firstMentions.map(({ word, firstMention }, index) => (
        <Fragment key={`${word}-${index}`}>
          {firstMention ? (
            <>
              <strong>{word}</strong>
              <div>
                {firstMention.text ?? (
                  <em data-muted>Failed to look up first mention text.</em>
                )}
                <div>
                  <Link href={slugifyReference(firstMention)} onClick={onClose}>
                    {firstMention.book} {firstMention.chapter}:
                    {firstMention.verse}
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <em data-muted>{word}</em>
              <div />
            </>
          )}
        </Fragment>
      ))}
    </div>
  );
};
