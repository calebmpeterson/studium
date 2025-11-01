import Link from "next/link";
import { FC } from "react";

import { FirstMention } from "@/schemas/first-mention-index";
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

  return (
    <>
      <strong>{word}</strong>
      <div>
        {firstMention.text ?? (
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
