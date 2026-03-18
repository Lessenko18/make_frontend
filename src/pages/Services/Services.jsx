import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import {
  createService,
  deleteService,
  listServices,
  updateService,
} from "../../services/servicesService";
import {
  Actions,
  Card,
  EmptyState,
  ErrorText,
  Field,
  Form,
  GhostButton,
  IconButton,
  Input,
  Modal,
  ModalActions,
  MobileActions,
  MobileCard,
  MobileList,
  MobilePrice,
  MobileTitle,
  ModalOverlay,
  ModalTitle,
  PrimaryButton,
  ServicesPage,
  Table,
  Td,
  Th,
} from "./servicesStyled";

const emptyForm = { name: "", valor: "" };

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const modalTitle = useMemo(
    () => (editing ? "Editar Serviço" : "Novo Serviço"),
    [editing],
  );

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await listServices();
      setServices(data);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  function openNewModal() {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  }

  function openEditModal(service) {
    setEditing(service);
    setForm({
      name: service.name ?? "",
      valor: String(service.valor ?? ""),
    });
    setError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSaving(false);
    setError("");
    setEditing(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Nome do serviço é obrigatório.");
      return;
    }

    const parsedValue = Number(form.valor);
    if (Number.isNaN(parsedValue) || parsedValue < 0) {
      setError("Informe um valor válido.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: form.name.trim(),
        valor: parsedValue,
      };

      if (editing?._id) {
        await updateService(editing._id, payload);
      } else {
        await createService(payload);
      }

      closeModal();
      await fetchServices();
    } catch (err) {
      setError(
        err?.response?.data?.message ?? "Não foi possível salvar o serviço.",
      );
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteConfirm?._id) return;

    try {
      await deleteService(deleteConfirm._id);
      setDeleteConfirm(null);
      await fetchServices();
    } catch {
      window.alert("Não foi possível excluir o serviço.");
    }
  }

  return (
    <AppShell activeSection="servicos">
      <ServicesPage>
        <PageHeader
          breadcrumb="Serviços"
          title="Cadastro de Serviços"
          actionLabel="Novo Serviço"
          actionIcon={<Plus size={18} />}
          onAction={openNewModal}
        />

        <Card>
          {loading ? (
            <EmptyState>Carregando serviços...</EmptyState>
          ) : !services.length ? (
            <EmptyState>
              Nenhum serviço cadastrado. Clique em "Novo Serviço" para criar.
            </EmptyState>
          ) : (
            <>
              <Table>
                <thead>
                  <tr>
                    <Th>Serviço</Th>
                    <Th>Valor padrão</Th>
                    <Th>Ações</Th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service._id}>
                      <Td>{service.name}</Td>
                      <Td>
                        {Number(service.valor).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Td>
                      <Td>
                        <Actions>
                          <IconButton
                            type="button"
                            onClick={() => openEditModal(service)}
                            aria-label="Editar serviço"
                          >
                            <Pencil size={16} />
                          </IconButton>
                          <IconButton
                            type="button"
                            onClick={() => setDeleteConfirm(service)}
                            aria-label="Excluir serviço"
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        </Actions>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <MobileList>
                {services.map((service) => (
                  <MobileCard key={service._id}>
                    <MobileTitle>{service.name}</MobileTitle>
                    <MobilePrice>
                      {Number(service.valor).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </MobilePrice>

                    <MobileActions>
                      <IconButton
                        type="button"
                        onClick={() => openEditModal(service)}
                        aria-label="Editar serviço"
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton
                        type="button"
                        onClick={() => setDeleteConfirm(service)}
                        aria-label="Excluir serviço"
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </MobileActions>
                  </MobileCard>
                ))}
              </MobileList>
            </>
          )}
        </Card>

        {modalOpen && (
          <ModalOverlay onClick={closeModal}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <ModalTitle>{modalTitle}</ModalTitle>

              <Form onSubmit={handleSubmit}>
                <Field>
                  Nome do serviço
                  <Input
                    name="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Ex: Make social"
                    autoFocus
                  />
                </Field>

                <Field>
                  Valor padrão
                  <Input
                    name="valor"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.valor}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, valor: e.target.value }))
                    }
                    placeholder="100"
                  />
                </Field>

                {error ? <ErrorText>{error}</ErrorText> : null}

                <ModalActions>
                  <GhostButton type="button" onClick={closeModal}>
                    Cancelar
                  </GhostButton>
                  <PrimaryButton type="submit" disabled={saving}>
                    {saving ? "Salvando..." : "Salvar"}
                  </PrimaryButton>
                </ModalActions>
              </Form>
            </Modal>
          </ModalOverlay>
        )}

        <ConfirmDialog
          open={Boolean(deleteConfirm)}
          title="Excluir serviço"
          message={`Tem certeza que deseja excluir o serviço ${deleteConfirm?.name || "selecionado"}? Esta ação não pode ser desfeita.`}
          confirmLabel="Excluir serviço"
          onCancel={() => setDeleteConfirm(null)}
          onConfirm={handleDelete}
        />
      </ServicesPage>
    </AppShell>
  );
}

export default Services;
