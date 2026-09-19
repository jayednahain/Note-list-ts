export interface ApiResponse<T> {
  data: T;
  status: number;
}

// The two error cases your ErrorModal needs to distinguish
export type ErrorType = "no-internet" | "server-error" | null;

// A consistent shape for any error we catch, regardless of source
export interface ApiError {
  type: ErrorType;
  message: string;
}
