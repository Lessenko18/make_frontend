import styled from "styled-components";

/* ── tokens de cor rose/pink específicos de Clientes ── */
const rose900 = "#8b2252";
const rose700 = "#c0556e";
const rose500 = "#e8899a";
const rose100 = "#fde8ed";
const roseBorder = "#f5cfd7";

/* ── layout da página ── */
export const ClientsPage = styled.section`
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageTop = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(1.9rem, 2.4vw, 2.9rem);
  color: var(--text-main);
`;

export const NewClientButton = styled.button`
  border: 0;
  border-radius: var(--radius-pill);
  background: linear-gradient(135deg, ${rose900}, ${rose700});
  color: #fff;
  padding: 11px 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  letter-spacing: 0.3px;
  box-shadow: 0 6px 20px rgb(192 85 110 / 0.28);
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 0.88;
  }

  @media (max-width: 860px) {
    width: 100%;
    justify-content: center;
  }
`;

/* ── busca ── */
export const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #b0a0b8;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-pill);
  background: var(--surface-100);
  padding: 13px 20px 13px 46px;
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-main);
  outline: none;

  &::placeholder {
    color: #b0a0b8;
  }

  &:focus {
    border-color: ${rose500};
    box-shadow: 0 0 0 3px rgb(232 137 154 / 0.18);
  }
`;

/* ── grid: tabela + painel ── */
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 310px;
  gap: 18px;
  align-items: start;

  @media (max-width: 1060px) {
    grid-template-columns: 1fr;
  }
`;

/* ── tabela ── */
export const TableCard = styled.div`
  background: var(--surface-100);
  border-radius: var(--radius-lg);
  border: 1px solid ${roseBorder};
  box-shadow: 0 8px 24px rgb(192 85 110 / 0.06);
  overflow: hidden;

  @media (max-width: 720px) {
    background: transparent;
    border: 0;
    box-shadow: none;
  }
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
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.3px;
  color: var(--text-soft);
  border-bottom: 1px solid ${roseBorder};
`;

export const Tr = styled.tr`
  cursor: pointer;
  transition: background 140ms;

  &:hover,
  &[data-selected="true"] {
    background: #fff5f7;
  }
`;

export const Td = styled.td`
  padding: 14px 16px;
  border-bottom: 1px solid #fce7ec;
  font-size: 0.97rem;
`;

export const ActionCell = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const IconBtn = styled.button`
  border: 0;
  background: transparent;
  color: ${rose700};
  display: grid;
  place-items: center;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: background 140ms;

  &:hover {
    background: ${rose100};
  }
`;

export const EmptyRow = styled.tr`
  td {
    text-align: center;
    padding: 40px;
    color: var(--text-soft);
    font-weight: 600;
  }
`;

/* ── painel lateral ── */
export const DetailPanel = styled.aside`
  background: var(--surface-100);
  border-radius: var(--radius-lg);
  border: 1px solid ${roseBorder};
  box-shadow: 0 8px 24px rgb(192 85 110 / 0.06);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  @media (max-width: 720px) {
    padding: 18px 16px;
  }
`;

export const MobileClientList = styled.div`
  display: none;

  @media (max-width: 720px) {
    display: grid;
    gap: 12px;
  }
`;

export const MobileClientCard = styled.article`
  border-radius: var(--radius-lg);
  border: 1px solid ${roseBorder};
  background: var(--surface-100);
  box-shadow: 0 8px 24px rgb(192 85 110 / 0.08);
  padding: 16px;
`;

export const MobileClientHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const MobileClientName = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: var(--text-main);
`;

export const MobileClientMeta = styled.p`
  margin: 6px 0 0;
  color: var(--text-soft);
  font-size: 0.92rem;
`;

export const MobileClientActions = styled(ActionCell)`
  margin-top: 14px;
  justify-content: flex-end;
`;

export const Avatar = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${roseBorder};
`;

export const AvatarPlaceholder = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: ${rose100};
  display: grid;
  place-items: center;
  color: ${rose700};
  border: 3px solid ${roseBorder};
`;

export const ClientName = styled.h2`
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.35rem;
  color: var(--text-main);
  text-align: center;
`;

export const DetailSection = styled.div`
  width: 100%;
`;

export const DetailLabel = styled.p`
  margin: 0 0 6px;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-main);
`;

export const DetailText = styled.p`
  margin: 0;
  color: var(--text-soft);
  font-size: 0.9rem;
  line-height: 1.55;
`;

export const HistoryList = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 6px;
`;

export const HistoryItem = styled.li`
  color: var(--text-soft);
  font-size: 0.9rem;
  line-height: 1.5;

  strong {
    color: var(--text-main);
    font-weight: 700;
  }
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;

  @media (max-width: 420px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const PhotoThumb = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${roseBorder};
`;

export const EmptyPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 30px 0;
  color: var(--text-soft);
  font-weight: 600;
  text-align: center;
`;

/* ── upload de avatar ── */
export const AvatarWrapper = styled.div`
  position: relative;
  cursor: pointer;
  width: 88px;

  &:hover > span {
    opacity: 1;
  }
`;

export const AvatarOverlay = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(139, 34, 82, 0.55);
  display: grid;
  place-items: center;
  color: #fff;
  opacity: 0;
  transition: opacity 180ms;
  pointer-events: none;
`;

/* ── galeria ── */
export const GalleryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const AddPhotoBtn = styled.button`
  border: 0;
  background: ${rose100};
  color: ${rose900};
  border-radius: var(--radius-pill);
  padding: 3px 12px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: ${roseBorder};
  }
`;

export const PhotoThumbWrapper = styled.div`
  position: relative;
  cursor: zoom-in;

  &:hover > button {
    opacity: 1;
  }
`;

export const PhotoDeleteBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 0;
  background: rgba(139, 34, 82, 0.85);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  padding: 0;
  opacity: 0;
  transition: opacity 140ms;

  &:hover {
    background: ${rose900};
    opacity: 1 !important;
  }
`;

/* ── lightbox ── */
export const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(10, 5, 15, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes lbFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: lbFadeIn 160ms ease;
`;

export const LightboxImg = styled.img`
  max-width: min(90vw, 900px);
  max-height: 85vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  user-select: none;

  @keyframes lbScaleIn {
    from {
      transform: scale(0.93);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  animation: lbScaleIn 200ms ease;
`;

export const LightboxClose = styled.button`
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 1001;
  background: rgba(255, 255, 255, 0.14);
  border: 0;
  color: #fff;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 140ms;

  &:hover {
    background: rgba(255, 255, 255, 0.28);
  }

  @media (max-width: 640px) {
    top: 12px;
    right: 12px;
  }
`;

export const LightboxNavBtn = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === "left" ? "left: 20px;" : "right: 20px;")}
  z-index: 1001;
  background: rgba(255, 255, 255, 0.14);
  border: 0;
  color: #fff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 140ms;

  &:hover {
    background: rgba(255, 255, 255, 0.28);
  }

  &:disabled {
    opacity: 0.25;
    cursor: default;
  }

  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
    ${({ $side }) => ($side === "left" ? "left: 10px;" : "right: 10px;")}
  }
`;
