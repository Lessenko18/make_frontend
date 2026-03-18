import api from "./api";
import {
  clearCachedValue,
  getCachedValue,
  setCachedValue,
} from "./requestCache";

const SERVICES_CACHE_KEY = "services:list";
const CACHE_TTL_MS = 30000;

export async function listServices() {
  const cached = getCachedValue(SERVICES_CACHE_KEY, CACHE_TTL_MS);
  if (cached) return cached;

  const { data } = await api.get("/services");
  const normalized = data?.data || data || [];
  setCachedValue(SERVICES_CACHE_KEY, normalized);
  return normalized;
}

export async function createService(payload) {
  const { data } = await api.post("/services", payload);
  clearCachedValue(SERVICES_CACHE_KEY);
  return data?.data || data;
}

export async function updateService(id, payload) {
  const { data } = await api.patch(`/services/${id}`, payload);
  clearCachedValue(SERVICES_CACHE_KEY);
  return data?.data || data;
}

export async function deleteService(id) {
  await api.delete(`/services/${id}`);
  clearCachedValue(SERVICES_CACHE_KEY);
}
