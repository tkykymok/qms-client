export type StoreStaff = {
  staffId: number; // スタッフID
  storeId: number; // 店舗ID
  lastName: string; // スタッフ姓
  firstName: string | null; // スタッフ名
  isActive: boolean; // 活動中フラグ
  reservationId: number | null; // 予約ID
};
