export type Status =
  | typeof IN_PROGRESS
  | typeof WAITING
  | typeof PENDING
  | typeof DONE
  | typeof CANCELED;

export const WAITING = 0;
export const IN_PROGRESS = 1;
export const DONE = 2;
export const PENDING = 5;
export const CANCELED = 9;

export type TagColor =
  | typeof WHITE
  | typeof GRAY
  | typeof BROWN
  | typeof ORANGE
  | typeof YELLOW
  | typeof GREEN
  | typeof BLUE
  | typeof PURPLE
  | typeof PINK
  | typeof RED;

export const WHITE = "#FFFFFF";
export const GRAY = "#DFDFDF";
export const BROWN = "#E8C9C9";
export const ORANGE = "#FFE8BF";
export const YELLOW = "#FFFFBF";
export const GREEN = "#85FC85";
export const BLUE = "#ABD3FA";
export const PURPLE = "#DFBFDF";
export const PINK = "#FFEFF2";
export const RED = "#FFBFBF";

// 共通の MenuItem 型
export type MenuItem = {
  storeMenuId: number;
  menuName: string;
  price: number;
  time: number;
  tagColor: TagColor;
  disabled: boolean;
};
