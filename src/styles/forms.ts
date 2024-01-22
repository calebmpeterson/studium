import { css } from "@emotion/react";
import { transition } from "./transition";

export const formsCss = css`
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
    color: var(--fg-muted);
  }
`;
