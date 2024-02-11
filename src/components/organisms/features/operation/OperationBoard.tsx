"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
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
import { useReservation } from "@/hooks/useReservation";
import StaffColumn from "@/components/organisms/features/operation/StaffColumn";
import { useStoreStaff } from "@/hooks/useStoreStaff";
import { Reservation } from "@/types/model/reservation";
import useTabletSensor from "@/hooks/useTabletSensor";

const OperationBoard = () => {
  const { sensors } = useTabletSensor();

  // state
  const [isMounted, setIsMounted] = useState(false);
  const [activeCard, setActiveCard] = useState<Reservation | undefined>(
    undefined,
  );

  // 予約に関するカスタムフック
  const { reservationsMap, handleUpdateReservation } = useReservation();
  // スタッフに関するカスタムフック
  const { activeStaffs } = useStoreStaff();

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);
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
    // スタッフIDを取得
    const staffId = over?.data.current?.staffId;
    // 予約のステータスを更新
    handleUpdateReservation(
      reservation.reservationId,
      staffId,
      over?.data.current?.status as Status,
      reservation.version,
    ).then(() => {
      setActiveCard(undefined);
    });
  };

  const handleDragOver = ({ over }: DragOverEvent) => {};

  return (
    <div className="min-h-screen">
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
          <StaffColumn
            status={IN_PROGRESS}
            reservations={reservationsMap.get(IN_PROGRESS) ?? []}
            activeStaffs={activeStaffs}
          />

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
                isDraggable={true}
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
