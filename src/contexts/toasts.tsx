import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { v4 as uuid4 } from "uuid";

import { ToastsDisplay } from "@/components/ToastsDisplay";

export type ToastType = "info";

export interface Toast {
  id?: string;
  message: string;
  type?: ToastType;
}

interface ToastContextProps {
  showToast(toast: Toast): void;
  dismissToast(id: string | undefined): void;
}

const ToastContext = createContext<ToastContextProps>({
  showToast() {
    throw new Error(`Must be used within a ToastProvider`);
  },
  dismissToast() {
    throw new Error(`Must be used within a ToastProvider`);
  },
});

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Toast) => {
    setToasts((current) => [...current, { id: uuid4(), ...toast }]);
  }, []);

  const dismissToast = useCallback((id: string | undefined) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const contextValue = useMemo(
    () => ({ showToast, dismissToast }),
    [dismissToast, showToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      <ToastsDisplay toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

export const useShowToast = () => useContext(ToastContext).showToast;
export const useDismissToast = () => useContext(ToastContext).dismissToast;
