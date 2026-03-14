import styled from "styled-components";

export const CalendarPage = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  border: 1px dashed var(--border-soft);
  background: rgb(255 255 255 / 0.72);
  border-radius: var(--radius-lg);
  padding: 26px;
`;

export const CalendarTitle = styled.h1`
  margin: 0;
  font-family: var(--font-heading);
  color: var(--brand-900);
`;

export const CalendarText = styled.p`
  margin: 10px 0 0;
  color: var(--text-soft);
`;

export const CalendarContainer = styled.div`
  margin-top: 16px;
`;
