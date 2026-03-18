import styled from "styled-components";

export const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;
  }
`;

export const Content = styled.main`
  min-width: 0;
  padding: 34px 32px 42px;

  @media (max-width: 960px) {
    padding: 20px 16px 34px;
  }

  @media (max-width: 640px) {
    padding: 18px 12px 28px;
  }
`;
