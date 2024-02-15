import * as ReservationRepository from "@/repository/reservationRepository";
import { Reservation, WaitingInfo } from "@/types/model/reservation";
import { UpdateReservationStatusRequest } from "@/types/request/ReservationRequest";

// 予約一覧を取得する
export const getTodayReservations = async (): Promise<Reservation[]> => {
  const data = await ReservationRepository.getTodayReservations();
  return data.reservations as Reservation[];
};

// 最後尾の待ち情報を取得する
export const getLastWaitingInfo = async (
  storeId: number,
): Promise<WaitingInfo> => {
  const data = await ReservationRepository.getLastWaitingInfo(storeId);
  return data.waitingInfo as WaitingInfo;
};

export const updateReservationStatus = async (
  reservationId: number,
  request: UpdateReservationStatusRequest,
): Promise<Reservation> => {
  return (
    await ReservationRepository.updateReservationStatus(reservationId, request)
  ).reservation as Reservation;
};
