import * as Repository from "../repository/storeMenuRepository";
import { StoreMenu } from "@/types/model/storeMenu";
import { GetStoreMenusResponse } from "@/types/response/storeMenuResponse";

// 店舗メニュー一覧を取得する
export const getStoreMenus = async (): Promise<StoreMenu[]> => {
  const data: GetStoreMenusResponse = await Repository.getStoreMenus();
  return data.storeMenus as unknown as StoreMenu[];
};
