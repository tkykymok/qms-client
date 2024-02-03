import * as ReservationUsecase from "@/usecase/reservationUsecase";
import { Reservation } from "@/types/model/reservation";
import { UpdateReservationStatusRequest } from "@/types/request/ReservationRequest";
import useSWR, { mutate } from "swr";
import { DONE, Status } from "@/types/model/type";
import { useMemo } from "react";

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

  // ステータス毎予約一覧
  const reservationsMap = useMemo(() => {
    if (!reservations) {
      return new Map<Status, Reservation[]>();
    }
    // 並び替えたカードをステータスによってMapに格納します。
    const cardMap = reservations.reduce((map, reservation) => {
      const statusGroup = map.get(reservation.status) || [];
      statusGroup.push(reservation);
      map.set(reservation.status, statusGroup);
      return map;
    }, new Map<Status, Reservation[]>());

    // Mapの各エントリに格納された配列を並べ替えます。
    cardMap.forEach((cardArray, status) => {
      cardMap.set(
        status,
        cardArray.sort((a, b) => {
          if (status === DONE) {
            return b.reservationId - a.reservationId;
          }
          return a.reservationId - b.reservationId;
        }),
      );
    });
    return cardMap;
  }, [reservations]);

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
    // 必要な情報が揃っていない場合は何もしません。
    if (!reservationId || status == undefined) return;

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

    await updateReservationStatus(reservationId, staffId, status, version);
    await mutate("reservations");
  };

  return {
    reservations,
    reservationsMap,
    handleUpdateReservation,
  };
};
