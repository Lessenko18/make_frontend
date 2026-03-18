import api from "./api";
import {
  clearCachedValue,
  getCachedValue,
  setCachedValue,
} from "./requestCache";

const FINANCE_CACHE_KEY = "finance:list";
const CACHE_TTL_MS = 15000;

export async function listFinanceEntries() {
  const cached = getCachedValue(FINANCE_CACHE_KEY, CACHE_TTL_MS);
  if (cached) return cached;

  const { data } = await api.get("/finance");
  const normalized = data?.data || data || [];
  setCachedValue(FINANCE_CACHE_KEY, normalized);
  return normalized;
}

export async function createManualExpense(payload) {
  const { data } = await api.post("/finance/manual-expenses", payload);
  clearCachedValue(FINANCE_CACHE_KEY);
  return data?.data || data;
}
