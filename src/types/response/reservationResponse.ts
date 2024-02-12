import { ApiResponse } from "@/types/response/BaseResponse";

export type GetReservationsResponse = {
  reservations: ReservationResponse[];
} & ApiResponse;

export type GetLastWaitingInfoResponse = {
  waitingInfo: WaitingInfoResponse;
} & ApiResponse;

export type UpdateReservationStatusResponse = {
  reservation: ReservationResponse;
} & ApiResponse;

type ReservationResponse = {
  reservationId: number; // 予約ID
  storeId: number; // 店舗ID
  customerId: number; // 顧客ID
  reservationNumber: number; // 予約番号
  reservedDate: string; // 予約日
  staffId: number; // 対応スタッフID
  serviceStartTime: string; // 対応開始時間
  serviceEndTime: string; // 対応終了時間
  holdStartTime: string; // 保留開始時間
  status: number; // 予約ステータス
  notified: boolean; // 通知フラグ
  arrived: boolean; // 到着フラグ
  version: number; // バージョン
  reservationMenus: ReservationMenuResponse[]; // 予約メニュー
  storeName: string; // 店舗名
  homePageUrl: string; // ホームページURL
  customerLastName: string; // 顧客姓
  customerFirstName: string; // 顧客名
};

type WaitingInfoResponse = {
  waitingCount: number | null; // 待ち人数
  position: number | null; // 順番
  reservationNumber: number | null; // 予約番号
  activeStaffCount: number | null; // 活動中スタッフ数
  lastWaitTime: number | null; // 最後尾の待ち時間
  estimatedServiceStartTime: string; // 案内開始時間目安
};

type ReservationMenuResponse = {
  storeMenuId: number; // 店舗メニューID
  menuName: string; // メニュー名
  price: number; // 価格
  time: number; // 所要時間
  tagColor: string; // タグ色
};
