import type { AxiosError, AxiosResponse } from "axios";

/** Формат, который возвращает твой backend */
export interface BackendResponse<T> {
  status: number;
  message?: string;
  error?: string | null;
  result: T;
}

export type ApiResponse<T> = AxiosResponse<BackendResponse<T>>;

export type ApiErrorResponse<T = unknown> = AxiosError<BackendResponse<T>>;

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message?: string; error?: string };
