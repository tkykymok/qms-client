"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DroppableColumn from "@/components/organisms/features/operation/DroppableColumn";
import {
  CANCELED,
  DONE,
  IN_PROGRESS,
  PENDING,
  Status,
  WAITING,
} from "@/types/model/type";
import DraggableCard from "@/components/organisms/features/operation/DraggableCard";
import CardContext from "@/components/organisms/features/operation/CardContext";
import { Reservation } from "@/types/model/reservation";
import { StoreStaff } from "@/types/model/staff";
import useSWR from "swr";
import { storeStaffsFetcher } from "@/swr/fether";
import { useReservation } from "@/hooks/useReservation";

const OperationBoard = () => {
  const isTablet = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return /tablet|ipad|playbook|silk/.test(userAgent);
  };

  const activationOptions = {
    activationConstraint: {
      delay: isTablet() ? 0 : 0, // タブレットの場合、ドラッグ時の遅延を設定 TODO 遅延設定不要？
      tolerance: 0,
    },
  };

  const sensor = useSensor(
    isTablet() ? TouchSensor : PointerSensor,
    activationOptions,
  );
  const sensors = useSensors(sensor);

  const [isMounted, setIsMounted] = useState(false);
  const [activeCard, setActiveCard] = useState<Reservation>();

  const { reservations, handleUpdateReservation } = useReservation();

  const { data: storeStaffs } = useSWR<StoreStaff[]>(
    "storeStaffs",
    storeStaffsFetcher,
    {
      revalidateOnReconnect: true,
      fallbackData: [],
    },
  );

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

  const activeStaffs = useMemo(() => {
    if (!storeStaffs) {
      return [];
    }
    return storeStaffs.filter((staff) => staff.isActive);
  }, [storeStaffs]);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);
  if (!isMounted) return null;

  /**
   * ドラッグ開始
   * @param active
   */
  const handleDragStart = ({ active }: DragStartEvent) => {
    const { reservation } = active.data.current || {};
    if (reservation) {
      setActiveCard(reservation);
    }
  };

  /**
   * ドラッグ終了
   * @param active
   * @param over
   */
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const { reservation } = active.data.current || {};
    if (!reservation) return;

    const staffId = over?.data.current?.staffId;

    handleUpdateReservation(
      reservation.reservationId,
      staffId,
      over?.data.current?.status as Status,
      reservation.version,
    ).then(() => {
      setActiveCard(undefined);
    });

    // const { reservationId } = reservation;
    // const targetIndex = reservations.findIndex(
    //   (r) => r.reservationId === reservationId,
    // );
    //
    // if (targetIndex === -1) return;
    //
    // const updatedReservation = {
    //   ...reservations[targetIndex],
    //   status: over?.data.current?.status as Status,
    //   staffId: over?.data.current?.staffId,
    // };
    //
    // const updatedReservations = [
    //   ...reservations.slice(0, targetIndex),
    //   updatedReservation,
    //   ...reservations.slice(targetIndex + 1),
    // ];
    //
    // setReservations(updatedReservations);
  };

  const handleDragOver = ({ over }: DragOverEvent) => {};

  return (
    <div className="min-h-screen bg-green-100">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        <div className="flex space-x-10">
          <div className="h-screen flex-1 flex-col pt-3 space-y-7 overflow-y-auto">
            {/* 保留カラム */}
            <DroppableColumn
              status={PENDING}
              title="保留"
              reservations={reservationsMap.get(PENDING)}
            />
            {/* 案内待ちカラム */}
            <DroppableColumn
              status={WAITING}
              title="案内待ち"
              reservations={reservationsMap.get(WAITING)}
            />
          </div>

          {/* スタッフカラム */}
          <div className="h-screen flex flex-1 flex-col pt-3 justify-evenly overflow-y-auto">
            {activeStaffs?.map((staff) => (
              <DroppableColumn
                key={staff.staffId}
                status={IN_PROGRESS}
                title={staff.lastName}
                staffId={staff.staffId}
                reservations={reservationsMap.get(IN_PROGRESS)?.filter((r) => {
                  return r.staffId == staff.staffId;
                })}
              />
            ))}
          </div>

          <div className="h-screen flex-1 flex-col pt-3 space-y-7 overflow-y-auto">
            {/* 取消カラム */}
            <DroppableColumn
              status={CANCELED}
              title="取消"
              reservations={reservationsMap.get(CANCELED)}
            />
            {/* 案内済みカラム */}
            <DroppableColumn
              status={DONE}
              title="案内済み"
              reservations={reservationsMap.get(DONE)}
            />
          </div>
        </div>

        <DragOverlay>
          {activeCard && (
            <DraggableCard
              key={activeCard.reservationId}
              reservationId={activeCard.reservationId}
              reservation={activeCard}
              isDraggable={false}
            >
              <CardContext
                reservation={activeCard}
                isDraggable={false}
                forOverlay={true}
              />
            </DraggableCard>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default OperationBoard;
