import Sidebar from "./Sidebar";
import { Content, Shell } from "./AppShellStyled";

function AppShell({ activeSection, children }) {
  return (
    <Shell>
      <Sidebar activeSection={activeSection} />
      <Content>{children}</Content>
    </Shell>
  );
}

export default AppShell;
