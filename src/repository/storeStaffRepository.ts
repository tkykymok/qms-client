import axiosInstance from "../config/axiosInstance";
import { GetStoreStaffsResponse } from "@/types/response/storeStaffResponse";
import {
  SortActiveStaffRequest,
  ToggleActiveStaffRequest,
  UpdateBreakTimeRequest,
} from "@/types/request/storeStaffRequest";

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

// スタッフの活動状態を更新する
export const toggleActiveStaff = async (
  request: ToggleActiveStaffRequest,
): Promise<void> => {
  await axiosInstance.put(`${BASE_END_POINT}/toggle-active-staff`, request);
};

// スタッフの休憩時間を更新する
export const updateBreakTime = async (
  request: UpdateBreakTimeRequest,
): Promise<void> => {
  await axiosInstance.put(`${BASE_END_POINT}/update-break-time`, request);
};
