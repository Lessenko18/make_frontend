import styled from "styled-components";

export const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 240px 1fr;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const Content = styled.main`
  padding: 34px 28px;

  @media (max-width: 960px) {
    padding: 18px 14px 30px;
  }
`;
