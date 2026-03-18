import api from "./api";
import {
  clearCachedValue,
  getCachedValue,
  setCachedValue,
} from "./requestCache";

const CLIENTS_CACHE_KEY = "clients:list";
const CACHE_TTL_MS = 15000;

export async function listClients() {
  const cached = getCachedValue(CLIENTS_CACHE_KEY, CACHE_TTL_MS);
  if (cached) return cached;

  const { data } = await api.get("/clients");
  const normalized = data?.data || data || [];
  setCachedValue(CLIENTS_CACHE_KEY, normalized);
  return normalized;
}

export async function getClient(id) {
  const { data } = await api.get(`/clients/${id}`);
  return data?.data || data;
}

export async function createClient(payload) {
  const { data } = await api.post("/clients", payload);
  clearCachedValue(CLIENTS_CACHE_KEY);
  return data?.data || data;
}

export async function updateClient(id, payload) {
  const { data } = await api.patch(`/clients/${id}`, payload);
  clearCachedValue(CLIENTS_CACHE_KEY);
  return data?.data || data;
}

export async function deleteClient(id) {
  await api.delete(`/clients/${id}`);
  clearCachedValue(CLIENTS_CACHE_KEY);
}

export async function uploadProfilePhoto(id, file) {
  const form = new FormData();
  form.append("photo", file);
  const { data } = await api.patch(`/clients/${id}/profile-photo`, form);
  clearCachedValue(CLIENTS_CACHE_KEY);
  return data?.data || data;
}

export async function uploadGalleryPhotos(id, files) {
  const form = new FormData();
  files.forEach((f) => form.append("photos", f));
  const { data } = await api.post(`/clients/${id}/photos`, form);
  clearCachedValue(CLIENTS_CACHE_KEY);
  return data?.data || data;
}

export async function deleteGalleryPhoto(id, url) {
  const { data } = await api.delete(`/clients/${id}/photos`, { data: { url } });
  clearCachedValue(CLIENTS_CACHE_KEY);
  return data?.data || data;
}
