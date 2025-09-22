export interface BusinessResult<T> {
  status: string;
  message?: string;
  error?: object;
  data?: T;
  traceId?: string;
}

export enum Status {
  OK = "OK",
  ERROR = "ERROR",
}
