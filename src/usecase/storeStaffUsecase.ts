import * as Repository from "../repository/storeStaffRepository";
import { StoreStaff } from "@/types/model/staff";
import {
  SortActiveStaffRequest,
  ToggleActiveStaffRequest,
  UpdateBreakTimeRequest,
} from "@/types/request/storeStaffRequest";

// 予約一覧を取得する
export const getStoreStaffs = async (): Promise<StoreStaff[]> => {
  const data = await Repository.getStoreStaffs();
  return data.storeStaffs as unknown as StoreStaff[];
};

// 活動中スタッフの並び順を更新する
export const sortActiveStaffs = async (
  activeStaffIds: number[],
): Promise<void> => {
  // 並び順を更新するリクエストを作成します。
  const request: SortActiveStaffRequest = {
    staffIds: activeStaffIds,
  };

  await Repository.sortActiveStaffs(request);
};

// スタッフの活動状態を更新する
export const toggleActiveStaff = async (staff: StoreStaff): Promise<void> => {
  // 活動中スタッフのON/OFFを切り替えるリクエストを作成します。
  const request: ToggleActiveStaffRequest = {
    staffId: staff.staffId,
    isActive: !staff.isActive,
  };

  await Repository.toggleActiveStaff(request);
};

// スタッフの休憩時間を更新する
export const updateBreakTime = async (
  request: UpdateBreakTimeRequest,
): Promise<void> => {
  await Repository.updateBreakTime(request);
};
