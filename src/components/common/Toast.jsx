import { useEffect } from "react";
import styled from "styled-components";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

const ToastBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  background: ${({ $type }) => {
    switch ($type) {
      case "success":
        return "#ecfdf5";
      case "error":
        return "#fef2f2";
      case "info":
        return "#f0f9ff";
      default:
        return "#f9fafb";
    }
  }};
  border: 1px solid
    ${({ $type }) => {
      switch ($type) {
        case "success":
          return "#d1fae5";
        case "error":
          return "#fee2e2";
        case "info":
          return "#e0f2fe";
        default:
          return "#e5e7eb";
      }
    }};
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ToastContent = styled.div`
  flex: 1;
`;

const ToastTitle = styled.p`
  margin: 0;
  font-weight: 700;
  color: ${({ $type }) => {
    switch ($type) {
      case "success":
        return "#065f46";
      case "error":
        return "#7f1d1d";
      case "info":
        return "#0c4a6e";
      default:
        return "#1f2937";
    }
  }};
  font-size: 0.95rem;
`;

const ToastMessage = styled.p`
  margin: 4px 0 0;
  color: ${({ $type }) => {
    switch ($type) {
      case "success":
        return "#047857";
      case "error":
        return "#b91c1c";
      case "info":
        return "#0369a1";
      default:
        return "#4b5563";
    }
  }};
  font-size: 0.88rem;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const getIcon = (type) => {
  switch (type) {
    case "success":
      return <CheckCircle size={20} color="#10b981" />;
    case "error":
      return <AlertCircle size={20} color="#ef4444" />;
    case "info":
      return <Info size={20} color="#3b82f6" />;
    default:
      return null;
  }
};

export function Toast({
  id,
  type = "info",
  title,
  message,
  duration = 4000,
  onClose,
}) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [duration, id, onClose]);

  return (
    <ToastBox $type={type}>
      {getIcon(type)}
      <ToastContent>
        {title ? <ToastTitle $type={type}>{title}</ToastTitle> : null}
        {message ? <ToastMessage $type={type}>{message}</ToastMessage> : null}
      </ToastContent>
      <CloseButton type="button" onClick={() => onClose(id)}>
        <X size={18} />
      </CloseButton>
    </ToastBox>
  );
}
