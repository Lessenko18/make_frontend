import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PageHeader from "../../components/common/PageHeader";
import NewClientModal from "./NewClientModal";
import EditClientModal from "./EditClientModal";
import {
  ActionCell,
  AddPhotoBtn,
  Avatar,
  AvatarOverlay,
  AvatarPlaceholder,
  AvatarWrapper,
  ClientName,
  ClientsPage,
  ContentGrid,
  DetailLabel,
  DetailPanel,
  DetailSection,
  DetailText,
  EmptyPanel,
  EmptyRow,
  GalleryHeader,
  HistoryItem,
  HistoryList,
  IconBtn,
  LightboxClose,
  LightboxImg,
  LightboxNavBtn,
  LightboxOverlay,
  MobileClientActions,
  MobileClientCard,
  MobileClientHeader,
  MobileClientList,
  MobileClientMeta,
  MobileClientName,
  PaginationButton,
  PaginationInfo,
  PaginationWrap,
  PhotoDeleteBtn,
  PhotoGrid,
  PhotoThumb,
  PhotoThumbWrapper,
  SearchIcon,
  SearchInput,
  SearchWrapper,
  Table,
  TableCard,
  Td,
  Th,
  Tr,
} from "./clientsStyled";
import {
  deleteClient,
  deleteGalleryPhoto,
  getClient,
  listClients,
  uploadGalleryPhotos,
  uploadProfilePhoto,
} from "../../services/clientsService";
import {
  getClientHistory,
  listAppointments,
} from "../../services/appointmentsService";

const normalizeStatus = (status) => {
  const value = String(status || "agendado")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (value === "pago") return "encerrado";
  if (value === "concluido") return "encerrado";
  if (value === "encerrado") return "encerrado";
  return "agendado";
};

const isFinishedStatus = (status) => normalizeStatus(status) === "encerrado";

const toComparableId = (value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (typeof value === "object") {
    if (value._id !== undefined && value._id !== null) return String(value._id);
    if (value.id !== undefined && value.id !== null) return String(value.id);
  }

  return null;
};

const getClientIdFromAppointment = (appointment) =>
  toComparableId(
    appointment?.client?._id ??
      appointment?.client?.id ??
      appointment?.clientId ??
      appointment?.client_id ??
      appointment?.cliente?._id ??
      appointment?.cliente?.id ??
      appointment?.cliente ??
      appointment?.client ??
      null,
  );

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const getAppointmentAmount = (appointment) => {
  const rawValue =
    appointment?.price ??
    appointment?.amount ??
    appointment?.value ??
    appointment?.service?.valor ??
    appointment?.service?.price ??
    appointment?.category?.valor ??
    appointment?.category?.price ??
    0;

  const amount = Number(rawValue);
  return Number.isFinite(amount) ? amount : 0;
};

const formatCurrency = (value) => currencyFormatter.format(Number(value) || 0);

const formatProcedureLabel = (appointment) => {
  const serviceName =
    appointment?.service?.name ||
    appointment?.category?.name ||
    appointment?.serviceName ||
    "Serviço";
  const date = appointment?.scheduledAt
    ? new Date(appointment.scheduledAt).toLocaleDateString("pt-BR")
    : "Sem data";
  return `${serviceName} - ${date}`;
};

const CLIENTS_PER_PAGE = 10;

function Clients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const profileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) =>
          Math.min(i + 1, (detail?.photos?.length ?? 1) - 1),
        );
      if (e.key === "ArrowLeft") setLightboxIndex((i) => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, detail?.photos?.length]);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const [clientsData, appointmentsData] = await Promise.all([
        listClients(),
        listAppointments(),
      ]);

      setClients(clientsData);
      setAppointments(appointmentsData);
    } catch {
      setClients([]);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const proceduresByClient = useMemo(() => {
    const now = Date.now();
    const map = new Map();

    appointments.forEach((appointment) => {
      const clientId = getClientIdFromAppointment(appointment);
      if (!clientId) return;

      const when = new Date(appointment.scheduledAt).getTime();
      if (!Number.isFinite(when)) return;

      const status = normalizeStatus(appointment.status);
      const current = map.get(clientId) || {
        lastProcedure: null,
        nextProcedure: null,
      };

      if (
        status === "encerrado" &&
        when <= now &&
        (!current.lastProcedure ||
          new Date(current.lastProcedure.scheduledAt).getTime() < when)
      ) {
        current.lastProcedure = appointment;
      }

      if (
        status !== "encerrado" &&
        when >= now &&
        (!current.nextProcedure ||
          new Date(current.nextProcedure.scheduledAt).getTime() > when)
      ) {
        current.nextProcedure = appointment;
      }

      map.set(clientId, current);
    });

    return map;
  }, [appointments]);

  const selectedClientId = useMemo(
    () => toComparableId(detail?._id ?? detail?.id),
    [detail?._id, detail?.id],
  );

  const selectedProcedures = useMemo(() => {
    if (!selectedClientId) return null;
    return proceduresByClient.get(selectedClientId) || null;
  }, [proceduresByClient, selectedClientId]);

  const completedHistory = useMemo(() => {
    if (!selectedClientId) return [];

    const historyFromApi = (detail.history || []).filter((item) =>
      isFinishedStatus(item?.status),
    );

    const historyFromAppointments = appointments.filter((item) => {
      const clientId = getClientIdFromAppointment(item);
      return clientId === selectedClientId && isFinishedStatus(item?.status);
    });

    const merged = new Map();

    [...historyFromApi, ...historyFromAppointments].forEach((item) => {
      const fallbackKey = `${item?.scheduledAt || "sem-data"}-${item?.service?._id || item?.category?._id || item?.serviceName || "servico"}`;
      const key = item?._id || fallbackKey;
      if (!merged.has(key)) {
        merged.set(key, item);
      }
    });

    return Array.from(merged.values()).sort((a, b) => {
      const dateA = new Date(a?.scheduledAt || 0).getTime();
      const dateB = new Date(b?.scheduledAt || 0).getTime();
      return dateB - dateA;
    });
  }, [appointments, detail?.history, selectedClientId]);

  const completedHistoryTotal = useMemo(
    () =>
      completedHistory.reduce(
        (total, item) => total + getAppointmentAmount(item),
        0,
      ),
    [completedHistory],
  );

  async function handleSelectClient(client) {
    setSelected(client._id);
    setHistoryLoading(true);

    try {
      const [clientData, historyData] = await Promise.all([
        getClient(client._id),
        getClientHistory(client._id),
      ]);

      const history = Array.isArray(historyData)
        ? historyData
        : historyData?.appointments || historyData?.history || [];

      setDetail({
        ...clientData,
        history,
      });
    } catch {
      setDetail(client);
    } finally {
      setHistoryLoading(false);
    }
  }

  const filtered = useMemo(
    () =>
      clients.filter((c) =>
        c.name?.toLowerCase().includes(search.toLowerCase()),
      ),
    [clients, search],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / CLIENTS_PER_PAGE));

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * CLIENTS_PER_PAGE;
    return filtered.slice(start, start + CLIENTS_PER_PAGE);
  }, [currentPage, filtered]);

  const pageRangeLabel = useMemo(() => {
    if (!filtered.length) return "0-0 de 0";
    const start = (currentPage - 1) * CLIENTS_PER_PAGE + 1;
    const end = Math.min(currentPage * CLIENTS_PER_PAGE, filtered.length);
    return `${start}-${end} de ${filtered.length}`;
  }, [currentPage, filtered.length]);

  function renderClientActions(client) {
    return (
      <>
        <IconBtn
          type="button"
          aria-label="Ver detalhes"
          onClick={(e) => {
            e.stopPropagation();
            handleSelectClient(client);
          }}
        >
          <Eye size={18} />
        </IconBtn>
        <IconBtn
          type="button"
          aria-label="Editar cliente"
          onClick={(e) => {
            e.stopPropagation();
            setEditClient(client);
          }}
        >
          <Pencil size={18} />
        </IconBtn>
        <IconBtn
          type="button"
          aria-label="Excluir cliente"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteConfirm({ id: client._id, name: client.name });
          }}
        >
          <Trash2 size={18} />
        </IconBtn>
      </>
    );
  }

  async function handleDelete() {
    if (!deleteConfirm?.id) return;

    try {
      await deleteClient(deleteConfirm.id);
      if (selected === deleteConfirm.id) {
        setSelected(null);
        setDetail(null);
      }
      setDeleteConfirm(null);
      await fetchClients();
    } catch {
      alert("Erro ao excluir. Tente novamente.");
    }
  }

  async function handleProfilePhotoChange(e) {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file || !selected) return;
    try {
      const data = await uploadProfilePhoto(selected, file);
      setDetail((prev) => ({ ...prev, profilePhoto: data.profilePhoto }));
    } catch {
      alert("Erro ao enviar foto de perfil.");
    }
  }

  async function handleGalleryAdd(e) {
    const files = Array.from(e.target.files);
    e.target.value = "";
    if (!files.length || !selected) return;
    try {
      const data = await uploadGalleryPhotos(selected, files);
      setDetail((prev) => ({ ...prev, photos: data.photos }));
    } catch {
      alert("Erro ao enviar fotos.");
    }
  }

  async function handleDeleteGalleryPhoto(url) {
    if (!selected) return;
    try {
      const data = await deleteGalleryPhoto(selected, url);
      setDetail((prev) => ({ ...prev, photos: data.photos }));
    } catch {
      alert("Erro ao remover foto.");
    }
  }

  return (
    <AppShell activeSection="clientes">
      <ClientsPage>
        <PageHeader
          breadcrumb="Clientes / Gestão"
          title="Clientes Cadastradas"
          actionLabel="Nova Cliente"
          actionIcon={<Plus size={18} />}
          onAction={() => setModalOpen(true)}
        />

        <SearchWrapper>
          <SearchIcon>
            <Search size={18} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchWrapper>

        <ContentGrid>
          <TableCard>
            <Table>
              <thead>
                <tr>
                  <Th>Nome</Th>
                  <Th>WhatsApp</Th>
                  <Th>Último Serviço</Th>
                  <Th>Próximo Serviço</Th>
                  <Th>Ações</Th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <EmptyRow>
                    <td colSpan={5}>Carregando...</td>
                  </EmptyRow>
                )}
                {!loading && !filtered.length && (
                  <EmptyRow>
                    <td colSpan={5}>Nenhuma cliente encontrada.</td>
                  </EmptyRow>
                )}
                {paginatedClients.map((client) => (
                  <Tr
                    key={client._id}
                    data-selected={selected === client._id ? "true" : "false"}
                    onClick={() => handleSelectClient(client)}
                  >
                    {(() => {
                      const clientId = toComparableId(client._id ?? client.id);
                      const procedures = clientId
                        ? proceduresByClient.get(clientId)
                        : null;

                      return (
                        <>
                          <Td>{client.name}</Td>
                          <Td>{client.phone}</Td>
                          <Td>
                            {procedures?.lastProcedure
                              ? formatProcedureLabel(procedures.lastProcedure)
                              : "—"}
                          </Td>
                          <Td>
                            {procedures?.nextProcedure
                              ? formatProcedureLabel(procedures.nextProcedure)
                              : "—"}
                          </Td>
                          <Td>
                            <ActionCell>
                              {renderClientActions(client)}
                            </ActionCell>
                          </Td>
                        </>
                      );
                    })()}
                  </Tr>
                ))}
              </tbody>
            </Table>

            <MobileClientList>
              {loading && (
                <MobileClientCard>
                  <MobileClientName>Carregando...</MobileClientName>
                </MobileClientCard>
              )}

              {!loading && !filtered.length && (
                <MobileClientCard>
                  <MobileClientName>
                    Nenhuma cliente encontrada.
                  </MobileClientName>
                </MobileClientCard>
              )}

              {!loading &&
                paginatedClients.map((client) => (
                  <MobileClientCard
                    key={client._id}
                    onClick={() => handleSelectClient(client)}
                  >
                    {(() => {
                      const clientId = toComparableId(client._id ?? client.id);
                      const procedures = clientId
                        ? proceduresByClient.get(clientId)
                        : null;

                      return (
                        <>
                          <MobileClientHeader>
                            <div>
                              <MobileClientName>{client.name}</MobileClientName>
                              <MobileClientMeta>
                                {client.phone || "Sem WhatsApp"}
                              </MobileClientMeta>
                              <MobileClientMeta>
                                Último:{" "}
                                {procedures?.lastProcedure
                                  ? formatProcedureLabel(
                                      procedures.lastProcedure,
                                    )
                                  : "—"}
                              </MobileClientMeta>
                              <MobileClientMeta>
                                Próximo:{" "}
                                {procedures?.nextProcedure
                                  ? formatProcedureLabel(
                                      procedures.nextProcedure,
                                    )
                                  : "—"}
                              </MobileClientMeta>
                            </div>
                            {selected === client._id ? (
                              <span>Selecionada</span>
                            ) : null}
                          </MobileClientHeader>

                          <MobileClientActions>
                            {renderClientActions(client)}
                          </MobileClientActions>
                        </>
                      );
                    })()}
                  </MobileClientCard>
                ))}
            </MobileClientList>

            {!loading && filtered.length > 0 ? (
              <PaginationWrap>
                <PaginationInfo>{pageRangeLabel}</PaginationInfo>
                <ActionCell>
                  <PaginationButton
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </PaginationButton>
                  <PaginationButton
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </PaginationButton>
                </ActionCell>
              </PaginationWrap>
            ) : null}
          </TableCard>

          <DetailPanel>
            {!detail ? (
              <EmptyPanel>
                <UserRound size={40} strokeWidth={1.4} />
                <span>Selecione uma cliente para ver os detalhes</span>
              </EmptyPanel>
            ) : (
              <>
                <AvatarWrapper onClick={() => profileInputRef.current?.click()}>
                  {detail.profilePhoto ? (
                    <Avatar src={detail.profilePhoto} alt={detail.name} />
                  ) : (
                    <AvatarPlaceholder>
                      <UserRound size={36} strokeWidth={1.4} />
                    </AvatarPlaceholder>
                  )}
                  <AvatarOverlay>
                    <Camera size={22} />
                  </AvatarOverlay>
                </AvatarWrapper>

                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: "none" }}
                  onChange={handleProfilePhotoChange}
                />
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleGalleryAdd}
                />

                <ClientName>{detail.name}</ClientName>

                {detail.description && (
                  <DetailSection>
                    <DetailLabel>História:</DetailLabel>
                    <DetailText>{detail.description}</DetailText>
                  </DetailSection>
                )}

                {selectedProcedures?.lastProcedure && (
                  <DetailSection>
                    <DetailLabel>Último serviço:</DetailLabel>
                    <DetailText>
                      {selectedProcedures.lastProcedure.service?.name ||
                        selectedProcedures.lastProcedure.category?.name}{" "}
                      -{" "}
                      {new Date(
                        selectedProcedures.lastProcedure.scheduledAt,
                      ).toLocaleDateString("pt-BR")}
                    </DetailText>
                  </DetailSection>
                )}

                {selectedProcedures?.nextProcedure && (
                  <DetailSection>
                    <DetailLabel>Próximo serviço:</DetailLabel>
                    <DetailText>
                      {selectedProcedures.nextProcedure.service?.name ||
                        selectedProcedures.nextProcedure.category?.name}{" "}
                      -{" "}
                      {new Date(
                        selectedProcedures.nextProcedure.scheduledAt,
                      ).toLocaleDateString("pt-BR")}
                    </DetailText>
                  </DetailSection>
                )}

                <DetailSection>
                  <DetailLabel>Histórico de serviços:</DetailLabel>
                  {historyLoading ? (
                    <DetailText>Carregando histórico...</DetailText>
                  ) : completedHistory.length ? (
                    <HistoryList>
                      {completedHistory.map((item) => {
                        const amount = getAppointmentAmount(item);
                        return (
                          <HistoryItem
                            key={
                              item._id ||
                              `${item.scheduledAt}-${item.service?._id || item.category?._id || item.serviceName}`
                            }
                          >
                            <strong>
                              {item.service?.name ||
                                item.category?.name ||
                                item.serviceName ||
                                "Serviço"}
                            </strong>{" "}
                            -{" "}
                            {item.scheduledAt
                              ? new Date(item.scheduledAt).toLocaleDateString(
                                  "pt-BR",
                                )
                              : "Sem data"}{" "}
                            - {formatCurrency(amount)}
                          </HistoryItem>
                        );
                      })}
                    </HistoryList>
                  ) : (
                    <DetailText>Nenhum serviço no histórico.</DetailText>
                  )}
                  {!historyLoading && completedHistory.length ? (
                    <DetailText style={{ marginTop: 8, fontWeight: 700 }}>
                      Total de procedimentos:{" "}
                      {formatCurrency(completedHistoryTotal)}
                    </DetailText>
                  ) : null}
                </DetailSection>

                <DetailSection>
                  <GalleryHeader>
                    <DetailLabel style={{ margin: 0 }}>Makeups:</DetailLabel>
                    <AddPhotoBtn
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                    >
                      <Plus size={12} />
                      Adicionar
                    </AddPhotoBtn>
                  </GalleryHeader>
                  {detail.photos?.length > 0 ? (
                    <PhotoGrid>
                      {detail.photos.map((url, i) => (
                        <PhotoThumbWrapper
                          key={i}
                          onClick={() => setLightboxIndex(i)}
                        >
                          <PhotoThumb src={url} alt={`foto ${i + 1}`} />
                          <PhotoDeleteBtn
                            type="button"
                            aria-label="Remover foto"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteGalleryPhoto(url);
                            }}
                          >
                            <X size={12} />
                          </PhotoDeleteBtn>
                        </PhotoThumbWrapper>
                      ))}
                    </PhotoGrid>
                  ) : (
                    <DetailText>Nenhuma foto ainda.</DetailText>
                  )}
                </DetailSection>
              </>
            )}
          </DetailPanel>
        </ContentGrid>

        {modalOpen && (
          <NewClientModal
            onClose={() => setModalOpen(false)}
            onCreated={() => {
              setModalOpen(false);
              fetchClients();
            }}
          />
        )}

        {editClient && (
          <EditClientModal
            client={editClient}
            onClose={() => setEditClient(null)}
            onUpdated={() => {
              setEditClient(null);
              fetchClients();
              if (selected === editClient._id) {
                getClient(editClient._id)
                  .then(setDetail)
                  .catch(() => {});
              }
            }}
          />
        )}

        {lightboxIndex !== null && detail?.photos?.[lightboxIndex] && (
          <LightboxOverlay onClick={() => setLightboxIndex(null)}>
            <LightboxClose
              type="button"
              aria-label="Fechar"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={20} />
            </LightboxClose>

            {detail.photos.length > 1 && (
              <LightboxNavBtn
                $side="left"
                type="button"
                aria-label="Anterior"
                disabled={lightboxIndex === 0}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => i - 1);
                }}
              >
                <ChevronLeft size={24} />
              </LightboxNavBtn>
            )}

            <LightboxImg
              src={detail.photos[lightboxIndex]}
              alt={`foto ${lightboxIndex + 1}`}
              onClick={(e) => e.stopPropagation()}
            />

            {detail.photos.length > 1 && (
              <LightboxNavBtn
                $side="right"
                type="button"
                aria-label="Próxima"
                disabled={lightboxIndex === detail.photos.length - 1}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => i + 1);
                }}
              >
                <ChevronRight size={24} />
              </LightboxNavBtn>
            )}
          </LightboxOverlay>
        )}

        <ConfirmDialog
          open={Boolean(deleteConfirm)}
          title="Excluir cliente"
          message={`Tem certeza que deseja excluir ${deleteConfirm?.name || "esta cliente"}? Esta ação não pode ser desfeita.`}
          confirmLabel="Excluir cliente"
          onCancel={() => setDeleteConfirm(null)}
          onConfirm={handleDelete}
        />
      </ClientsPage>
    </AppShell>
  );
}

export default Clients;
