import axiosInstance from "../config/axiosInstance";
import {
  GetLastWaitingInfoResponse,
  GetReservationsResponse,
  UpdateReservationStatusResponse,
} from "@/types/response/reservationResponse";
import { UpdateReservationStatusRequest } from "@/types/request/ReservationRequest";

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

export const updateReservationStatus = async (
  request: UpdateReservationStatusRequest,
): Promise<UpdateReservationStatusResponse> => {
  const response = await axiosInstance.put(
    "/reservation/update-status",
    request,
  );
  return response.data;
};
