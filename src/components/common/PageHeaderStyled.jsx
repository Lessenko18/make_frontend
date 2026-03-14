import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const HeaderInfo = styled.div``;

export const Breadcrumb = styled.p`
  margin: 0;
  color: var(--text-soft);
  font-size: 0.95rem;
`;

export const Title = styled.h1`
  margin: 6px 0 0;
  font-family: var(--font-heading);
  font-size: clamp(1.9rem, 2.4vw, 2.9rem);
  color: var(--brand-900);
`;

export const ActionButton = styled.button`
  border: 0;
  border-radius: var(--radius-pill);
  background: linear-gradient(135deg, var(--brand-800), var(--brand-700));
  color: #fff;
  padding: 11px 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  letter-spacing: 0.2px;
  box-shadow: var(--shadow-soft);
  cursor: pointer;

  @media (max-width: 860px) {
    width: 100%;
    justify-content: center;
  }
`;
