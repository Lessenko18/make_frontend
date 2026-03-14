import { Calendar, DollarSign, Home, Package, Users } from "lucide-react";
import {
  Brand,
  BrandMark,
  Nav,
  SidebarContainer,
  SidebarItem,
} from "./SidebarStyled";

const sections = [
  { key: "dashboard", label: "Dashboard", to: "/dashboard", icon: Home },
  { key: "clientes", label: "Clientes", to: "/clientes", icon: Users },
  { key: "agenda", label: "Agenda", to: "/agenda", icon: Calendar },
  {
    key: "financeiro",
    label: "Financeiro",
    to: "/financeiro/fluxo-de-caixa",
    icon: DollarSign,
  },
  { key: "estoque", label: "Estoque", to: "/estoque", icon: Package },
];

function Sidebar({ activeSection }) {
  return (
    <SidebarContainer>
      <Brand>
        <BrandMark>JM</BrandMark>
      </Brand>

      <Nav aria-label="Menu principal">
        {sections.map((item) => {
          const Icon = item.icon;
          const isFallbackActive = activeSection === item.key;

          return (
            <SidebarItem
              key={item.key}
              to={item.to}
              className={({ isActive }) =>
                isActive || isFallbackActive ? "is-active" : ""
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </SidebarItem>
          );
        })}
      </Nav>
    </SidebarContainer>
  );
}

export default Sidebar;
