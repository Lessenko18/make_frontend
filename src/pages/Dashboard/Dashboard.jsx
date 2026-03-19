import { startTransition, useEffect, useMemo, useState } from "react";
import { CalendarDays, WalletCards } from "lucide-react";
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
  PanelTitle,
  PaymentMethodMeta,
  PaymentMethodValue,
  RevenueBadge,
  SummaryGrid,
} from "./dashboardStyled";

const normalizeStatus = (status) => {
  const value = String(status || "agendado")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (value === "pago" || value === "concluido" || value === "encerrado") {
    return "encerrado";
  }
  return "agendado";
};

const statusPriority = {
  agendado: 0,
  encerrado: 1,
};

const statusLabel = {
  agendado: "Em aberto",
  encerrado: "Encerrado",
};

const paymentMethodGroupLabel = {
  pix: "Pix",
  dinheiro: "Dinheiro",
  cartao_credito: "Cartão de crédito",
  cartao_debito: "Cartão de débito",
  transferencia: "Transferência",
  outros: "Outros",
};

const normalizePaymentMethodGroup = (method) => {
  const value = String(method || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-\s]+/g, "_");

  if (value === "pix") return "pix";
  if (value === "dinheiro") return "dinheiro";
  if (
    value === "cartao_credito" ||
    value === "credito" ||
    value === "credito_cartao" ||
    value === "cartao_de_credito"
  ) {
    return "cartao_credito";
  }
  if (
    value === "cartao_debito" ||
    value === "debito" ||
    value === "debito_cartao" ||
    value === "cartao_de_debito"
  ) {
    return "cartao_debito";
  }
  if (value === "cartao") {
    return "cartao_credito";
  }
  if (value === "transferencia") return "transferencia";
  return "outros";
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
            normalizeStatus(appointment.status) !== "encerrado"
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

  const monthlyRevenueByPaymentMethod = useMemo(() => {
    const totals = {
      pix: 0,
      dinheiro: 0,
      cartao_credito: 0,
      cartao_debito: 0,
      transferencia: 0,
      outros: 0,
    };

    entries.forEach((entry) => {
      const paidAt = new Date(entry.paidAt || entry.createdAt || now);
      const isCurrentMonth =
        paidAt.getMonth() === now.getMonth() &&
        paidAt.getFullYear() === now.getFullYear();

      if (entry.type !== "entrada" || !isCurrentMonth) return;

      const amount = Number(entry.amount || 0);
      const key = normalizePaymentMethodGroup(entry.paymentMethod);
      totals[key] += Number.isFinite(amount) ? amount : 0;
    });

    return Object.entries(totals)
      .map(([key, amount]) => ({
        key,
        label: paymentMethodGroupLabel[key] || "Outros",
        amount,
      }))
      .sort((left, right) => right.amount - left.amount);
  }, [entries, now]);

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
              <PanelTitle>Ganhos por Pagamento</PanelTitle>
              <WalletCards size={18} />
            </PanelHeader>

            {monthlyRevenueByPaymentMethod.length ? (
              <List>
                {monthlyRevenueByPaymentMethod.map((item) => (
                  <ListItem key={item.key}>
                    <ItemTitle>{item.label}</ItemTitle>
                    <PaymentMethodValue>
                      {currencyFormatter.format(item.amount)}
                    </PaymentMethodValue>
                  </ListItem>
                ))}

                <ListItem>
                  <ItemTitle>Total do mês</ItemTitle>
                  <PaymentMethodValue>
                    {currencyFormatter.format(monthlyRevenue)}
                  </PaymentMethodValue>
                  <PaymentMethodMeta>
                    Somente entradas do financeiro
                  </PaymentMethodMeta>
                </ListItem>
              </List>
            ) : (
              <EmptyState>
                Nenhum ganho com forma de pagamento registrada neste mês.
              </EmptyState>
            )}
          </Panel>
        </ContentGrid>
      </DashboardPage>
    </AppShell>
  );
}

export default Dashboard;
