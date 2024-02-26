import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type AuthInfo = {
  idToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  storeId: number | null;
};

interface AuthState {
  authInfo: AuthInfo;

  setIdToken: (idToken: string | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setStoreId: (storeId: number | null) => void;
}

const useAuthStore = create(
  devtools<AuthState>((set) => ({
    authInfo: {
      idToken: null,
      accessToken: null,
      refreshToken: null,
      storeId: 1,
    },

    setIdToken: (idToken: string | null) =>
      set((prevState) => ({ ...prevState, idToken })),
    setAccessToken: (accessToken: string | null) =>
      set((prevState) => ({ ...prevState, accessToken })),
    setRefreshToken: (refreshToken: string | null) =>
      set((prevState) => ({ ...prevState, refreshToken })),
    setStoreId: (storeId: number | null) =>
      set((prevState) => ({ ...prevState, storeId })),
  })),
);

export default useAuthStore;
