import { css } from "@emotion/react";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { motion } from "framer-motion";
import { FC, useCallback } from "react";

import { Toast, useDismissToast } from "@/contexts/toasts";
import { fade } from "@/styles/motion";
import { shadows } from "@/styles/shadows";

interface Props {
  toast: Toast;
}

const toastCss = css`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 90%;
  max-width: 400px;
  margin: 20px auto 0;
  padding: 10px 10px 10px 20px;

  background-color: var(--bg);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  box-shadow: ${shadows["shadow-lg"]};
`;

const messageCss = css`
  align-self: stretch;
  display: flex;
  align-items: center;
`;

export const ToastDisplay: FC<Props> = ({ toast }) => {
  const dismissToast = useDismissToast();
  const onClose = useCallback(() => {
    dismissToast(toast.id);
  }, [toast.id, dismissToast]);

  return (
    <motion.div css={toastCss} {...fade}>
      <div css={messageCss}>{toast.message}</div>
      <button
        role="button"
        aria-label="Close cross references"
        data-icon
        data-borderless
        onClick={onClose}
      >
        <Icon path={mdiClose} size={0.7} />
      </button>
    </motion.div>
  );
};
