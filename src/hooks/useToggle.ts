import { useCallback, useState } from "react";

export const useToggle = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((b) => !b);
  }, []);

  const change = useCallback((isOpen: boolean) => {
    setIsOpen(isOpen);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
    change,
  };
};
