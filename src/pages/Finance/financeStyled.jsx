import styled from "styled-components";

export const FinancePage = styled.section`
  max-width: 1120px;
  margin: 0 auto;
`;

export const KpisGrid = styled.section`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FilterToolbar = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

export const FilterClearButton = styled.button`
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-pill);
  background: #fff;
  color: var(--text-main);
  font-weight: 700;
  padding: 8px 14px;
  cursor: pointer;

  &:hover {
    background: #f7f2fa;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(18 11 24 / 0.42);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 110;
`;

export const Modal = styled.div`
  width: min(100%, 560px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-soft);
  background: var(--surface-100);
  box-shadow: var(--shadow-card);
  padding: 18px;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 14px;
  font-family: var(--font-heading);
  color: var(--brand-900);
`;

export const Form = styled.form`
  display: grid;
  gap: 12px;
`;

export const Split = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: grid;
  gap: 6px;
  font-weight: 600;
  color: var(--text-main);
`;

export const Input = styled.input`
  border-radius: 12px;
  border: 1px solid var(--border-soft);
  background: #fff;
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: var(--brand-700);
    box-shadow: 0 0 0 3px rgb(114 65 138 / 0.16);
  }
`;

export const Select = styled.select`
  border-radius: 12px;
  border: 1px solid var(--border-soft);
  background: #fff;
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: var(--brand-700);
    box-shadow: 0 0 0 3px rgb(114 65 138 / 0.16);
  }
`;

export const Textarea = styled.textarea`
  border-radius: 12px;
  border: 1px solid var(--border-soft);
  background: #fff;
  padding: 10px 12px;
  outline: none;
  min-height: 90px;
  resize: vertical;

  &:focus {
    border-color: var(--brand-700);
    box-shadow: 0 0 0 3px rgb(114 65 138 / 0.16);
  }
`;

export const ErrorText = styled.p`
  margin: 0;
  color: #b03145;
  font-weight: 700;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  @media (max-width: 560px) {
    flex-direction: column-reverse;
  }
`;

export const Button = styled.button`
  border: 0;
  border-radius: var(--radius-pill);
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 560px) {
    width: 100%;
  }
`;

export const GhostButton = styled(Button)`
  background: #f4edf8;
  color: var(--text-main);
`;

export const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, var(--brand-800), var(--brand-700));
  color: #fff;
`;

export const PaginationWrap = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const PaginationInfo = styled.span`
  color: var(--text-soft);
  font-weight: 600;
  font-size: 0.9rem;
`;

export const PaginationActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const PaginationButton = styled.button`
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-pill);
  background: #fff;
  color: var(--text-main);
  font-weight: 700;
  padding: 8px 14px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #f7f2fa;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    flex: 1;
  }
`;
