import { css } from "@emotion/react";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { motion } from "framer-motion";
import { FC, PropsWithChildren, ReactNode, useEffect } from "react";

import { breakpoints } from "@/styles/breakpoints";
import { fade } from "@/styles/motion";
import { shadows } from "@/styles/shadows";

interface Props extends PropsWithChildren<{}> {
  title: string | ReactNode;
  onClose: () => void;
  header?: ReactNode;
  hasInput?: boolean;
}

const overlayBackgroundCss = css`
  position: fixed;
  z-index: 1001;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--backdrop);
`;

const overlayContainerCss = (hasInput?: boolean) => css`
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
  border-radius: 10px 10px 0 0;
  background-color: var(--bg);
  max-height: 80vh;
  min-height: 40vh;

  box-shadow: ${shadows["shadow-xl"]};

  @media ${breakpoints["is-mobile"]} {
    min-height: ${hasInput ? "80vh" : "auto"};
  }
`;

const overlayBodyCss = css`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
  scrollbar-width: thin;
`;

const overlayHeaderCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const overlayTitleCss = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Overlay: FC<Props> = ({
  title,
  header,
  hasInput,
  children,
  onClose,
}) => {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  });

  return (
    <>
      <motion.div
        {...fade}
        css={overlayBackgroundCss}
        data-fade-in
        onClick={onClose}
      />
      <motion.div {...fade} css={overlayContainerCss(hasInput)}>
        <div css={overlayHeaderCss}>
          <header css={overlayTitleCss}>{title}</header>

          <button
            role="button"
            aria-label="Close cross references"
            data-icon
            data-borderless
            onClick={onClose}
          >
            <Icon path={mdiClose} size={0.7} />
          </button>
        </div>

        {header}

        <div css={overlayBodyCss}>{children}</div>
      </motion.div>
    </>
  );
};
