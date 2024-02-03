import axiosInstance from "../config/axiosInstance";
import { GetStoreStaffsResponse } from "@/types/response/staffResponse";
import { SortActiveStaffRequest } from "@/types/request/StoreStaffRequest";

const BASE_END_POINT = "/store-staff";

// 店舗スタッフ一覧を取得する
export const getStoreStaffs = async (): Promise<GetStoreStaffsResponse> => {
  const response = await axiosInstance.get(`${BASE_END_POINT}/list`);
  return response.data;
};

// 活動中スタッフの並び順を更新する
export const sortActiveStaffs = async (
  request: SortActiveStaffRequest,
): Promise<void> => {
  await axiosInstance.put(`${BASE_END_POINT}/sort-active-staffs`, request);
};
