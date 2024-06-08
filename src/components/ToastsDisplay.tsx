import { css } from "@emotion/react";
import { FC } from "react";

import { Toast } from "@/contexts/toasts";

import { ToastDisplay } from "./ToastDisplay";

interface Props {
  toasts: Toast[];
}

const toastsContainerCss = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1002;
`;

export const ToastsDisplay: FC<Props> = ({ toasts }) => {
  return (
    <div css={toastsContainerCss}>
      {toasts.map((toast) => (
        <ToastDisplay key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
