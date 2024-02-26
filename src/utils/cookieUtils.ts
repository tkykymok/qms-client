import { cookies } from "next/headers";
import { AuthInfo } from "@/store/authStore";
import {
  ACCESS_TOKEN,
  ID_TOKEN,
  REFRESH_TOKEN,
  STORE_ID,
} from "@/types/constant/persistentAuthInfoKey";

/**
 * Cookieから認証情報を取得して、返却します。
 *
 * @return {AuthInfo | null} - 認証情報
 */
export const extractAuthInfoFromCookies = (): AuthInfo | null => {
  const cookiesStore = cookies();

  // Cookieから認証情報を取得
  const idToken = cookiesStore.get(ID_TOKEN)?.value ?? null;
  const accessToken = cookiesStore.get(ACCESS_TOKEN)?.value ?? null;
  const refreshToken = cookiesStore.get(REFRESH_TOKEN)?.value ?? null;
  const storeId = cookiesStore.get(STORE_ID)?.value ?? null;

  return {
    idToken,
    accessToken,
    refreshToken,
    storeId: storeId ? Number(storeId) : null,
  };
};
