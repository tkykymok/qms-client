import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  idToken: string | null;
  accessToken: string | null;
  storeId: number | null;

  setIdToken: (idToken: string | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  setStoreId: (storeId: number | null) => void;
}

const useAuthStore = create(
  devtools<AuthState>((set) => ({
    idToken: null,
    accessToken: null,
    storeId: 1,

    setIdToken: (idToken: string | null) => set({ idToken }),
    setAccessToken: (accessToken: string | null) => set({ accessToken }),
    setStoreId: (storeId: number | null) => set({ storeId }),
  })),
);

export default useAuthStore;
