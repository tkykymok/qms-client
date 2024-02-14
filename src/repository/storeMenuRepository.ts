import axiosInstance from "../config/axiosInstance";
import { GetStoreMenusResponse } from "@/types/response/storeMenuResponse";

const BASE_END_POINT = "/store-menu";

// 店舗メニュー一覧を取得する
export const getStoreMenus = async (): Promise<GetStoreMenusResponse> => {
  const response = await axiosInstance.get(`${BASE_END_POINT}/list`);
  return response.data;
};
