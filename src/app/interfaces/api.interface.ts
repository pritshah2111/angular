export interface ResponseI {
  message?: string;
  status?: number;
  error?: [];
  data?: any;
}

export interface RequestI {
  path: string;
  data?: any;
}
