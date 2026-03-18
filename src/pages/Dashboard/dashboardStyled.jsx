import styled from "styled-components";

export const DashboardPage = styled.section`
  max-width: 1120px;
  margin: 0 auto;
`;

export const SummaryGrid = styled.section`
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

export const ContentGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.9fr);
  gap: 18px;
  margin-top: 18px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.section`
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-soft);
  background: rgb(255 255 255 / 0.86);
  box-shadow: var(--shadow-card);
  padding: 20px;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  color: var(--brand-900);
`;

export const PanelText = styled.p`
  margin: 0;
  color: var(--text-soft);
  line-height: 1.55;
`;

export const List = styled.div`
  display: grid;
  gap: 12px;
`;

export const ListItem = styled.article`
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 14px;
  background: linear-gradient(180deg, #fff 0%, #fbf8fc 100%);
  border: 1px solid #efe5f3;
`;

export const ItemTitle = styled.h3`
  margin: 0;
  font-size: 0.98rem;
  color: var(--text-main);
`;

export const ItemMeta = styled.p`
  margin: 0;
  color: var(--text-soft);
  font-size: 0.92rem;
`;

export const ItemStatus = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-pill);
  padding: 4px 10px;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ $status }) => {
    if ($status === "pago") return "#1f8a55";
    if ($status === "concluido") return "#b52f40";
    return "#195cad";
  }};
  background: ${({ $status }) => {
    if ($status === "pago") return "#e6f7ef";
    if ($status === "concluido") return "#fdebec";
    return "#e8f3ff";
  }};
`;

export const EmptyState = styled.p`
  margin: 0;
  color: var(--text-soft);
  text-align: center;
  font-weight: 600;
  padding: 24px 8px;
`;

export const RevenueBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-pill);
  padding: 7px 12px;
  background: var(--brand-100);
  color: var(--brand-900);
  font-weight: 800;
  font-size: 0.9rem;
`;
