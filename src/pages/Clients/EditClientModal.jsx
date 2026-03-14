import { useEffect, useState } from "react";
import { updateClient } from "../../services/clientsService";
import {
  CancelButton,
  ErrorMsg,
  Field,
  Form,
  Input,
  Label,
  Modal,
  ModalActions,
  ModalTitle,
  Overlay,
  SubmitButton,
  Textarea,
} from "./newClientModalStyled";

function EditClientModal({ client, onClose, onUpdated }) {
  const [form, setForm] = useState({
    name: client.name ?? "",
    phone: client.phone ?? "",
    description: client.description ?? "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      name: client.name ?? "",
      phone: client.phone ?? "",
      description: client.description ?? "",
    });
  }, [client]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Nome é obrigatório.");
    if (!form.phone.trim()) return setError("WhatsApp é obrigatório.");

    try {
      setSaving(true);
      await updateClient(client._id, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        description: form.description.trim() || undefined,
      });
      onUpdated();
    } catch (err) {
      setError(
        err?.response?.data?.message ?? "Erro ao atualizar. Tente novamente.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Editar Cliente</ModalTitle>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="edit-name">Nome *</Label>
            <Input
              id="edit-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoFocus
            />
          </Field>

          <Field>
            <Label htmlFor="edit-phone">WhatsApp *</Label>
            <Input
              id="edit-phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <Label htmlFor="edit-description">História / Observações</Label>
            <Textarea
              id="edit-description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Field>

          {error && <ErrorMsg>{error}</ErrorMsg>}

          <ModalActions>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </SubmitButton>
          </ModalActions>
        </Form>
      </Modal>
    </Overlay>
  );
}

export default EditClientModal;
