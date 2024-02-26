export const ID_TOKEN = "idToken";
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const STORE_ID = "storeId";

export type PersistentAuthInfoKey =
  | typeof ID_TOKEN
  | typeof ACCESS_TOKEN
  | typeof REFRESH_TOKEN
  | typeof STORE_ID;
