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
