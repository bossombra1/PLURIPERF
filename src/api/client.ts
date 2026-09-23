const API_BASE = import.meta.env.VITE_API_URL || '/api';

export class ApiError extends Error {
  status: number;
  details?: { path: string; message: string }[];
  constructor(status: number, message: string, details?: { path: string; message: string }[]) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function token(): string | null {
  return localStorage.getItem('pluriperf_token');
}

export function setToken(t: string | null) {
  if (t) localStorage.setItem('pluriperf_token', t);
  else localStorage.removeItem('pluriperf_token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData) && options.body) {
    headers.set('Content-Type', 'application/json');
  }
  const t = token();
  if (t) headers.set('Authorization', `Bearer ${t}`);
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    /* réponse vide */
  }
  if (!res.ok) {
    throw new ApiError(res.status, data?.message || `Erreur ${res.status}`, data?.details);
  }
  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
    }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body ?? {}) }),
};