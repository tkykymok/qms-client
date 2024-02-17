import { TagColor } from "@/types/constant/tagColor";

export type MenuItem = {
  storeMenuId: number;
  menuName: string;
  price: number;
  time: number;
  tagColor: TagColor;
  disabled: boolean;
};

export type StoreMenu = MenuItem;
