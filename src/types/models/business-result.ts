export interface BusinessResult<T> {
  status: string;
  error?: ProblemDetails;
  data?: T;
  traceId?: string;
}

export enum Status {
  OK = "OK",
  ERROR = "ERROR",
}

export interface ProblemDetails {
  type?: string;      
  title?: string;    
  status?: number;   
  detail?: string;    
  instance?: string; 

  [key: string]: any;
}