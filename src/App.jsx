import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Finance from "./pages/Finance/Finance";
import Clients from "./pages/Clients/Clients";
import Calendar from "./pages/calendar/Calendar";
import Services from "./pages/Services/Services";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/financeiro/fluxo-de-caixa" replace />}
        />
        <Route path="/login" element={<Calendar title="Login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/agenda" element={<Calendar title="Agenda" />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/financeiro/fluxo-de-caixa" element={<Finance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
