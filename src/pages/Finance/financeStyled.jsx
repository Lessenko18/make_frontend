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
