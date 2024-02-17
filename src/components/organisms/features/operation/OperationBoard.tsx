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
import DraggableCard from "@/components/organisms/features/operation/DraggableCard";
import CardContext from "@/components/organisms/features/operation/CardContext";
import { useReservation } from "@/hooks/useReservation";
import StaffColumn from "@/components/organisms/features/operation/StaffColumn";
import { useStoreStaff } from "@/hooks/useStoreStaff";
import { Reservation } from "@/types/model/reservation";
import useTabletSensor from "@/hooks/useTabletSensor";
import CheckoutDialog from "@/components/organisms/features/operation/CheckoutDialog";
import {
  CANCELED,
  DONE,
  IN_PROGRESS,
  PENDING,
  WAITING,
} from "@/types/constant/status";

const OperationBoard = () => {
  const { sensors } = useTabletSensor();

  // マウント状態
  const [isMounted, setIsMounted] = useState(false);
  // ドラッグ中のカード
  const [activeCard, setActiveCard] = useState<Reservation | undefined>(
    undefined,
  );
  // お会計ダイアログの表示状態
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);

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
    // 次のステータスとスタッフIDを取得
    const { status: nextStatus, staffId } = over?.data.current as Reservation;

    if (nextStatus === DONE) {
      // お会計ダイアログを表示
      setIsCheckoutDialogOpen(true);
      return;
    }

    // 予約のステータスを更新
    handleUpdateReservation(
      reservation.reservationId,
      staffId,
      nextStatus,
      reservation.version,
    ).then(() => {
      setActiveCard(undefined);
    });
  };

  const handleDragOver = ({ over }: DragOverEvent) => {};

  const closeCheckoutDialog = () => {
    setIsCheckoutDialogOpen(false);
  };

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

        <DragOverlay style={{ zIndex: 10 }}>
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

      {/* お会計確認ダイアログ */}
      {isCheckoutDialogOpen && activeCard && (
        <CheckoutDialog
          isDialogOpen={isCheckoutDialogOpen}
          closeDialog={closeCheckoutDialog}
          reservation={activeCard}
        />
      )}
    </div>
  );
};

export default OperationBoard;
