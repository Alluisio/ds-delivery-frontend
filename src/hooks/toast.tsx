/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useContext, useRef, useMemo } from "react";
import { Toast as PrimeToast, ToastMessageType } from "primereact/toast";

interface ToastContextData {
  showToast(message: ToastMessage): void;
  showToasts(messages: ToastMessage[]): void;
}

export interface ToastMessage {
  type: "success" | "error" | "info" | "warn";
  title: string;
  description?: string;
  duration?: number;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useRef<PrimeToast>(null);

  const showToast = useCallback(({ type, title, description, duration = 5000 }: Omit<ToastMessage, "id">) => {
    toast.current?.show({
      severity: type,
      summary: title,
      detail: description,
      life: duration,
    });
  }, []);

  const showToasts = useCallback((toasts: ToastMessage[]) => {
    const toastsParsed = toasts.map((toastItem) => {
      const parsedToast: ToastMessageType = {
        severity: toastItem.type,
        summary: toastItem.title,
        detail: toastItem.description,
        life: toastItem.duration || 5000,
      };
      return parsedToast;
    });
    toast.current?.show(toastsParsed);
  }, []);

  const toastProviderMemo = useMemo(() => {
    return { showToast, showToasts };
  }, [showToast, showToasts]);

  return (
    <ToastContext.Provider value={toastProviderMemo}>
      <PrimeToast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

export { ToastProvider, useToast };
