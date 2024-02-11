"use client";

import React, { FC, ReactNode, useMemo } from "react";
import DraggableCard from "@/components/organisms/features/operation/DraggableCard";
import { useDroppable } from "@dnd-kit/core";
import {
  CANCELED,
  DONE,
  IN_PROGRESS,
  PENDING,
  Status,
  WAITING,
} from "@/types/model/type";
import CardContext from "@/components/organisms/features/operation/CardContext";
import { Reservation } from "@/types/model/reservation";

interface DroppableColumnProps {
  status: Status;
  title: string;
  staffId?: number | null;
  onClickHeader?: () => void;
  reservations?: Reservation[];
  icon?: ReactNode;
}

const DroppableColumn: FC<DroppableColumnProps> = ({
  status,
  title,
  staffId = null,
  reservations = [],
  icon = null,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `${status}-${staffId}`,
    data: { status, staffId },
  });

  // 予約のステータスによってドラッグ可能かどうかを判定
  const isDraggable = useMemo(() => {
    switch (status) {
      case WAITING:
        // ステータスがWAITINGの場合、最初の予約のみドラッグ可能
        return (card: Reservation) => {
          return (
            reservations.findIndex(
              (c) => c.reservationId === card.reservationId,
            ) === 0
          );
        };

      case PENDING:
      case IN_PROGRESS:
        // ステータスがPENDINGまたはIN_PROGRESSの場合、全ての予約がドラッグ可能
        return () => true;
      case CANCELED:
      case DONE:
        // ステータスがCANCELEDまたはDONEの場合、ドラッグ不可
        return () => false;
      default:
        return () => true;
    }
  }, [reservations, status]);

  // 予約のステータスによって折りたたみ可能かどうかを判定
  const isCollapsable = useMemo(() => {
    switch (status) {
      case PENDING:
      case CANCELED:
        // ステータスがPENDINGまたはCANCELEDの場合、折りたたみ可
        return true;
      default:
        return false;
    }
  }, [status]);

  // 予約のステータスによってヘッダーの背景色を変更
  const headerColors = {
    [WAITING]: "bg-waiting",
    [PENDING]: "bg-pending",
    [IN_PROGRESS]: "bg-in-progress",
    [DONE]: "bg-done",
    [CANCELED]: "bg-cancelled",
  };
  const getHeaderColor = (status: Status) => {
    return headerColors[status] || "";
  };
  const headerColor = getHeaderColor(status);

  return (
    <div
      ref={setNodeRef}
      className={`
        mx-3
        rounded-md
        bg-white
        shadow-xl
        transition-all
        duration-300
      `}
    >
      <div className="bg-white text-neutral-700 font-medium select-none z-10">
        <div className={`p-5 flex justify-between ${headerColor}`}>
          <div className="flex items-center space-x-2">
            {icon}
            <div>{title}</div>
            {isCollapsable && (
              <span className="flex transition group-open:rotate-180 group-open:items-end">
                <svg fill="none" height="24" stroke="currentColor" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            )}
          </div>
          <div className="flex text-lg">{reservations.length}</div>
        </div>
        <hr />
      </div>

      <div className="flex flex-wrap min-h-24">
        <div className={`w-full`}>
          {reservations.map((reservation) => (
            <DraggableCard
              key={reservation.reservationId}
              reservationId={reservation.reservationId}
              reservation={reservation}
              isDraggable={isDraggable(reservation)}
            >
              <CardContext
                reservation={reservation}
                isDraggable={isDraggable(reservation)}
              />
            </DraggableCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DroppableColumn;
