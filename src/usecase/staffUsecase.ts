import * as StaffRepository from "../repository/staffRepository";
import { StoreStaff } from "@/types/model/staff";

// 予約一覧を取得する
export const getStoreStaffs = async (): Promise<StoreStaff[]> => {
  const data = await StaffRepository.getStoreStaffs();
  return data.storeStaffs as StoreStaff[];
};
