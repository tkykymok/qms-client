"use client";

import React, { FC, ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Reservation } from "@/types/model/reservation";

interface DraggableCardProps {
  reservationId: number;
  reservation?: Reservation;
  isDraggable: boolean;
  children?: ReactNode;
  isDragOverlay?: boolean;
}

const DraggableCard: FC<DraggableCardProps> = ({
  reservationId,
  reservation,
  isDraggable,
  children,
  isDragOverlay = false,
}) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id: reservationId,
    data: { reservation },
    disabled: !isDraggable,
  });

  const activeReservation = active?.data?.current?.reservation;

  return (
    <div
      ref={setNodeRef}
      className={`m-3 
        ${activeReservation?.reservationId === reservationId ? "opacity-20" : ""}
        ${isDraggable ? "cursor-grab" : "cursor-auto opacity-50"}
        ${isDragOverlay ? "cursor-grabbing opacity-100" : ""}
     `}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default DraggableCard;
