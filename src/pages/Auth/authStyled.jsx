import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const brushFloat = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(-10deg);
  }
  50% {
    transform: translate3d(6px, -8px, 0) rotate(-7deg);
  }
`;

export const AuthCanvas = styled.main`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 16px;
  overflow: hidden;
  background: #fdfbff;
`;

export const AuthContainer = styled.section`
  width: min(1340px, calc(100vw - 32px));
  min-height: calc(100dvh - 32px);
  border-radius: 18px;
  border: 1px solid #dfd0e8;
  background: linear-gradient(
    160deg,
    rgb(255 255 255 / 0.84),
    rgb(247 239 251 / 0.8)
  );
  box-shadow: 0 20px 48px rgb(88 45 103 / 0.1);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(420px, 460px);
  overflow: hidden;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    min-height: calc(100dvh - 20px);
    width: min(100%, calc(100vw - 12px));
    border-radius: 14px;
  }
`;

export const LeftArtwork = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 30% 18%,
      rgb(203 165 222 / 0.16),
      transparent 42%
    ),
    linear-gradient(140deg, rgb(255 255 255 / 0.82), rgb(248 238 252 / 0.92));

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 25%;
    width: 320px;
    height: 90px;
    border-radius: 99px;
    filter: blur(0.4px);
    opacity: 0.6;
    background: linear-gradient(
      90deg,
      rgb(200 154 221 / 0.02),
      rgb(177 112 209 / 0.34)
    );
    animation: ${brushFloat} 9s ease-in-out infinite;
    transform: rotate(-10deg);
  }

  &::before {
    top: 34%;
    box-shadow:
      0 -44px 0 -12px rgb(190 136 216 / 0.26),
      0 44px 0 -10px rgb(196 146 220 / 0.2);
  }

  &::after {
    top: 47%;
    left: 30%;
    width: 250px;
    opacity: 0.5;
    animation-delay: 0.6s;
  }

  @media (max-width: 920px) {
    min-height: 230px;

    &::before,
    &::after {
      left: 50%;
      transform: translateX(-50%) rotate(-10deg);
    }
  }
`;

export const PanelGlow = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 56% 62%,
      rgb(202 170 225 / 0.28),
      transparent 40%
    ),
    radial-gradient(circle at 40% 43%, rgb(167 103 199 / 0.2), transparent 34%);
`;

export const AuthCard = styled.article`
  align-self: center;
  justify-self: center;
  width: min(100%, 420px);
  margin: 32px 18px;
  border: 1px solid #eadff0;
  border-radius: 16px;
  background: linear-gradient(180deg, #fff 0%, #fefcff 100%);
  box-shadow: 0 14px 34px rgb(77 30 99 / 0.12);
  padding: 24px 28px 20px;
  animation: ${fadeUp} 420ms ease;
  max-height: none;
  overflow: hidden;

  form {
    display: grid;
    gap: 12px;
  }

  @media (max-width: 920px) {
    margin: -56px 14px 14px;
    width: auto;
    z-index: 1;
    max-height: none;
    padding: 24px 22px 20px;
    justify-self: center;
  }
`;

export const Brand = styled.div`
  font-family: var(--font-heading);
  text-align: center;
  color: #b06ecf;
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 2px;
`;

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 2rem;
  letter-spacing: -0.02em;
  color: #2f163b;
`;

export const Subtitle = styled.p`
  margin: 2px 0 14px;
  text-align: center;
  color: #6d5878;
`;

export const InputGroup = styled.div`
  display: grid;
  gap: 10px;
`;

export const Field = styled.label`
  height: 42px;
  border-radius: 999px;
  border: 1px solid #d8c4e3;
  background: linear-gradient(180deg, #ffffff, #f9f3fc);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  color: #ae7dc4;

  &:focus-within {
    border-color: #b071cc;
    box-shadow: 0 0 0 4px rgb(176 113 204 / 0.17);
  }
`;

export const Input = styled.input`
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
  color: #3f2748;
  font-size: 0.95rem;

  &::placeholder {
    color: #9e87aa;
  }
`;

export const PasswordToggle = styled.button`
  border: 0;
  background: transparent;
  color: #9e87aa;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    color: #7f5a90;
    background: rgb(162 90 189 / 0.08);
  }
`;

export const InlineAction = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const MainButton = styled.button`
  margin-top: 4px;
  height: 44px;
  border: 0;
  border-radius: 999px;
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: linear-gradient(90deg, #9f54c2, #b16dd1);
  box-shadow: 0 10px 22px rgb(150 75 181 / 0.28);
  cursor: pointer;
  transition:
    transform 120ms ease,
    filter 120ms ease;

  &:hover {
    filter: brightness(1.04);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    filter: saturate(0.8);
    transform: none;
  }
`;

export const Divider = styled.div`
  position: relative;
  margin: 4px 0;
  text-align: center;
  color: #7d6988;
  font-size: 0.9rem;

  span {
    display: inline-block;
    padding: 0 10px;
    background: #fff;
    position: relative;
    z-index: 1;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    border-top: 1px solid #e2d4ea;
  }
`;

export const SocialActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const SocialButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ebdfef;
  background: #fdf7ff;
  color: #bf8ad3;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

export const FooterText = styled.p`
  margin: 8px 0 2px;
  font-size: 0.94rem;
  text-align: center;
  color: #5f4a68;
`;

export const TextButton = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  color: #a25abd;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: #8d3fb0;
  }
`;
