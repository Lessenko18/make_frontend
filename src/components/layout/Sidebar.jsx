import {
  Calendar,
  DollarSign,
  Home,
  LogOut,
  Package,
  UserCog,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearAuthToken } from "../../services/authService";
import {
  Brand,
  BrandMark,
  Nav,
  LogoutButton,
  SidebarContainer,
  SidebarItem,
} from "./SidebarStyled";

const sections = [
  { key: "dashboard", label: "Dashboard", to: "/dashboard", icon: Home },
  { key: "clientes", label: "Clientes", to: "/clientes", icon: Users },
  { key: "usuarios", label: "Usuários", to: "/usuarios", icon: UserCog },
  { key: "agenda", label: "Agenda", to: "/agenda", icon: Calendar },
  {
    key: "financeiro",
    label: "Financeiro",
    to: "/financeiro",
    icon: DollarSign,
  },
  { key: "servicos", label: "Serviços", to: "/servicos", icon: Package },
];

function Sidebar({ activeSection }) {
  const navigate = useNavigate();

  function handleLogout() {
    clearAuthToken();
    navigate("/login", { replace: true });
  }

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

      <LogoutButton type="button" onClick={handleLogout}>
        <LogOut size={20} />
        <span>Sair</span>
      </LogoutButton>
    </SidebarContainer>
  );
}

export default Sidebar;
