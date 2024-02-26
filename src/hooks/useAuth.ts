import * as Usecase from "@/usecase/authUsecase";
import { SignInRequest } from "@/types/request/AuthRequest";
import useAuthStore from "@/store/authStore";

export const useAuth = () => {
  const {} = useAuthStore((state) => ({
    setIdToken: state.setIdToken,
    setAccessToken: state.setAccessToken,
    setStoreId: state.setStoreId,
  }));

  const handleSignIn = async (request: SignInRequest) => {
    console.log(request);
    const response = await Usecase.signIn(request);
    console.log(response);
  };

  return { handleSignIn };
};
