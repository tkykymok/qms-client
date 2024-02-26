import axiosInstance from "../config/axiosInstance";
import { SignInRequest } from "@/types/request/AuthRequest";
import { SignInResponse } from "@/types/response/authResponse";

const BASE_END_POINT = "/auth";

// ログイン処理を行う
export const signIn = async (
  request: SignInRequest,
): Promise<SignInResponse> => {
  const response = await axiosInstance.post(
    `${BASE_END_POINT}/sign-in`,
    request,
  );
  return response.data;
};
