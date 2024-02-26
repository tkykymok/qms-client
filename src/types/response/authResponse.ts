import { ApiResponse } from "@/types/response/baseResponse";

export type SignInResponse = {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
} & ApiResponse;
