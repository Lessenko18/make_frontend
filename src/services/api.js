import axios from "axios";

const AUTH_TOKEN_KEY = "auth:token";

function resolveApiBaseUrl() {
  const rawUrl = import.meta.env.VITE_API_URL;
  if (!rawUrl) return "http://localhost:3000/api";

  const sanitized = rawUrl.trim().replace(/\/+$/, "");
  if (!sanitized) return "http://localhost:3000/api";

  if (/\/api$/i.test(sanitized)) {
    return sanitized;
  }

  try {
    const parsed = new URL(sanitized);
    if (parsed.pathname === "" || parsed.pathname === "/") {
      return `${sanitized}/api`;
    }
  } catch {
    // Keep relative paths or custom formats as provided.
  }

  return sanitized;
}

function getStoredAuthToken() {
  const sessionToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (sessionToken) return sessionToken;

  return localStorage.getItem(AUTH_TOKEN_KEY);
}

const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 12000,
});

api.interceptors.request.use((config) => {
  const token = getStoredAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
