export type SortActiveStaffRequest = {
  staffIds: number[];
};

export type ToggleActiveStaffRequest = {
  staffId: number;
  isActive: boolean; // 変更後の活動中フラグ
};

export type UpdateBreakTimeRequest = {
  staffId: number;
  breakStartTime: string | null;
  breakEndTime: string | null;
};
