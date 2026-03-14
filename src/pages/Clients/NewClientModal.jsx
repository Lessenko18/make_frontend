import { useState } from "react";
import { createClient } from "../../services/clientsService";
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

const empty = { name: "", phone: "", description: "" };

function NewClientModal({ onClose, onCreated }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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
      await createClient({
        name: form.name.trim(),
        phone: form.phone.trim(),
        description: form.description.trim() || undefined,
      });
      onCreated();
    } catch (err) {
      setError(
        err?.response?.data?.message ?? "Erro ao cadastrar. Tente novamente.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Nova Cliente</ModalTitle>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Amanda Silva"
              value={form.name}
              onChange={handleChange}
              autoFocus
            />
          </Field>

          <Field>
            <Label htmlFor="phone">WhatsApp *</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="(11) 99999-0000"
              value={form.phone}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <Label htmlFor="description">História / Observações</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Preferências de make, alergias, notas..."
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
              {saving ? "Salvando..." : "Cadastrar"}
            </SubmitButton>
          </ModalActions>
        </Form>
      </Modal>
    </Overlay>
  );
}

export default NewClientModal;
