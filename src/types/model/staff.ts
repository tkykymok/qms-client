export type StoreStaff = {
  staffId: number; // スタッフID
  storeId: number; // 店舗ID
  lastName: string; // スタッフ姓
  firstName: string | null; // スタッフ名
  imageUrl: string | null; // 画像
  isActive: boolean; // 活動中フラグ
  sortOrder: number; // 並び順
};
