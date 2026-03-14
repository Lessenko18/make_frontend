import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
});

export async function listClients() {
  const { data } = await api.get("/clients");
  return data;
}

export async function getClient(id) {
  const { data } = await api.get(`/clients/${id}`);
  return data;
}

export async function createClient(payload) {
  const { data } = await api.post("/clients", payload);
  return data;
}

export async function updateClient(id, payload) {
  const { data } = await api.patch(`/clients/${id}`, payload);
  return data;
}

export async function deleteClient(id) {
  await api.delete(`/clients/${id}`);
}

export async function uploadProfilePhoto(id, file) {
  const form = new FormData();
  form.append("photo", file);
  const { data } = await api.patch(`/clients/${id}/profile-photo`, form);
  return data;
}

export async function uploadGalleryPhotos(id, files) {
  const form = new FormData();
  files.forEach((f) => form.append("photos", f));
  const { data } = await api.post(`/clients/${id}/photos`, form);
  return data;
}

export async function deleteGalleryPhoto(id, url) {
  const { data } = await api.delete(`/clients/${id}/photos`, { data: { url } });
  return data;
}
