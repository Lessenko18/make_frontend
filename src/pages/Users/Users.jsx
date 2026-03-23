import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PageHeader from "../../components/common/PageHeader";
import { useToast } from "../../components/common/useToast";
import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
} from "../../services/usersService";
import {
  Actions,
  Empty,
  Form,
  FormActions,
  GhostButton,
  IconButton,
  Input,
  Label,
  MobileCard,
  MobileEmail,
  MobileList,
  MobileName,
  ModalCard,
  ModalOverlay,
  ModalTitle,
  Panel,
  PrimaryButton,
  Table,
  Td,
  Th,
  Tr,
  UsersPage,
} from "./usersStyled";

const EMPTY_FORM = {
  name: "",
  email: "",
  password: "",
};

function Users() {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const title = useMemo(() => {
    return modalMode === "edit" ? "Editar usuário" : "Novo usuário";
  }, [modalMode]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await listUsers();
      setUsers(data);
    } catch {
      setUsers([]);
      toast.error("Erro", "Não foi possível carregar usuários.");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const closeModal = () => {
    setModalMode(null);
    setEditingUser(null);
    setForm(EMPTY_FORM);
  };

  const openCreate = () => {
    setModalMode("create");
    setEditingUser(null);
    setForm(EMPTY_FORM);
  };

  const openEdit = (user) => {
    setModalMode("edit");
    setEditingUser(user);
    setForm({ name: user.name || "", email: user.email || "", password: "" });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.name ||
      !form.email ||
      (modalMode === "create" && !form.password)
    ) {
      toast.error("Campos obrigatórios", "Preencha nome, e-mail e senha.");
      return;
    }

    try {
      setSubmitting(true);

      if (modalMode === "create") {
        await createUser(form);
        toast.success("Usuário criado", "Novo usuário cadastrado com sucesso.");
      } else if (modalMode === "edit" && editingUser?.id) {
        const payload = {
          name: form.name,
          email: form.email,
          ...(form.password ? { password: form.password } : {}),
        };
        await updateUser(editingUser.id, payload);
        toast.success("Usuário atualizado", "Dados atualizados com sucesso.");
      }

      closeModal();
      await fetchUsers();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Não foi possível salvar usuário.";
      toast.error("Erro", message);
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async () => {
    if (!deleteTarget?.id) return;

    try {
      await deleteUser(deleteTarget.id);
      setDeleteTarget(null);
      toast.success("Usuário removido", "Registro excluído com sucesso.");
      await fetchUsers();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Não foi possível excluir usuário.";
      toast.error("Erro", message);
    }
  };

  return (
    <AppShell activeSection="usuarios">
      <UsersPage>
        <PageHeader
          breadcrumb="Configurações / Usuários"
          title="Gerenciar Usuários"
          actionLabel="Novo Usuário"
          actionIcon={<Plus size={16} />}
          onAction={openCreate}
        />

        <Panel>
          {loading ? <Empty>Carregando usuários...</Empty> : null}

          {!loading && !users.length ? (
            <Empty>Nenhum usuário cadastrado até o momento.</Empty>
          ) : null}

          {!loading && users.length ? (
            <>
              <Table>
                <thead>
                  <tr>
                    <Th>Nome</Th>
                    <Th>E-mail</Th>
                    <Th style={{ width: 120 }}>Ações</Th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <Tr key={user.id}>
                      <Td>{user.name}</Td>
                      <Td>{user.email}</Td>
                      <Td>
                        <Actions>
                          <IconButton
                            type="button"
                            aria-label="Editar usuário"
                            onClick={() => openEdit(user)}
                          >
                            <Pencil size={16} />
                          </IconButton>
                          <IconButton
                            type="button"
                            aria-label="Excluir usuário"
                            onClick={() =>
                              setDeleteTarget({ id: user.id, name: user.name })
                            }
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        </Actions>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>

              <MobileList>
                {users.map((user) => (
                  <MobileCard key={user.id}>
                    <MobileName>{user.name}</MobileName>
                    <MobileEmail>{user.email}</MobileEmail>
                    <Actions>
                      <IconButton
                        type="button"
                        aria-label="Editar usuário"
                        onClick={() => openEdit(user)}
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton
                        type="button"
                        aria-label="Excluir usuário"
                        onClick={() =>
                          setDeleteTarget({ id: user.id, name: user.name })
                        }
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Actions>
                  </MobileCard>
                ))}
              </MobileList>
            </>
          ) : null}
        </Panel>
      </UsersPage>

      {modalMode ? (
        <ModalOverlay onClick={closeModal}>
          <ModalCard onClick={(event) => event.stopPropagation()}>
            <ModalTitle>{title}</ModalTitle>

            <Form onSubmit={onSubmit}>
              <Label>
                Nome
                <Input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Nome do usuário"
                  required
                />
              </Label>

              <Label>
                E-mail
                <Input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  placeholder="email@dominio.com"
                  required
                />
              </Label>

              <Label>
                Senha {modalMode === "edit" ? "(opcional)" : ""}
                <Input
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  placeholder={
                    modalMode === "edit"
                      ? "Preencha apenas se quiser trocar"
                      : "Senha"
                  }
                  required={modalMode === "create"}
                />
              </Label>

              <FormActions>
                <GhostButton type="button" onClick={closeModal}>
                  Cancelar
                </GhostButton>
                <PrimaryButton type="submit" disabled={submitting}>
                  {submitting
                    ? "Salvando..."
                    : modalMode === "edit"
                      ? "Salvar"
                      : "Cadastrar"}
                </PrimaryButton>
              </FormActions>
            </Form>
          </ModalCard>
        </ModalOverlay>
      ) : null}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Excluir usuário"
        message={`Deseja realmente excluir ${deleteTarget?.name || "este usuário"}?`}
        confirmLabel="Excluir"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={onDelete}
      />

      <toast.ToastContainer />
    </AppShell>
  );
}

export default Users;
