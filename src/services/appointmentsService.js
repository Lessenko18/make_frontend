import api from "./api";
import {
  clearCachedValue,
  getCachedValue,
  setCachedValue,
} from "./requestCache";

const APPOINTMENTS_CACHE_KEY = "appointments:list";
const CACHE_TTL_MS = 15000;

export async function listAppointments() {
  const cached = getCachedValue(APPOINTMENTS_CACHE_KEY, CACHE_TTL_MS);
  if (cached) return cached;

  const { data } = await api.get("/appointments");
  const normalized = data?.data || data || [];
  setCachedValue(APPOINTMENTS_CACHE_KEY, normalized);
  return normalized;
}

export async function createAppointment(payload) {
  const { data } = await api.post("/appointments", payload);
  clearCachedValue(APPOINTMENTS_CACHE_KEY);
  return data?.data || data;
}

export async function updateAppointment(id, payload) {
  const { data } = await api.patch(`/appointments/${id}`, payload);
  clearCachedValue(APPOINTMENTS_CACHE_KEY);
  return data?.data || data;
}

export async function deleteAppointment(id) {
  const { data } = await api.delete(`/appointments/${id}`);
  clearCachedValue(APPOINTMENTS_CACHE_KEY);
  return data?.data || data;
}

export async function getClientHistory(clientId) {
  const { data } = await api.get(`/appointments/client/${clientId}/history`);
  return data?.data || data;
}
