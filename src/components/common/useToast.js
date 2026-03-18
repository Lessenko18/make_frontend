import { createElement, useCallback, useMemo, useState } from "react";
import { Toast } from "./Toast";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((type, title, message, duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (title, message) => showToast("success", title, message),
    [showToast],
  );
  const error = useCallback(
    (title, message) => showToast("error", title, message),
    [showToast],
  );
  const info = useCallback(
    (title, message) => showToast("info", title, message),
    [showToast],
  );

  const ToastContainer = useCallback(
    () =>
      toasts.length
        ? createElement(
            "div",
            {
              style: {
                position: "fixed",
                top: 20,
                right: 20,
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                maxWidth: 400,
              },
            },
            ...toasts.map((toast) =>
              createElement(Toast, {
                key: toast.id,
                ...toast,
                onClose: removeToast,
              }),
            ),
          )
        : null,
    [removeToast, toasts],
  );

  return useMemo(
    () => ({
      toasts,
      removeToast,
      showToast,
      success,
      error,
      info,
      ToastContainer,
    }),
    [ToastContainer, error, info, removeToast, showToast, success, toasts],
  );
}
