import api from "./api";

const AUTH_TOKEN_KEY = "auth:token";
const LEGACY_AUTH_TOKEN_STORAGE_KEY = "auth:token";

const AUTH_LOGIN_ENDPOINT =
  import.meta.env.VITE_AUTH_LOGIN_ENDPOINT ?? "/auth/login";
const AUTH_REGISTER_ENDPOINT =
  import.meta.env.VITE_AUTH_REGISTER_ENDPOINT ?? "/auth/register";
const AUTH_FORGOT_ENDPOINT =
  import.meta.env.VITE_AUTH_FORGOT_ENDPOINT ?? "/auth/forgot-password";

const LOGIN_FALLBACK_ENDPOINTS = ["/api/auth/login", "/auth/login"];
const REGISTER_FALLBACK_ENDPOINTS = [
  "/api/auth/register",
  "/auth/register",
  "/auth/signup",
  "/auth/sign-up",
  "/users/register",
  "/users/signup",
];
const FORGOT_FALLBACK_ENDPOINTS = [
  "/api/auth/forgot-password",
  "/auth/forgot-password",
];

function normalizePayload(data) {
  return data?.data ?? data ?? {};
}

function extractToken(payload) {
  return payload?.token ?? payload?.accessToken ?? payload?.jwt ?? null;
}

function createCandidateEndpoints(primaryEndpoint, fallbackEndpoints) {
  return [primaryEndpoint, ...fallbackEndpoints].filter(
    (endpoint, index, list) => endpoint && list.indexOf(endpoint) === index,
  );
}

async function postWithEndpointFallback(endpoints, payload) {
  let lastNotFoundError;

  for (const endpoint of endpoints) {
    try {
      const response = await api.post(endpoint, payload);
      return response;
    } catch (error) {
      if (error?.response?.status === 404) {
        lastNotFoundError = error;
        continue;
      }

      throw error;
    }
  }

  if (lastNotFoundError) {
    throw lastNotFoundError;
  }

  throw new Error("No register endpoint configured.");
}

export function setAuthToken(token) {
  if (!token) return;
  sessionStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getAuthToken() {
  const sessionToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (sessionToken) return sessionToken;

  const legacyToken = localStorage.getItem(LEGACY_AUTH_TOKEN_STORAGE_KEY);
  if (legacyToken) {
    localStorage.removeItem(LEGACY_AUTH_TOKEN_STORAGE_KEY);
  }

  return null;
}

export function clearAuthToken() {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(LEGACY_AUTH_TOKEN_STORAGE_KEY);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

export async function loginUser(payload) {
  const candidateEndpoints = createCandidateEndpoints(
    AUTH_LOGIN_ENDPOINT,
    LOGIN_FALLBACK_ENDPOINTS,
  );
  const { data } = await postWithEndpointFallback(candidateEndpoints, payload);
  const normalized = normalizePayload(data);
  const token = extractToken(normalized);
  if (token) setAuthToken(token);
  return normalized;
}

export async function registerUser(payload) {
  const candidateEndpoints = createCandidateEndpoints(
    AUTH_REGISTER_ENDPOINT,
    REGISTER_FALLBACK_ENDPOINTS,
  );
  const { data } = await postWithEndpointFallback(candidateEndpoints, payload);
  return normalizePayload(data);
}

export async function requestPasswordReset(payload) {
  const candidateEndpoints = createCandidateEndpoints(
    AUTH_FORGOT_ENDPOINT,
    FORGOT_FALLBACK_ENDPOINTS,
  );
  const { data } = await postWithEndpointFallback(candidateEndpoints, payload);
  return normalizePayload(data);
}
