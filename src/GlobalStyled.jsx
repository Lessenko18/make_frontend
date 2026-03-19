import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
  :root {
    --font-body: "Manrope", "Segoe UI", sans-serif;
    --font-heading: "Playfair Display", Georgia, serif;

    --text-main: #241628;
    --text-soft: #5c4d61;
    --brand-900: #3e2148;
    --brand-800: #573066;
    --brand-700: #72418a;
    --brand-100: #ece1f1;
    --surface-100: #ffffff;
    --surface-200: #f8f5fa;
    --border-soft: #e5d9eb;
    --danger-700: #8c3d48;

    --radius-sm: 10px;
    --radius-md: 14px;
    --radius-lg: 18px;
    --radius-pill: 999px;

    --shadow-soft: 0 10px 30px rgb(88 45 103 / 0.08);
    --shadow-card: 0 8px 22px rgb(53 26 61 / 0.08);
  }

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    min-height: 100%;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: var(--font-body);
    color: var(--text-main);
    line-height: 1.5;
    overflow-x: hidden;
    background:
      linear-gradient(180deg, rgb(250 245 252 / 0.9), rgb(255 255 255 / 0.96)),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 23px,
        rgb(125 70 140 / 0.08) 24px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 23px,
        rgb(125 70 140 / 0.08) 24px
      );
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  @media (max-width: 640px) {
    body {
      background:
        linear-gradient(180deg, rgb(251 247 253 / 0.98), rgb(255 255 255 / 1)),
        radial-gradient(circle at top right, rgb(114 65 138 / 0.08), transparent 42%);
    }
  }
`;

export default GlobalStyled;
