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
import MyDialog from "@/components/molecules/MyDialog";
import { Typography } from "@/components/molecules/Typography";

const OperationBoard = () => {
  const { sensors } = useTabletSensor();

  // state
  const [isMounted, setIsMounted] = useState(false);
  const [activeCard, setActiveCard] = useState<Reservation | undefined>(
    undefined,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(true);

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

  const closeDialog = () => {
    setIsDialogOpen(false);
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

      {/* お会計確認ダイアログ */}
      <MyDialog
        isOpen={isDialogOpen}
        title="お会計"
        onClose={closeDialog}
        size="2xl"
        onOk={closeDialog}
        okText="確認"
        onCancel={closeDialog}
        cancelText="キャンセル"
      >
        <div className="p-3 text-neutral-600">
          <div className="flex justify-between items-end mb-4">
            <Typography variant="h6">メニュー</Typography>
            <div className="bg-blue-400 py-1 px-2 rounded-3xl">
              <Typography variant="body1" className="text-white">
                カット
              </Typography>
            </div>
          </div>

          <div className="h-96 bg-blue-200 mb-4"></div>

          <Typography variant="h6" className="mb-4">
            料金
          </Typography>
          <Typography variant="h6" className="text-right">
            合計：¥0
          </Typography>
        </div>
      </MyDialog>
    </div>
  );
};

export default OperationBoard;
