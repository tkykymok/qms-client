import { Status } from "@/types/constant/status";
import { MenuItem } from "@/types/model/storeMenu";

export type Reservation = {
  reservationId: number;
  storeId: number;
  customerId: number;
  reservationNumber: number;
  reservedDate: string;
  staffId: number | null;
  serviceStartTime: string | null;
  serviceEndTime: string | null;
  holdStartTime: string | null;
  status: Status;
  notified: boolean;
  arrived: boolean;
  version: number;
  reservationMenus: ReservationMenu[];
  storeName: string | null;
  homePageUrl: string | null;
  customerLastName: string;
  customerFirstName: string;
};

export type WaitingInfo = {
  waitingCount: number | null; // 待ち人数
  position: number | null; // 順番
  reservationNumber: number | null; // 予約番号
  activeStaffCount: number | null; // 活動中スタッフ数
  lastWaitTime: number | null; // 最後尾の待ち時間
  estimatedServiceStartTime: string; // 案内開始時間目安
};

export type ReservationMenu = Omit<MenuItem, "disabled">;
