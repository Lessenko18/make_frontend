import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import PageHeader from "../../components/common/PageHeader";
import { useToast } from "../../components/common/useToast";
import KpiCard from "../../components/financial/KpiCard";
import TransactionTable from "../../components/financial/TransactionTable";
import {
  ErrorText,
  Field,
  FinancePage,
  Form,
  GhostButton,
  Input,
  KpisGrid,
  Modal,
  ModalActions,
  ModalOverlay,
  ModalTitle,
  PrimaryButton,
  Select,
  Split,
  Textarea,
} from "./financeStyled";
import {
  createManualExpense,
  listFinanceEntries,
} from "../../services/financeService";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const paymentMethodLabelMap = {
  pix: "Pix",
  dinheiro: "Dinheiro",
  cartao_credito: "Cartão de crédito",
  cartao_debito: "Cartão de débito",
  transferencia: "Transferência",
  outro: "Outro",
};

const formatPaymentMethod = (method) => {
  if (!method) return "-";
  return (
    paymentMethodLabelMap[method] ||
    String(method)
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
};

const emptyExpenseForm = {
  amount: "",
  paymentMethod: "pix",
  description: "",
  notes: "",
};

function Finance() {
  const {
    ToastContainer,
    error: showErrorToast,
    success: showSuccessToast,
  } = useToast();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyExpenseForm);

  const loadEntries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await listFinanceEntries();
      setEntries(data);
    } catch {
      setEntries([]);
      showErrorToast("Financeiro", "Não foi possível carregar os lançamentos.");
    } finally {
      setLoading(false);
    }
  }, [showErrorToast]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthEntries = useMemo(
    () =>
      entries.filter((entry) => {
        const date = new Date(entry.paidAt || entry.createdAt || Date.now());
        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
      }),
    [currentMonth, currentYear, entries],
  );

  const kpis = useMemo(() => {
    const revenue = monthEntries
      .filter((entry) => entry.type === "entrada")
      .reduce((total, entry) => total + Number(entry.amount || 0), 0);
    const expenses = monthEntries
      .filter((entry) => entry.type === "saida")
      .reduce((total, entry) => total + Number(entry.amount || 0), 0);
    const paidAppointments = monthEntries.filter(
      (entry) => entry.origin === "agendamento" && entry.type === "entrada",
    ).length;
    const balance = revenue - expenses;

    return [
      {
        label: "Entradas do Mês",
        value: currencyFormatter.format(revenue),
        helper: `${paidAppointments} atendimento(s) lançados`,
      },
      {
        label: "Saídas do Mês",
        value: currencyFormatter.format(expenses),
        helper: `${monthEntries.filter((entry) => entry.type === "saida").length} despesa(s)`,
      },
      {
        label: "Saldo do Mês",
        value: currencyFormatter.format(balance),
        helper: balance >= 0 ? "Resultado positivo" : "Resultado negativo",
        highlight: balance >= 0,
      },
      {
        label: "Lançamentos",
        value: String(monthEntries.length).padStart(2, "0"),
        helper: "Entradas e saídas registradas",
      },
    ];
  }, [monthEntries]);

  const transactions = useMemo(
    () =>
      entries.map((entry) => ({
        date: new Date(
          entry.paidAt || entry.createdAt || Date.now(),
        ).toLocaleDateString("pt-BR"),
        description:
          entry.description ||
          (entry.origin === "agendamento"
            ? `${entry.client?.name || "Cliente"} - ${entry.service?.name || entry.category?.name || "Serviço"}`
            : "Compra / despesa manual"),
        category:
          entry.service?.name ||
          entry.category?.name ||
          (entry.origin === "compra_manual" ? "Despesa manual" : "Ajuste"),
        paymentMethod: formatPaymentMethod(entry.paymentMethod),
        notes:
          entry.notes ||
          entry.observation ||
          entry.observacao ||
          entry.descriptionNote ||
          "-",
        amount: currencyFormatter.format(Number(entry.amount || 0)),
        type: entry.type === "entrada" ? "Entrada" : "Saída",
      })),
    [entries],
  );

  const openModal = () => {
    setModalOpen(true);
    setSaving(false);
    setError("");
    setForm(emptyExpenseForm);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSaving(false);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const parsedAmount = Number(form.amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Informe um valor válido para a despesa.");
      return;
    }

    if (!form.description.trim()) {
      setError("Descrição é obrigatória para compra manual.");
      return;
    }

    try {
      setSaving(true);
      await createManualExpense({
        amount: parsedAmount,
        paymentMethod: form.paymentMethod,
        description: form.description.trim(),
        notes: form.notes.trim() || undefined,
      });
      closeModal();
      await loadEntries();
      showSuccessToast(
        "Despesa registrada",
        "A compra manual foi adicionada ao fluxo de caixa.",
      );
    } catch (submitError) {
      setError(
        submitError?.response?.data?.message ||
          "Não foi possível salvar a despesa manual.",
      );
      setSaving(false);
    }
  };

  return (
    <AppShell activeSection="financeiro">
      <FinancePage>
        <ToastContainer />

        <PageHeader
          breadcrumb="Financeiro / Fluxo de Caixa"
          title="Fluxo de Caixa"
          actionLabel="Nova Compra / Despesa"
          actionIcon={<Plus size={18} />}
          onAction={openModal}
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

        <TransactionTable rows={loading ? [] : transactions} />

        {modalOpen ? (
          <ModalOverlay onClick={closeModal}>
            <Modal onClick={(event) => event.stopPropagation()}>
              <ModalTitle>Nova compra / despesa</ModalTitle>

              <Form onSubmit={handleSubmit}>
                <Split>
                  <Field>
                    Valor
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.amount}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          amount: event.target.value,
                        }))
                      }
                      placeholder="0,00"
                    />
                  </Field>

                  <Field>
                    Forma de pagamento
                    <Select
                      value={form.paymentMethod}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          paymentMethod: event.target.value,
                        }))
                      }
                    >
                      <option value="pix">Pix</option>
                      <option value="dinheiro">Dinheiro</option>
                      <option value="cartao_credito">Cartão de crédito</option>
                      <option value="cartao_debito">Cartão de débito</option>
                      <option value="transferencia">Transferência</option>
                      <option value="outro">Outro</option>
                    </Select>
                  </Field>
                </Split>

                <Field>
                  Descrição
                  <Input
                    value={form.description}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        description: event.target.value,
                      }))
                    }
                    placeholder="Ex: Compra de produtos"
                  />
                </Field>

                <Field>
                  Observações
                  <Textarea
                    value={form.notes}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        notes: event.target.value,
                      }))
                    }
                    placeholder="Detalhes opcionais da despesa"
                  />
                </Field>

                {error ? <ErrorText>{error}</ErrorText> : null}

                <ModalActions>
                  <GhostButton type="button" onClick={closeModal}>
                    Cancelar
                  </GhostButton>
                  <PrimaryButton type="submit" disabled={saving}>
                    {saving ? "Salvando..." : "Salvar despesa"}
                  </PrimaryButton>
                </ModalActions>
              </Form>
            </Modal>
          </ModalOverlay>
        ) : null}
      </FinancePage>
    </AppShell>
  );
}

export default Finance;
