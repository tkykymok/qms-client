"use client";

import React, { FC } from "react";
import DraggableCard from "@/components/organisms/features/operation/DraggableCard";
import { useDroppable } from "@dnd-kit/core";
import { Reservation, Status } from "@/model/type";
import CardContext from "@/components/organisms/features/operation/CardContext";

interface DroppableColumnProps {
  status: Status;
  title: string;
  staffId?: number | null;
  onClickHeader?: () => void;
  reservations?: Reservation[];
}

const DroppableColumn: FC<DroppableColumnProps> = ({
  status,
  title,
  staffId = null,
  onClickHeader,
  reservations = [],
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `${status}-${staffId}`,
    data: { status, staffId },
  });

  // 対象の予約一覧

  return (
    <div
      ref={setNodeRef}
      className={`
        mx-3
        rounded-md
        bg-white
        shadow-xl
        overflow-y-auto
        transition-all
        duration-300
        'border-2 border-green-400'
      `}
    >
      <>
        <div className="sticky top-0 bg-white text-neutral-700 font-medium select-none z-10">
          <div className={`p-5 flex justify-between`}>
            <div className="flex">
              <div>{title}</div>
              <span className="flex transition group-open:rotate-180 group-open:items-end">
                <svg fill="none" height="24" stroke="currentColor" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
            <div className="flex text-lg">11</div>
          </div>
          <hr />
        </div>
        <div className="flex flex-wrap min-h-24 py-2 pr-5">
          <div className={`m-3 w-full`}>
            {reservations.map((reservation) => (
              <DraggableCard
                key={reservation.reservationId}
                reservationId={reservation.reservationId}
                reservation={reservation}
                isDraggable={true}
              >
                <CardContext reservation={reservation} isDraggable={true} />
              </DraggableCard>
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default DroppableColumn;
