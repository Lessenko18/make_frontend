const cacheStore = new Map();

export function getCachedValue(key, maxAgeMs) {
  const entry = cacheStore.get(key);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > maxAgeMs) {
    cacheStore.delete(key);
    return null;
  }

  return entry.value;
}

export function setCachedValue(key, value) {
  cacheStore.set(key, {
    value,
    timestamp: Date.now(),
  });
}

export function clearCachedValue(key) {
  cacheStore.delete(key);
}
