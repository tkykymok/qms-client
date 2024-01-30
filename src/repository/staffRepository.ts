import axiosInstance from "../config/axiosInstance";
import { GetStoreStaffsResponse } from "@/types/response/staffResponse";

// 店舗スタッフ一覧を取得する
export const getStoreStaffs = async (): Promise<GetStoreStaffsResponse> => {
  const response = await axiosInstance.get("/staff/store-staffs");
  return response.data;
};
