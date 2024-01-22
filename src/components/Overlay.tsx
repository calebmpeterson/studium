import { css } from "@emotion/react";
import { FC, PropsWithChildren, ReactNode } from "react";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { shadows } from "@/styles/shadows";

interface Props extends PropsWithChildren<{}> {
  title: string | ReactNode;
  onClose: () => void;
  header?: ReactNode;
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

const overlayContainerCss = css`
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

  box-shadow: ${shadows["shadow-xl"]};
`;

const overlayBodyCss = css`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
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

export const Overlay: FC<Props> = ({ title, header, children, onClose }) => (
  <>
    <div css={overlayBackgroundCss} />
    <div css={overlayContainerCss}>
      <div css={overlayHeaderCss}>
        <div data-muted css={overlayTitleCss}>
          {title}
        </div>

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
    </div>
  </>
);
