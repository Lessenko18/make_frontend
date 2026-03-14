import { useCallback, useEffect, useRef, useState } from "react";
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
  IconBtn,
  LightboxClose,
  LightboxImg,
  LightboxNavBtn,
  LightboxOverlay,
  NewClientButton,
  PageTitle,
  PageTop,
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

function Clients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [loading, setLoading] = useState(true);

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
      const data = await listClients();
      setClients(data);
    } catch {
      setClients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  async function handleSelectClient(client) {
    setSelected(client._id);
    try {
      const data = await getClient(client._id);
      setDetail(data);
    } catch {
      setDetail(client);
    }
  }

  const filtered = clients.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleDelete(e, id) {
    e.stopPropagation();
    if (!window.confirm("Excluir esta cliente?")) return;
    try {
      await deleteClient(id);
      if (selected === id) {
        setSelected(null);
        setDetail(null);
      }
      fetchClients();
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
        <PageTop>
          <PageTitle>Clientes Cadastradas</PageTitle>
          <NewClientButton type="button" onClick={() => setModalOpen(true)}>
            <Plus size={18} />
            Nova Cliente
          </NewClientButton>
        </PageTop>

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
                {filtered.map((client) => (
                  <Tr
                    key={client._id}
                    data-selected={selected === client._id ? "true" : "false"}
                    onClick={() => handleSelectClient(client)}
                  >
                    <Td>{client.name}</Td>
                    <Td>{client.phone}</Td>
                    <Td>—</Td>
                    <Td>
                      <ActionCell>
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
                          onClick={(e) => handleDelete(e, client._id)}
                        >
                          <Trash2 size={18} />
                        </IconBtn>
                      </ActionCell>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
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

                {detail.procedures?.lastProcedure && (
                  <DetailSection>
                    <DetailLabel>Último serviço:</DetailLabel>
                    <DetailText>
                      {detail.procedures.lastProcedure.category?.name} —{" "}
                      {new Date(
                        detail.procedures.lastProcedure.scheduledAt,
                      ).toLocaleDateString("pt-BR")}
                    </DetailText>
                  </DetailSection>
                )}

                {detail.procedures?.nextProcedure && (
                  <DetailSection>
                    <DetailLabel>Próximo serviço:</DetailLabel>
                    <DetailText>
                      {detail.procedures.nextProcedure.category?.name} —{" "}
                      {new Date(
                        detail.procedures.nextProcedure.scheduledAt,
                      ).toLocaleDateString("pt-BR")}
                    </DetailText>
                  </DetailSection>
                )}

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
      </ClientsPage>
    </AppShell>
  );
}

export default Clients;
