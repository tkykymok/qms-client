import * as ReservationUsecase from "@/usecase/reservationUsecase";
import { Reservation } from "@/types/model/reservation";
import { UpdateReservationStatusRequest } from "@/types/request/ReservationRequest";
import useSWR, { mutate } from "swr";
import { Status } from "@/types/model/type";

const reservationsFetcher = async (): Promise<Reservation[]> => {
  return await ReservationUsecase.getReservations();
};

export const useReservation = () => {
  const { data: reservations, mutate: reservationMutate } = useSWR<
    Reservation[]
  >("reservations", reservationsFetcher, {
    revalidateOnReconnect: true,
    fallbackData: [],
  });

  const updateReservationStatus = async (
    reservationId: number,
    staffId: number,
    status: number,
    version: number,
  ) => {
    const request = {
      reservationId: reservationId,
      staffId: staffId,
      status: status,
      version: version,
    } as UpdateReservationStatusRequest;

    return await ReservationUsecase.updateReservationStatus(request);
  };

  const handleUpdateReservation = async (
    reservationId: number,
    staffId: number,
    status: Status,
    version: number,
  ) => {
    // 予約一覧から更新したい予約を探します。
    const targetIndex = reservations!.findIndex(
      (r) => r.reservationId === reservationId,
    );
    if (targetIndex === -1) return;

    // 更新したい予約のステータスを更新します。
    const updatedReservation: Reservation = {
      ...reservations![targetIndex],
      staffId: staffId,
      status: status,
    };

    // 予約一覧のキャッシュを更新します。
    await reservationMutate((reservations: Reservation[] | undefined) => {
      return reservations?.map((reservation) =>
        reservation.reservationId === reservationId
          ? updatedReservation
          : reservation,
      );
    }, false);

    // 更新したい予約のID、スタッフのID、新しいステータス、バージョンを指定します。
    await updateReservationStatus(reservationId, staffId, status, version);

    // 予約一覧を再検索します。
    await mutate("reservations");
  };

  return {
    reservations,
    handleUpdateReservation,
  };
};
