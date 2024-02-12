"use client";

import React, { FC } from "react";
import { BsPersonCheckFill } from "react-icons/bs";
import {
  Status,
  CANCELED,
  DONE,
  IN_PROGRESS,
  PENDING,
  WAITING,
} from "@/types/model/type";
import { Reservation } from "@/types/model/reservation";
import Tag from "@/components/atoms/Tag";

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

  // 予約のステータスによってメニュー名を表示するかどうかを判定
  const showMenu = (status: Status) => {
    if (forOverlay) return false;
    switch (status) {
      case WAITING:
      case IN_PROGRESS:
        return true;
      default:
        return false;
    }
  };

  const opacityClass = !isDraggable ? "opacity-60" : "";
  const cursorClass = isDraggable ? "cursor-grab" : "cursor-auto";
  const overlayClass = forOverlay && "cursor-grabbing";
  const rotationStyle = forOverlay ? { transform: "rotate(3deg)" } : {};
  const backgroundColor = getBackgroundColor(reservation.status, forOverlay);

  return (
    <div
      className={`
        p-1 
        rounded-md
        shadow-lg
        select-none
        ${opacityClass}
        ${cursorClass}
        ${overlayClass}
        ${backgroundColor}
      `}
      style={rotationStyle}
    >
      <div className="text-neutral-800 p-3">
        <div className="flex justify-between">
          <div className="flex items-center">
            #{reservation.reservationNumber}
            {reservation.arrived && reservation.status === WAITING && (
              <div className="ml-2">
                <BsPersonCheckFill color="green" size={20} />
              </div>
            )}
          </div>
          <div>{reservation.customerLastName}</div>
        </div>
        {showMenu(reservation.status) && (
          <div className="flex justify-end mt-2">
            <Tag backgroundColor={reservation.tagColor}>
              <span>{reservation.menuName}</span>
            </Tag>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardContext;
