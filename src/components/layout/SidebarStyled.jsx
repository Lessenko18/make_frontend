import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SidebarContainer = styled.aside`
  border-right: 1px solid var(--border-soft);
  background: linear-gradient(180deg, #fff 0%, #f9f4fb 100%);
  padding: 24px 14px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: sticky;
  top: 0;
  align-self: start;
  min-height: 100vh;

  @media (max-width: 960px) {
    position: sticky;
    top: 0;
    z-index: 20;
    border-right: 0;
    border-bottom: 1px solid var(--border-soft);
    background: rgb(255 255 255 / 0.88);
    backdrop-filter: blur(12px);
    padding: 10px 12px 12px;
    min-height: auto;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88px;

  @media (max-width: 960px) {
    justify-content: flex-start;
    height: 42px;
  }
`;

export const BrandMark = styled.span`
  font-family: var(--font-heading);
  font-size: 56px;
  color: var(--brand-900);
  letter-spacing: 1px;

  @media (max-width: 960px) {
    font-size: 32px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;

  @media (max-width: 960px) {
    overflow-x: auto;
    flex-direction: row;
    padding-bottom: 4px;
    flex: initial;
    scrollbar-width: none;
  }

  @media (max-width: 960px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const SidebarItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  color: var(--text-main);
  font-weight: 600;
  border-radius: 12px;
  padding: 11px 12px;
  transition:
    transform 150ms ease,
    background-color 150ms ease,
    color 150ms ease;

  &:hover {
    background: var(--surface-200);
    transform: translateX(2px);
  }

  &.is-active {
    background: var(--surface-200);
    color: var(--text-main);
    transform: translateX(2px);

    svg {
      color: var(--text-main);
    }

    span {
      color: var(--text-main);
      font-weight: 700;
    }
  }

  @media (max-width: 960px) {
    white-space: nowrap;
    flex: 0 0 auto;
    padding: 10px 14px;
    border: 1px solid transparent;
    background: rgb(255 255 255 / 0.74);

    &:hover {
      transform: translateY(-1px);
    }

    &.is-active {
      border-color: transparent;
      background: rgb(255 255 255 / 0.74);
      transform: translateY(-1px);
      box-shadow: none;

      svg {
        color: var(--text-main);
      }

      span {
        color: var(--text-main);
        font-weight: 700;
      }
    }
  }

  @media (max-width: 640px) {
    padding: 9px 12px;
    font-size: 0.92rem;
    gap: 8px;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  border: 0;
  border-radius: 12px;
  padding: 11px 12px;
  background: transparent;
  color: #b42318;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 150ms ease,
    background-color 150ms ease,
    color 150ms ease;

  &:hover {
    background: #fff1f0;
    transform: translateX(2px);
  }

  @media (max-width: 960px) {
    width: max-content;
    padding: 10px 14px;
    background: rgb(255 255 255 / 0.74);
    border: 1px solid #f3c7c2;

    &:hover {
      transform: translateY(-1px);
    }
  }

  @media (max-width: 640px) {
    padding: 9px 12px;
    font-size: 0.92rem;
    gap: 8px;
  }
`;
