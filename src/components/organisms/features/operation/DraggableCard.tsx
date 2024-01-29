"use client";

import React, { FC, ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Reservation } from "@/model/type";

interface DraggableCardProps {
  reservationId: number;
  reservation?: Reservation;
  isDraggable: boolean;
  children?: ReactNode;
}

const DraggableCard: FC<DraggableCardProps> = ({
  reservationId,
  reservation,
  isDraggable,
  children,
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
     `}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default DraggableCard;
