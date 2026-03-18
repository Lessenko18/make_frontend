import { useCallback, useEffect, useMemo, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { Plus } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useToast } from "../../components/common/useToast";
import { createClient, listClients } from "../../services/clientsService";
import {
  createAppointment,
  deleteAppointment,
  listAppointments,
  updateAppointment,
} from "../../services/appointmentsService";
import { listServices } from "../../services/servicesService";
import {
  Badge,
  CalendarCard,
  CalendarMeta,
  CalendarPage,
  ClientOption,
  DangerButton,
  ErrorText,
  Field,
  Form,
  GhostButton,
  Input,
  Modal,
  ModalActions,
  ModalOverlay,
  ModalTitle,
  PrimaryButton,
  Select,
  Split,
  SwitchRow,
  Textarea,
  CalendarContainer,
} from "./calendarStyled";

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

const statusLabel = {
  agendado: "Em aberto",
  concluido: "Concluído",
  pago: "Pago",
};

function Calendar({ title }) {
  const isAgendaPage = title?.toLowerCase() === "agenda";
  const {
    ToastContainer,
    error: showErrorToast,
    success: showSuccessToast,
  } = useToast();

  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [activeAppointment, setActiveAppointment] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    date: "",
    time: "09:00",
    serviceId: "",
    paymentMethod: "pix",
    notes: "",
    createNewClient: false,
    selectedClientId: "",
    searchClient: "",
    newClientName: "",
    newClientPhone: "",
    newClientDescription: "",
  });

  const filteredClients = useMemo(() => {
    const needle = form.searchClient.trim().toLowerCase();
    if (!needle) return clients;
    return clients.filter((client) =>
      client.name?.toLowerCase().includes(needle),
    );
  }, [clients, form.searchClient]);

  const resetForm = useCallback(
    (startDate = "") => {
      setForm({
        date: startDate,
        time: "09:00",
        serviceId: services[0]?._id ?? "",
        paymentMethod: "pix",
        notes: "",
        createNewClient: false,
        selectedClientId: clients[0]?._id ?? "",
        searchClient: "",
        newClientName: "",
        newClientPhone: "",
        newClientDescription: "",
      });
      setError("");
      setSaving(false);
    },
    [clients, services],
  );

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);

      const [appointmentsData, clientsData, servicesData] = await Promise.all([
        listAppointments(),
        listClients(),
        listServices(),
      ]);

      setAppointments(appointmentsData);
      setClients(clientsData);
      setServices(servicesData);
    } catch {
      setAppointments([]);
      setClients([]);
      setServices([]);
      showErrorToast("Agenda", "Não foi possível carregar os dados iniciais.");
    } finally {
      setLoading(false);
    }
  }, [showErrorToast]);

  useEffect(() => {
    if (!isAgendaPage) return;
    loadInitialData();
  }, [isAgendaPage, loadInitialData]);

  useEffect(() => {
    if (!form.serviceId && services.length) {
      setForm((prev) => ({ ...prev, serviceId: services[0]._id }));
    }
    if (!form.selectedClientId && clients.length && !form.createNewClient) {
      setForm((prev) => ({ ...prev, selectedClientId: clients[0]._id }));
    }
  }, [
    clients,
    services,
    form.serviceId,
    form.selectedClientId,
    form.createNewClient,
  ]);

  const calendarEvents = useMemo(() => {
    return appointments.map((item) => {
      const clientName = item.client?.name ?? "Cliente";
      const serviceName =
        item.service?.name ?? item.category?.name ?? "Serviço";
      const status = normalizeStatus(item.status);
      const value = Number(
        item.price ?? item.service?.valor ?? item.category?.valor ?? 0,
      );

      return {
        id: item._id,
        start: item.scheduledAt,
        title: `${clientName} - ${serviceName}`,
        classNames: [`event-status-${status}`],
        extendedProps: {
          raw: item,
          status,
          amountLabel: value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
        },
      };
    });
  }, [appointments]);

  const openCreateModal = useCallback(
    (dateStr) => {
      setMode("create");
      setActiveAppointment(null);
      resetForm(dateStr ?? new Date().toISOString().slice(0, 10));
      setModalOpen(true);
    },
    [resetForm],
  );

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setDeleteConfirmOpen(false);
    setActiveAppointment(null);
    setMode("create");
    setError("");
    setSaving(false);
  }, []);

  const handleDateClick = (info) => {
    openCreateModal(info.dateStr);
  };

  const handleEventClick = (info) => {
    const raw = info.event.extendedProps.raw;
    if (!raw) return;

    setMode("finalize");
    setActiveAppointment(raw);
    setForm((prev) => ({
      ...prev,
      paymentMethod: raw.paymentMethod ?? "pix",
      notes: raw.notes ?? "",
    }));
    setError("");
    setSaving(false);
    setModalOpen(true);
  };

  const resolveClientId = async () => {
    if (form.createNewClient) {
      if (!form.newClientName.trim()) {
        throw new Error("Informe o nome da cliente nova.");
      }
      if (!form.newClientPhone.trim()) {
        throw new Error("Informe o telefone da cliente nova.");
      }

      const newClient = await createClient({
        name: form.newClientName.trim(),
        phone: form.newClientPhone.trim(),
        description: form.newClientDescription.trim() || undefined,
      });

      return newClient._id;
    }

    if (!form.selectedClientId) {
      throw new Error("Selecione uma cliente cadastrada.");
    }

    return form.selectedClientId;
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.date) {
      setError("Selecione uma data.");
      return;
    }
    if (!form.time) {
      setError("Selecione o horário.");
      return;
    }
    if (!form.serviceId) {
      setError("Selecione o serviço.");
      return;
    }

    try {
      setSaving(true);
      const clientId = await resolveClientId();

      const scheduledAt = new Date(`${form.date}T${form.time}:00`);

      await createAppointment({
        client: clientId,
        service: form.serviceId,
        scheduledAt: scheduledAt.toISOString(),
        paymentMethod: form.paymentMethod,
        notes: form.notes.trim() || undefined,
      });

      closeModal();
      await loadInitialData();
      showSuccessToast(
        "Agendamento criado",
        "O novo horário foi salvo na agenda.",
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ??
          err?.message ??
          "Erro ao criar agendamento.",
      );
      setSaving(false);
    }
  };

  const handleFinalize = async (status) => {
    if (!activeAppointment?._id) return;

    const currentStatus = normalizeStatus(activeAppointment.status);
    if (currentStatus === "pago") {
      setError("Este atendimento já foi pago e está encerrado.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        status,
        notes: form.notes.trim() || undefined,
      };

      if (status === "pago") {
        payload.paymentMethod = form.paymentMethod;
      }

      await updateAppointment(activeAppointment._id, payload);

      closeModal();
      await loadInitialData();
      showSuccessToast(
        "Atendimento atualizado",
        status === "pago"
          ? "O atendimento foi marcado como pago."
          : "O atendimento foi marcado como concluído.",
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ?? "Erro ao finalizar atendimento.",
      );
      setSaving(false);
    }
  };

  const requestDelete = () => {
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!activeAppointment?._id) return;

    try {
      setSaving(true);
      setError("");
      await deleteAppointment(activeAppointment._id);
      closeModal();
      await loadInitialData();
      showSuccessToast(
        "Agendamento removido",
        "O evento foi excluído da agenda.",
      );
    } catch (err) {
      setError(err?.response?.data?.message ?? "Erro ao excluir agendamento.");
      setSaving(false);
    } finally {
      setDeleteConfirmOpen(false);
    }
  };

  return (
    <AppShell activeSection={title?.toLowerCase()}>
      <CalendarPage>
        <ToastContainer />

        <PageHeader
          breadcrumb="Agenda"
          title="Agenda de Atendimentos"
          actionLabel="Novo Agendamento"
          actionIcon={<Plus size={18} />}
          onAction={() => openCreateModal()}
        />

        {isAgendaPage ? (
          <CalendarCard>
            <CalendarMeta>
              Clique em um dia para agendar ou em um evento para finalizar como
              concluído/pago.
            </CalendarMeta>

            <CalendarContainer>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                locale={ptBrLocale}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                selectable
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                events={calendarEvents}
                height="auto"
              />
            </CalendarContainer>
          </CalendarCard>
        ) : null}

        {loading ? <CalendarMeta>Carregando agenda...</CalendarMeta> : null}

        {modalOpen && mode === "create" ? (
          <ModalOverlay onClick={closeModal}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <ModalTitle>Novo Agendamento</ModalTitle>

              <Form onSubmit={handleCreateAppointment}>
                <SwitchRow>
                  <label>
                    <input
                      type="checkbox"
                      checked={form.createNewClient}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          createNewClient: e.target.checked,
                        }))
                      }
                    />
                    Cadastrar cliente nova neste agendamento
                  </label>
                </SwitchRow>

                {!form.createNewClient ? (
                  <>
                    <Field>
                      Buscar cliente
                      <Input
                        value={form.searchClient}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            searchClient: e.target.value,
                          }))
                        }
                        placeholder="Digite o nome da cliente"
                      />
                    </Field>

                    <Field>
                      Cliente cadastrada
                      <Select
                        value={form.selectedClientId}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            selectedClientId: e.target.value,
                          }))
                        }
                      >
                        {filteredClients.map((client) => (
                          <option key={client._id} value={client._id}>
                            {client.name} - {client.phone}
                          </option>
                        ))}
                      </Select>
                    </Field>

                    {!filteredClients.length ? (
                      <ClientOption>
                        Nenhuma cliente encontrada pela busca. Marque a opção
                        acima para cadastrar nova.
                      </ClientOption>
                    ) : null}
                  </>
                ) : (
                  <>
                    <Field>
                      Nome da cliente
                      <Input
                        value={form.newClientName}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            newClientName: e.target.value,
                          }))
                        }
                        placeholder="Ex: Júlia Meurer"
                      />
                    </Field>

                    <Split>
                      <Field>
                        Telefone
                        <Input
                          value={form.newClientPhone}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              newClientPhone: e.target.value,
                            }))
                          }
                          placeholder="(11) 99999-9999"
                        />
                      </Field>

                      <Field>
                        Observação da cliente (opcional)
                        <Input
                          value={form.newClientDescription}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              newClientDescription: e.target.value,
                            }))
                          }
                          placeholder="Alergia, preferências..."
                        />
                      </Field>
                    </Split>
                  </>
                )}

                <Split>
                  <Field>
                    Data
                    <Input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, date: e.target.value }))
                      }
                    />
                  </Field>

                  <Field>
                    Horário
                    <Input
                      type="time"
                      value={form.time}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, time: e.target.value }))
                      }
                    />
                  </Field>
                </Split>

                <Field>
                  Serviço (categoria)
                  <Select
                    value={form.serviceId}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        serviceId: e.target.value,
                      }))
                    }
                  >
                    {services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.name} -{" "}
                        {Number(service.valor).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field>
                  OBS (opcional)
                  <Textarea
                    value={form.notes}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    placeholder="Informações importantes do atendimento"
                  />
                </Field>

                {error ? <ErrorText>{error}</ErrorText> : null}

                <ModalActions>
                  <GhostButton type="button" onClick={closeModal}>
                    Cancelar
                  </GhostButton>
                  <PrimaryButton type="submit" disabled={saving}>
                    {saving ? "Salvando..." : "Salvar agendamento"}
                  </PrimaryButton>
                </ModalActions>
              </Form>
            </Modal>
          </ModalOverlay>
        ) : null}

        {modalOpen && mode === "finalize" && activeAppointment ? (
          <ModalOverlay onClick={closeModal}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <ModalTitle>Finalizar Atendimento</ModalTitle>

              {(() => {
                const activeStatus = normalizeStatus(activeAppointment.status);
                const isPaid = activeStatus === "pago";

                return (
                  <Form onSubmit={(e) => e.preventDefault()}>
                    <CalendarMeta>
                      {activeAppointment.client?.name} -{" "}
                      {activeAppointment.service?.name ??
                        activeAppointment.category?.name}
                    </CalendarMeta>

                    <Badge className={`status-badge status-${activeStatus}`}>
                      Status: {statusLabel[activeStatus]}
                    </Badge>

                    <Badge>
                      Valor:{" "}
                      {Number(
                        activeAppointment.price ??
                          activeAppointment.service?.valor ??
                          activeAppointment.category?.valor ??
                          0,
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Badge>

                    <Field>
                      Forma de pagamento
                      <Select
                        value={form.paymentMethod}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            paymentMethod: e.target.value,
                          }))
                        }
                        disabled={isPaid}
                      >
                        <option value="pix">Pix</option>
                        <option value="dinheiro">Dinheiro</option>
                        <option value="cartao_credito">
                          Cartão de crédito
                        </option>
                        <option value="cartao_debito">Cartão de débito</option>
                        <option value="transferencia">Transferência</option>
                        <option value="outro">Outro</option>
                      </Select>
                    </Field>

                    <Field>
                      OBS (opcional)
                      <Textarea
                        value={form.notes}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        disabled={isPaid}
                      />
                    </Field>

                    {isPaid ? (
                      <CalendarMeta>
                        Atendimento encerrado. Após pago, não é possível alterar
                        o status.
                      </CalendarMeta>
                    ) : null}

                    {error ? <ErrorText>{error}</ErrorText> : null}

                    <ModalActions>
                      {!isPaid ? (
                        <DangerButton
                          type="button"
                          onClick={requestDelete}
                          disabled={saving}
                        >
                          {saving ? "Processando..." : "Excluir agendamento"}
                        </DangerButton>
                      ) : null}
                      <GhostButton type="button" onClick={closeModal}>
                        Fechar
                      </GhostButton>
                      {!isPaid ? (
                        <PrimaryButton
                          type="button"
                          onClick={() => handleFinalize("concluido")}
                          disabled={saving}
                        >
                          {saving ? "Processando..." : "Marcar Concluído"}
                        </PrimaryButton>
                      ) : null}
                      {!isPaid ? (
                        <PrimaryButton
                          type="button"
                          onClick={() => handleFinalize("pago")}
                          disabled={saving}
                        >
                          {saving ? "Processando..." : "Marcar Pago"}
                        </PrimaryButton>
                      ) : null}
                    </ModalActions>
                  </Form>
                );
              })()}
            </Modal>
          </ModalOverlay>
        ) : null}

        <ConfirmDialog
          open={deleteConfirmOpen}
          title="Excluir agendamento"
          message="Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita."
          confirmLabel="Excluir agendamento"
          isLoading={saving}
          onCancel={() => setDeleteConfirmOpen(false)}
          onConfirm={handleDelete}
        />
      </CalendarPage>
    </AppShell>
  );
}

export default Calendar;
