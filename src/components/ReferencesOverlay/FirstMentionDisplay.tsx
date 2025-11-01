import { toLower, words } from "lodash";
import Link from "next/link";
import { FC } from "react";

import { FirstMention } from "@/schemas/first-mention-index";
import { interpose } from "@/utils/interpose";
import { slugifyReference } from "@/utils/slugifyReference";

interface Props {
  word: string;
  firstMention: FirstMention | undefined;
  onClose: () => void;
}

export const FirstMentionDisplay: FC<Props> = ({
  word,
  firstMention,
  onClose,
}) => {
  if (!firstMention) {
    return (
      <>
        <em data-muted>{word}</em>
        <div>{/* Empty div to fill parent grid */}</div>
      </>
    );
  }

  const wordsContent = firstMention.text
    ? interpose(
        words(firstMention.text).map((token, index) =>
          toLower(token) === toLower(word) ? (
            <strong
              key={index}
              data-is-highlighted
              style={{ padding: "0 3px", borderRadius: 4 }}
            >
              {token}
            </strong>
          ) : (
            <span key={index}>{token}</span>
          )
        ),
        <> </>
      )
    : null;

  return (
    <>
      <strong>{word}</strong>
      <div>
        {wordsContent ?? (
          <em data-muted>Failed to look up first mention text.</em>
        )}
        <div>
          <Link href={slugifyReference(firstMention)} onClick={onClose}>
            {firstMention.book} {firstMention.chapter}:{firstMention.verse}
          </Link>
        </div>
      </div>
    </>
  );
};
