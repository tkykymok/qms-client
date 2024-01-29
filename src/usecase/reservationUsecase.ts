import * as ReservationRepository from "../repository/reservationRepository";
import { Reservation, WaitingInfo } from "@/types/model/reservation";

// 予約一覧を取得する
export const getReservations = async (): Promise<Reservation[]> => {
  const data = await ReservationRepository.getReservations();
  return data.reservations as Reservation[];
};

// 最後尾の待ち情報を取得する
export const getLastWaitingInfo = async (
  storeId: number,
): Promise<WaitingInfo> => {
  const data = await ReservationRepository.getLastWaitingInfo(storeId);
  return data.waitingInfo as WaitingInfo;
};
