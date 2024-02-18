export type ApiResponse = {
  message: string;
};

export type ApiErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
};
