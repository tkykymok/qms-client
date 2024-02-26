import * as Repository from "../repository/authRepository";
import { SignInRequest } from "@/types/request/AuthRequest";
import { SignInResponse } from "@/types/response/authResponse";

// ログイン処理を行う
export const signIn = async (
  request: SignInRequest,
): Promise<SignInResponse> => {
  return await Repository.signIn(request);
};
