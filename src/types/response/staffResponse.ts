import { ApiResponse } from "@/types/response/BaseResponse";

export type GetStoreStaffsResponse = {
  storeStaffs: StoreStaffResponse[];
} & ApiResponse;

type StoreStaffResponse = {
  staffId: number; // スタッフID
  storeId: number; // 店舗ID
  lastName: string; // スタッフ姓
  firstName: string; // スタッフ名
  isActive: boolean; // 活動中フラグ
  reservationId: number; // 予約ID
};
