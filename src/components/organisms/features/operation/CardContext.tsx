"use client";

import React, { FC } from "react";
import { BsPersonCheckFill } from "react-icons/bs";
import {
  CANCELED,
  DONE,
  IN_PROGRESS,
  PENDING,
  Reservation,
  Status,
  WAITING,
} from "@/types/model/type";

interface CardContextProps {
  reservation: Reservation;
  isDraggable: boolean;
  forOverlay?: boolean;
}

const CardContext: FC<CardContextProps> = ({
  reservation,
  isDraggable,
  forOverlay = false,
}) => {
  const getBackgroundColor = (status: Status, forOverlay: boolean) => {
    if (forOverlay) return "bg-drag-child";
    switch (status) {
      case WAITING:
        return "bg-waiting-child";
      case PENDING:
        return "bg-pending-child";
      case IN_PROGRESS:
        return "bg-in-progress-child";
      case DONE:
        return "bg-done-child";
      case CANCELED:
        return "bg-cancelled-child";
      default:
        return "";
    }
  };

  const opacityClass = !isDraggable && !forOverlay ? "opacity-60" : "";
  const backgroundColor = getBackgroundColor(reservation.status, forOverlay);
  const rotationStyle = forOverlay ? { transform: "rotate(3deg)" } : {};

  return (
    <div
      className={`p-1 rounded-md shadow-lg select-none ${opacityClass} ${backgroundColor}`}
      style={rotationStyle}
    >
      <div className="text-neutral-800 p-3">
        <div className="flex justify-between">
          <div className="flex items-center">
            #{reservation.reservationNumber}
            {true && reservation.status === WAITING && (
              <div className="ml-2">
                <BsPersonCheckFill color="green" size={20} />
              </div>
            )}
          </div>
          <div>{reservation.customerLastName}</div>
        </div>
        {!forOverlay &&
          (reservation.status === WAITING ||
            reservation.status === IN_PROGRESS) && (
            <>
              <hr className="bg-white my-1" />
              <div>{reservation.menuName}</div>
            </>
          )}
      </div>
    </div>
  );
};

export default CardContext;
