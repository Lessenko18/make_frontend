import api from "./api";
import {
  clearCachedValue,
  getCachedValue,
  setCachedValue,
} from "./requestCache";

const FINANCE_CACHE_PREFIX = "finance:list";
const CACHE_TTL_MS = 15000;
const financeCacheKeys = new Set();

function toStartOfDayIso(dateValue) {
  return `${dateValue}T00:00:00.000Z`;
}

function toEndOfDayIso(dateValue) {
  return `${dateValue}T23:59:59.999Z`;
}

function normalizeFilters(filters = {}) {
  return Object.entries(filters).reduce((acc, [key, value]) => {
    if (value === undefined || value === null) return acc;

    const normalizedValue = typeof value === "string" ? value.trim() : value;
    if (normalizedValue === "") return acc;

    if (key === "dateFrom") {
      acc[key] = toStartOfDayIso(normalizedValue);
      return acc;
    }

    if (key === "dateTo") {
      acc[key] = toEndOfDayIso(normalizedValue);
      return acc;
    }

    acc[key] = normalizedValue;
    return acc;
  }, {});
}

function buildCacheKey(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => [key, String(value)]),
  ).toString();

  return query ? `${FINANCE_CACHE_PREFIX}?${query}` : FINANCE_CACHE_PREFIX;
}

function clearFinanceListCache() {
  financeCacheKeys.forEach((key) => clearCachedValue(key));
  financeCacheKeys.clear();
}

export async function listFinanceEntries(filters = {}) {
  const params = normalizeFilters(filters);
  const cacheKey = buildCacheKey(params);
  const cached = getCachedValue(cacheKey, CACHE_TTL_MS);
  if (cached) return cached;

  const { data } = await api.get("/finance", { params });
  const normalized = data?.data || data || [];
  setCachedValue(cacheKey, normalized);
  financeCacheKeys.add(cacheKey);
  return normalized;
}

export async function createManualExpense(payload) {
  const { data } = await api.post("/finance/manual-expenses", payload);
  clearFinanceListCache();
  return data?.data || data;
}
