import styled from "styled-components";

export const TableWrapper = styled.section`
  margin-top: 18px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow-card);
  background: var(--surface-100);
  overflow: hidden;

  @media (max-width: 860px) {
    overflow-x: auto;
  }

  @media (max-width: 720px) {
    overflow: visible;
    background: transparent;
    border: 0;
    box-shadow: none;
  }
`;

export const EmptyWrapper = styled(TableWrapper)`
  padding: 36px 24px;
  text-align: center;
`;

export const EmptyText = styled.p`
  margin: 0;
  color: var(--text-soft);
  font-weight: 600;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 860px) {
    min-width: 760px;
  }

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
  letter-spacing: 0.2px;
`;

export const Td = styled.td`
  text-align: left;
  padding: 14px 16px;
  border-bottom: 1px solid #f1e9f5;
`;

export const Tag = styled.span`
  border-radius: var(--radius-pill);
  font-size: 0.84rem;
  font-weight: 700;
  padding: 5px 12px;
  color: ${({ $income }) => ($income ? "var(--brand-900)" : "#fff")};
  background: ${({ $income }) => ($income ? "#e8ddf1" : "var(--danger-700)")};
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

export const MobileHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

export const MobileTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: var(--text-main);
`;

export const MobileDate = styled.p`
  margin: 4px 0 0;
  color: var(--text-soft);
  font-size: 0.88rem;
`;

export const MobileMeta = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 14px;
`;

export const MobileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const MobileLabel = styled.span`
  color: var(--text-soft);
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const MobileValue = styled.span`
  font-weight: 700;
  color: var(--text-main);
  text-align: right;
`;

export const MobileActions = styled(Actions)`
  margin-top: 14px;
  justify-content: flex-end;
`;

export const IconButton = styled.button`
  border: 0;
  background: transparent;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--text-main);
  cursor: pointer;

  &:hover {
    background: #f4edf8;
  }
`;
