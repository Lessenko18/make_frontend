import { startTransition, useEffect, useMemo, useState } from "react";
import { CalendarDays, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import PageHeader from "../../components/common/PageHeader";
import KpiCard from "../../components/financial/KpiCard";
import { listAppointments } from "../../services/appointmentsService";
import { listClients } from "../../services/clientsService";
import { listFinanceEntries } from "../../services/financeService";
import { listServices } from "../../services/servicesService";
import {
  ContentGrid,
  DashboardPage,
  EmptyState,
  ItemMeta,
  ItemStatus,
  ItemTitle,
  List,
  ListItem,
  Panel,
  PanelHeader,
  PanelText,
  PanelTitle,
  RevenueBadge,
  SummaryGrid,
} from "./dashboardStyled";

const normalizeStatus = (status) => {
  const value = String(status || "agendado")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (value === "pago") return "pago";
  if (value === "concluido") return "concluido";
  return "agendado";
};

const statusPriority = {
  agendado: 0,
  concluido: 1,
  pago: 2,
};

const statusLabel = {
  agendado: "Em aberto",
  concluido: "Concluído",
  pago: "Pago",
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function Dashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    let isActive = true;

    const loadData = async () => {
      try {
        const [appointmentsData, clientsData, servicesData, entriesData] =
          await Promise.all([
            listAppointments(),
            listClients(),
            listServices(),
            listFinanceEntries(),
          ]);

        if (!isActive) return;

        startTransition(() => {
          setAppointments(appointmentsData);
          setClients(clientsData);
          setServices(servicesData);
          setEntries(entriesData);
        });
      } catch {
        if (!isActive) return;

        startTransition(() => {
          setAppointments([]);
          setClients([]);
          setServices([]);
          setEntries([]);
        });
      }
    };

    void loadData();

    return () => {
      isActive = false;
    };
  }, []);

  const now = useMemo(() => new Date(), []);

  const upcomingAppointments = useMemo(
    () =>
      appointments
        .filter((appointment) => {
          const appointmentDate = new Date(appointment.scheduledAt);
          return (
            appointmentDate >= now &&
            normalizeStatus(appointment.status) !== "pago"
          );
        })
        .sort((left, right) => {
          const leftDate = new Date(left.scheduledAt).getTime();
          const rightDate = new Date(right.scheduledAt).getTime();

          if (leftDate !== rightDate) {
            return leftDate - rightDate;
          }

          const leftPriority =
            statusPriority[normalizeStatus(left.status)] ?? 99;
          const rightPriority =
            statusPriority[normalizeStatus(right.status)] ?? 99;

          return leftPriority - rightPriority;
        })
        .slice(0, 5),
    [appointments, now],
  );

  const monthlyRevenue = useMemo(
    () =>
      entries
        .filter((entry) => {
          const paidAt = new Date(entry.paidAt || entry.createdAt || now);
          return (
            entry.type === "entrada" &&
            paidAt.getMonth() === now.getMonth() &&
            paidAt.getFullYear() === now.getFullYear()
          );
        })
        .reduce((total, entry) => total + Number(entry.amount || 0), 0),
    [entries, now],
  );

  const summaryCards = useMemo(
    () => [
      {
        label: "Agendamentos",
        value: String(appointments.length).padStart(2, "0"),
        helper: `${upcomingAppointments.length} próximo(s) na agenda`,
      },
      {
        label: "Clientes",
        value: String(clients.length).padStart(2, "0"),
        helper: "Base cadastrada no sistema",
      },
      {
        label: "Serviços",
        value: String(services.length).padStart(2, "0"),
        helper: "Catálogo ativo",
      },
      {
        label: "Receita do Mês",
        value: currencyFormatter.format(monthlyRevenue),
        helper: "Entradas registradas no financeiro",
        highlight: true,
      },
    ],
    [
      appointments.length,
      clients.length,
      monthlyRevenue,
      services.length,
      upcomingAppointments.length,
    ],
  );

  return (
    <AppShell activeSection="dashboard">
      <DashboardPage>
        <PageHeader
          breadcrumb="Dashboard"
          title="Visão Geral"
          actionLabel="Abrir Agenda"
          actionIcon={<CalendarDays size={18} />}
          onAction={() => navigate("/agenda")}
        />

        <SummaryGrid aria-label="Resumo geral do sistema">
          {summaryCards.map((card) => (
            <KpiCard
              key={card.label}
              label={card.label}
              value={card.value}
              helper={card.helper}
              highlight={card.highlight}
            />
          ))}
        </SummaryGrid>

        <ContentGrid>
          <Panel>
            <PanelHeader>
              <PanelTitle>Próximos Atendimentos</PanelTitle>
              <RevenueBadge>{upcomingAppointments.length} itens</RevenueBadge>
            </PanelHeader>

            {upcomingAppointments.length ? (
              <List>
                {upcomingAppointments.map((appointment) => (
                  <ListItem key={appointment._id}>
                    <ItemTitle>
                      {appointment.client?.name || "Cliente"} -{" "}
                      {appointment.service?.name ||
                        appointment.category?.name ||
                        "Serviço"}
                    </ItemTitle>
                    <ItemMeta>
                      {new Date(appointment.scheduledAt).toLocaleString(
                        "pt-BR",
                      )}
                    </ItemMeta>
                    <ItemMeta>
                      <ItemStatus
                        $status={normalizeStatus(appointment.status)}
                        aria-label={`Status ${statusLabel[normalizeStatus(appointment.status)]}`}
                      >
                        {statusLabel[normalizeStatus(appointment.status)]}
                      </ItemStatus>
                    </ItemMeta>
                  </ListItem>
                ))}
              </List>
            ) : (
              <EmptyState>Nenhum atendimento futuro encontrado.</EmptyState>
            )}
          </Panel>

          <Panel>
            <PanelHeader>
              <PanelTitle>Resumo Rápido</PanelTitle>
              <LayoutDashboard size={18} />
            </PanelHeader>

            <List>
              <ListItem>
                <ItemTitle>Agenda</ItemTitle>
                <PanelText>
                  Clique em um atendimento para concluir, marcar como pago ou
                  excluir.
                </PanelText>
              </ListItem>
              <ListItem>
                <ItemTitle>Financeiro</ItemTitle>
                <PanelText>
                  Apenas atendimentos marcados como pago entram no fluxo de
                  caixa.
                </PanelText>
              </ListItem>
              <ListItem>
                <ItemTitle>Clientes</ItemTitle>
                <PanelText>
                  O painel lateral mostra histórico e próxima sessão quando
                  disponível.
                </PanelText>
              </ListItem>
            </List>
          </Panel>
        </ContentGrid>
      </DashboardPage>
    </AppShell>
  );
}

export default Dashboard;
