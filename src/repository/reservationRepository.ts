import axiosInstance from "../config/axiosInstance";
import {
  GetLastWaitingInfoResponse,
  GetReservationsResponse,
} from "@/types/response/reservationResponse";
import { formatDate } from "@/utils/formatter";
import { ApiResponse } from "@/types/response/baseResponse";
import { UpdateReservationStatusRequest } from "@/types/request/reservationRequest";

const BASE_END_POINT = "/reservations";

// 予約一覧を取得する
export const getReservations = async (
  storeId: number,
  date: Date,
): Promise<GetReservationsResponse> => {
  const response = await axiosInstance.get(
    `${BASE_END_POINT}/${storeId}?date=${formatDate(date)}`,
  );
  return response.data;
};

// 最後尾の待ち情報を取得する
export const getLastWaitingInfo = async (
  storeId: number,
): Promise<GetLastWaitingInfoResponse> => {
  const response = await axiosInstance.get(
    `${BASE_END_POINT}/${storeId}/last-waiting-info`,
  );
  return response.data;
};

export const updateReservationStatus = async (
  reservationId: number,
  request: UpdateReservationStatusRequest,
): Promise<ApiResponse> => {
  const response = await axiosInstance.put(
    `${BASE_END_POINT}/${reservationId}/update-status`,
    request,
  );
  return response.data;
};
