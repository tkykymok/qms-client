import axiosInstance from "../config/axiosInstance";
import {
  GetLastWaitingInfoResponse,
  GetReservationsResponse,
} from "@/types/response/reservationResponse";

// 予約一覧を取得する
export const getReservations = async (): Promise<GetReservationsResponse> => {
  const response = await axiosInstance.get("/reservation/list/today");
  return response.data;
};

// 最後尾の待ち情報を取得する
export const getLastWaitingInfo = async (
  storeId: number,
): Promise<GetLastWaitingInfoResponse> => {
  const response = await axiosInstance.get(
    `/reservation/last-waiting-info/${storeId}`,
  );
  return response.data;
};
