import { css } from "@emotion/react";
import { mdiCancel, mdiContentCopy, mdiShareVariant } from "@mdi/js";
import Icon from "@mdi/react";
import { FC, MouseEvent, useCallback } from "react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useShare } from "@/hooks/useShare";
import { useVersesToShare } from "@/hooks/useVersesToShare";
import { flexboxCss } from "@/styles/layout";
import { Verse } from "@/types";

import { Overlay } from "./Overlay";

interface Props {
  book: string;
  chapter: string;
  verses: Verse[];
  onClose: () => void;
}

const versesCss = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 800px;
  box-sizing: border-box;
  gap: 10px;
`;

export const ShareController: FC<Props> = ({
  book,
  chapter,
  verses,
  onClose,
}) => {
  const { canShare, share } = useShare({
    title: `${book} ${chapter}`,
    url: location.href,
  });

  const onShare = useCallback(
    async (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();

      await share();
    },
    [share]
  );

  const { versesToShare, fragment } = useVersesToShare(verses);
  const { copy, didCopy } = useCopyToClipboard();

  const onCopy = useCallback(async () => {
    const textToCopy =
      versesToShare.map((verse) => `${verse.verse} ${verse.text}`).join("\n") +
      `\n\n${book} ${chapter}:${fragment}` +
      `\n\n${location.href}`;

    await copy(textToCopy);
  }, [book, chapter, copy, fragment, versesToShare]);

  const onClear = useCallback(() => {
    history.replaceState({}, "", "#");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);

  const header = (
    <>
      {book} {chapter}:{fragment}
    </>
  );

  return (
    <Overlay title={header} onClose={onClose} isModal={false}>
      <div css={flexboxCss({ justify: "space-between" })}>
        <div css={flexboxCss()}>
          <button disabled={!canShare} onClick={onShare}>
            <Icon path={mdiShareVariant} size={0.7} />
            &nbsp;Share
          </button>
          <button onClick={onCopy}>
            <Icon path={mdiContentCopy} size={0.7} />
            &nbsp;{didCopy ? "Copied" : "Copy"}
          </button>
        </div>

        <button onClick={onClear}>
          <Icon path={mdiCancel} size={0.7} />
          &nbsp;Clear selection
        </button>
      </div>
    </Overlay>
  );
};
