import { css } from "@emotion/react";

import { transition } from "./transition";
import { BODY_FONT_FAMILY } from "./typography";

export const formsCss = css`
  form {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  input {
    font-family: ${BODY_FONT_FAMILY};
    font-size: 16px;
    caret-color: var(--active-fg);
  }

  input[type="text"] {
    padding: 5px 10px;
    height: var(--input-size);
    box-sizing: border-box;
    border-radius: var(--border-radius);
    border: 1px solid var(--button-border);
    background-color: var(--bg);

    transition: ${transition("border-color")};

    &:focus {
      outline: none;
      border-color: var(--active-fg);
    }

    color: var(--fg);
  }

  input::placeholder {
    font-family: ${BODY_FONT_FAMILY};
    color: var(--fg-muted);
  }

  input[type="radio"],
  input[type="checkbox"] {
    accent-color: var(--active-fg);
  }
`;
