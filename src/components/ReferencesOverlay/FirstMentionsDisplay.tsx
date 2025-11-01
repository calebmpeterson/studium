import { css } from "@emotion/react";
import { FC } from "react";

import { useFirstMentions } from "@/queries/useFirstMentions";

import { FirstMentionDisplay } from "./FirstMentionDisplay";
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
        <FirstMentionDisplay
          key={`${word}-${index}`}
          word={word}
          firstMention={firstMention}
          onClose={onClose}
        />
      ))}
    </div>
  );
};
