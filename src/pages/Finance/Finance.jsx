import { useMemo } from "react";
import { Plus } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import PageHeader from "../../components/common/PageHeader";
import KpiCard from "../../components/financial/KpiCard";
import TransactionTable from "../../components/financial/TransactionTable";
import { FinancePage, KpisGrid } from "./financeStyled";

const kpiBlueprint = [
  { label: "Receita Mensal" },
  { label: "Atendimentos" },
  { label: "Novas Clientes" },
  { label: "Estoque Critico", highlight: true },
];

function Finance() {
  const kpis = useMemo(
    () =>
      kpiBlueprint.map((card) => ({
        ...card,
        value: "--",
        helper: "Aguardando preenchimento",
      })),
    [],
  );

  const transactions = useMemo(() => [], []);

  return (
    <AppShell activeSection="financeiro">
      <FinancePage>
        <PageHeader
          breadcrumb="Financeiro / Fluxo de Caixa"
          title="Fluxo de Caixa (Maio)"
          actionLabel="Nova Compra / Despesa"
          actionIcon={<Plus size={18} />}
        />

        <KpisGrid aria-label="Indicadores financeiros">
          {kpis.map((card) => (
            <KpiCard
              key={card.label}
              label={card.label}
              value={card.value}
              helper={card.helper}
              highlight={card.highlight}
            />
          ))}
        </KpisGrid>

        <TransactionTable rows={transactions} />
      </FinancePage>
    </AppShell>
  );
}

export default Finance;
