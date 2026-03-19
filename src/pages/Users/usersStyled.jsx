import styled from "styled-components";

const violet900 = "#522565";
const violet700 = "#8d4fb1";
const violet100 = "#f4eafb";
const violetBorder = "#e6d6f2";

export const UsersPage = styled.section`
  max-width: 1120px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 2.4vw, 2.5rem);
`;

export const AddButton = styled.button`
  border: 0;
  border-radius: var(--radius-pill);
  background: linear-gradient(135deg, ${violet900}, ${violet700});
  color: #fff;
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
`;

export const Panel = styled.div`
  border-radius: var(--radius-lg);
  border: 1px solid ${violetBorder};
  background: #fff;
  box-shadow: var(--shadow-card);
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 820px) {
    display: none;
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 14px 16px;
  border-bottom: 1px solid ${violetBorder};
  color: var(--text-soft);
  font-size: 0.85rem;
  text-transform: uppercase;
`;

export const Tr = styled.tr`
  &:hover {
    background: #faf6fe;
  }
`;

export const Td = styled.td`
  padding: 14px 16px;
  border-bottom: 1px solid #f2e9f9;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.button`
  border: 0;
  background: transparent;
  border-radius: 8px;
  color: ${violet700};
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  cursor: pointer;

  &:hover {
    background: ${violet100};
  }
`;

export const Empty = styled.p`
  margin: 0;
  padding: 28px;
  text-align: center;
  color: var(--text-soft);
`;

export const MobileList = styled.div`
  display: none;

  @media (max-width: 820px) {
    display: grid;
    gap: 10px;
    padding: 12px;
  }
`;

export const MobileCard = styled.article`
  border: 1px solid ${violetBorder};
  border-radius: var(--radius-md);
  background: #fff;
  padding: 12px;
`;

export const MobileName = styled.h3`
  margin: 0;
`;

export const MobileEmail = styled.p`
  margin: 6px 0 10px;
  color: var(--text-soft);
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(18 11 24 / 0.5);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 180;
`;

export const ModalCard = styled.div`
  width: min(100%, 480px);
  border-radius: var(--radius-lg);
  border: 1px solid ${violetBorder};
  background: #fff;
  box-shadow: var(--shadow-card);
  padding: 18px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-family: var(--font-heading);
`;

export const Form = styled.form`
  margin-top: 14px;
  display: grid;
  gap: 10px;
`;

export const Label = styled.label`
  font-weight: 700;
  color: var(--text-main);
  font-size: 0.92rem;
`;

export const Input = styled.input`
  width: 100%;
  margin-top: 6px;
  border: 1px solid ${violetBorder};
  border-radius: 12px;
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: ${violet700};
    box-shadow: 0 0 0 3px rgb(141 79 177 / 0.18);
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
`;

export const GhostButton = styled.button`
  border: 0;
  border-radius: var(--radius-pill);
  padding: 10px 14px;
  background: #f3eafe;
  color: var(--text-main);
  font-weight: 700;
  cursor: pointer;
`;

export const PrimaryButton = styled.button`
  border: 0;
  border-radius: var(--radius-pill);
  padding: 10px 14px;
  background: linear-gradient(135deg, ${violet900}, ${violet700});
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;
