import { ApiResponse } from "@/types/response/baseResponse";

export type GetStoreMenusResponse = {
  storeMenus: StoreMenuResponse[];
} & ApiResponse;

type StoreMenuResponse = {
  storeId: number; // 店舗ID
  storeMenuId: number; // メニューID
  menuName: string; // メニュー名
  price: number; // 価格
  time: number; // 所要時間
  disabled: boolean; // 無効フラグ
};
