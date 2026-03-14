import styled from "styled-components";

export const Card = styled.article`
  background: var(--surface-100);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow-card);
  padding: 18px 20px;
`;

export const Label = styled.h2`
  margin: 0;
  text-transform: uppercase;
  font-size: 0.95rem;
  letter-spacing: 0.4px;
`;

export const Value = styled.div`
  margin-top: 10px;
  font-size: clamp(1.6rem, 2vw, 2.5rem);
  font-weight: 800;
  color: ${({ $highlight }) =>
    $highlight ? "var(--brand-700)" : "var(--text-main)"};
`;

export const Helper = styled.p`
  margin: 4px 0 0;
  color: var(--text-soft);
  font-weight: 600;
`;
