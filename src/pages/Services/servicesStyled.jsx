import styled from "styled-components";

export const ServicesPage = styled.section`
  max-width: 1120px;
  margin: 0 auto;
`;

export const Card = styled.section`
  margin-top: 18px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow-card);
  background: var(--surface-100);
  overflow: hidden;

  @media (max-width: 720px) {
    border: 0;
    box-shadow: none;
    background: transparent;
  }
`;

export const EmptyState = styled.p`
  margin: 0;
  padding: 24px;
  color: var(--text-soft);
  text-align: center;
  font-weight: 600;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 720px) {
    display: none;
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 14px 16px;
  border-bottom: 1px solid #f1e9f5;
  text-transform: uppercase;
  font-size: 0.9rem;
`;

export const Td = styled.td`
  text-align: left;
  padding: 14px 16px;
  border-bottom: 1px solid #f1e9f5;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MobileList = styled.div`
  display: none;

  @media (max-width: 720px) {
    display: grid;
    gap: 12px;
  }
`;

export const MobileCard = styled.article`
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-soft);
  background: var(--surface-100);
  box-shadow: var(--shadow-card);
  padding: 16px;
`;

export const MobileTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: var(--text-main);
`;

export const MobilePrice = styled.p`
  margin: 8px 0 0;
  color: var(--brand-900);
  font-weight: 800;
  font-size: 1.05rem;
`;

export const MobileActions = styled(Actions)`
  margin-top: 14px;
  justify-content: flex-end;
`;

export const IconButton = styled.button`
  border: 0;
  background: transparent;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--text-main);
  cursor: pointer;

  &:hover {
    background: #f4edf8;
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
  width: min(100%, 520px);
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

export const ErrorText = styled.p`
  margin: 0;
  color: #b03145;
  font-weight: 600;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 4px;

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
