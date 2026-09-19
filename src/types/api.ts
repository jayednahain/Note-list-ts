export interface ApiResponse<T> {
  data: T;
  status: number;
}

export type ErrorType = "no-internet" | "server-error" | null;

export interface ApiError {
  type: ErrorType;
  message: string;
}
