import styled from "styled-components";

const rose900 = "#8b2252";
const rose700 = "#c0556e";
const rose100 = "#fde8ed";
const roseBorder = "#f5cfd7";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 0.38);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
`;

export const Modal = styled.div`
  background: #fff;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 60px rgb(0 0 0 / 0.18);
  padding: 28px 28px 24px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.45rem;
  color: ${rose900};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-weight: 700;
  font-size: 0.88rem;
  color: var(--text-main);
`;

export const Input = styled.input`
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-sm);
  padding: 10px 13px;
  font-family: var(--font-body);
  font-size: 0.97rem;
  color: var(--text-main);
  outline: none;

  &:focus {
    border-color: ${rose700};
    box-shadow: 0 0 0 3px rgb(192 85 110 / 0.14);
  }
`;

export const Textarea = styled.textarea`
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-sm);
  padding: 10px 13px;
  font-family: var(--font-body);
  font-size: 0.97rem;
  color: var(--text-main);
  outline: none;
  resize: vertical;
  min-height: 80px;

  &:focus {
    border-color: ${rose700};
    box-shadow: 0 0 0 3px rgb(192 85 110 / 0.14);
  }
`;

export const ErrorMsg = styled.p`
  margin: 0;
  color: var(--danger-700);
  font-size: 0.87rem;
  font-weight: 600;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const CancelButton = styled.button`
  border: 1.5px solid ${roseBorder};
  border-radius: var(--radius-pill);
  background: transparent;
  color: ${rose900};
  padding: 10px 20px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${rose100};
  }
`;

export const SubmitButton = styled.button`
  border: 0;
  border-radius: var(--radius-pill);
  background: linear-gradient(135deg, ${rose900}, ${rose700});
  color: #fff;
  padding: 10px 22px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgb(192 85 110 / 0.28);

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.88;
  }
`;
