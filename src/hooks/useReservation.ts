import * as ReservationUsecase from "@/usecase/reservationUsecase";
import { Reservation } from "@/types/model/reservation";
import { UpdateReservationStatusRequest } from "@/types/request/ReservationRequest";
import useSWR, { mutate } from "swr";

import { useMemo } from "react";
import {
  CANCELED,
  DONE,
  IN_PROGRESS,
  PENDING,
  Status,
  WAITING,
} from "@/types/constant/status";

const reservationsFetcher = async (): Promise<Reservation[]> => {
  return await ReservationUsecase.getTodayReservations();
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
    staffId: number | null,
    status: number,
    version: number,
    storeMenuIds: number[],
  ) => {
    const request = {
      staffId: staffId,
      status: status,
      version: version,
      storeMenuIds: storeMenuIds,
    } as UpdateReservationStatusRequest;

    return await ReservationUsecase.updateReservationStatus(
      reservationId,
      request,
    );
  };

  const handleUpdateReservation = async (
    reservationId: number,
    staffId: number | null,
    newStatus: Status,
    version: number,
    storeMenuIds: number[] = [],
  ) => {
    // 必要な情報が揃っていない場合は何もしません。
    if (!reservationId || newStatus == undefined) return;
    // 予約一覧から更新したい予約を探します。
    const targetIndex = reservations!.findIndex(
      (r) => r.reservationId === reservationId,
    );
    if (targetIndex === -1) return;
    const targetReservation = reservations![targetIndex];
    // 現在のステータスが案内済み、キャンセルの場合は何もしません。
    if (
      targetReservation.status === DONE ||
      targetReservation.status === CANCELED
    ) {
      return;
    }

    switch (newStatus) {
      case WAITING:
        // 現在のステータスが同じ場合は何もしません。
        if (targetReservation.status === WAITING) return;
        break;
      case PENDING:
        // 現在のステータスが同じ場合は何もしません。
        if (targetReservation.status === PENDING) return;
        break;
      case IN_PROGRESS:
        // 現在のステータスが同じかつスタッフが同じ場合は何もしません。
        if (
          targetReservation.status === IN_PROGRESS &&
          targetReservation.staffId === staffId
        ) {
          return;
        }
        break;
      case DONE:
        // 案内済みへは案内中からのみ移動可能
        if (targetReservation.status !== IN_PROGRESS) {
          return;
        }
        break;
      case CANCELED:
        // キャンセルへは保留中からのみ移動可能
        if (targetReservation.status !== PENDING) {
          return;
        }
        break;
      default:
        break;
    }

    // 更新したい予約のステータスを更新します。
    const updatedReservation: Reservation = {
      ...targetReservation,
      staffId: staffId,
      status: newStatus,
    };

    // 予約一覧のキャッシュを更新します。
    await reservationMutate((reservations: Reservation[] | undefined) => {
      return reservations?.map((reservation) =>
        reservation.reservationId === reservationId
          ? updatedReservation
          : reservation,
      );
    }, false);

    await updateReservationStatus(
      reservationId,
      staffId,
      newStatus,
      version,
      storeMenuIds,
    );
    await mutate("reservations");
  };

  // スタッフIDを指定して、そのスタッフが担当している予約があるか判定します。
  const isStaffInProgress = (staffId: number): boolean => {
    if (!reservationsMap.get(IN_PROGRESS)) {
      return false;
    }

    return reservationsMap
      .get(IN_PROGRESS)!
      .some((reservation) => reservation.staffId === staffId);
  };

  return {
    reservations,
    reservationsMap,
    handleUpdateReservation,
    isStaffInProgress,
  };
};
