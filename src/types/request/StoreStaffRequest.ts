export type SortActiveStaffRequest = {
  staffIds: number[];
};

export type ToggleActiveStaffRequest = {
  staffId: number;
  isActive: boolean; // 変更後の活動中フラグ
};
