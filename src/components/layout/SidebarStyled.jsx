import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SidebarContainer = styled.aside`
  border-right: 1px solid var(--border-soft);
  background: linear-gradient(180deg, #fff 0%, #f9f4fb 100%);
  padding: 24px 14px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 960px) {
    border-right: 0;
    border-bottom: 1px solid var(--border-soft);
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88px;

  @media (max-width: 960px) {
    height: 66px;
  }
`;

export const BrandMark = styled.span`
  font-family: var(--font-heading);
  font-size: 56px;
  color: var(--brand-900);
  letter-spacing: 1px;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 960px) {
    overflow-x: auto;
    flex-direction: row;
    padding-bottom: 6px;
  }
`;

export const SidebarItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-main);
  font-weight: 600;
  border-radius: 12px;
  padding: 11px 12px;
  transition:
    transform 150ms ease,
    background-color 150ms ease;

  &:hover {
    background: var(--surface-200);
    transform: translateX(2px);
  }

  &.is-active {
    background: var(--brand-100);
    color: var(--brand-900);
  }

  @media (max-width: 960px) {
    white-space: nowrap;
  }
`;
