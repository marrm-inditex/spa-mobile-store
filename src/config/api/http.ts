import { API_CONFIG } from "./env";

type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export class HttpError extends Error {
  public readonly status: number;
  public readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

const buildUrl = (path: string): string => new URL(path, API_CONFIG.baseURL).toString();

const createJsonHeaders = (headers?: HeadersInit): HeadersInit => ({
  "Content-Type": "application/json",
  ...(headers ?? {}),
});

const fetchJson = async <T>(path: string, config?: RequestInit): Promise<T> => {
  const response = await fetch(buildUrl(path), config);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new HttpError("HTTP request error", response.status, errorBody);
  }

  return (await response.json()) as T;
};

export const httpClient = {
  get: <T>(path: string, config?: RequestInit): Promise<T> =>
    fetchJson<T>(path, { ...config, method: "GET" }),

  post: <T, U = Record<string, JsonValue>>(
    path: string,
    body: U,
    config?: RequestInit,
  ): Promise<T> =>
    fetchJson<T>(path, {
      ...config,
      method: "POST",
      headers: createJsonHeaders(config?.headers),
      body: JSON.stringify(body),
    }),
};
