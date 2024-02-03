import * as Repository from "../repository/storeStaffRepository";
import { StoreStaff } from "@/types/model/staff";
import { SortActiveStaffRequest } from "@/types/request/StoreStaffRequest";

// 予約一覧を取得する
export const getStoreStaffs = async (): Promise<StoreStaff[]> => {
  const data = await Repository.getStoreStaffs();
  return data.storeStaffs as StoreStaff[];
};

// 活動中スタッフの並び順を更新する
export const sortActiveStaffs = async (
  request: SortActiveStaffRequest,
): Promise<void> => {
  await Repository.sortActiveStaffs(request);
};
