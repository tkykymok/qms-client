"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  DragEndEvent,
  DragOverEvent,
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
import { isBrowser } from "@emotion/utils";
import DraggableCard from "@/components/organisms/features/operation/DraggableCard";
import CardContext from "@/components/organisms/features/operation/CardContext";
import { Reservation } from "@/types/model/reservation";
import { StoreStaff } from "@/types/model/staff";

const OperationBoard = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [activeCard, setActiveCard] = useState<Reservation>();

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      reservationId: 1,
      storeId: 1,
      customerId: 1,
      reservationNumber: 1001,
      reservedDate: "2024-01-28",
      staffId: null,
      serviceStartTime: null,
      serviceEndTime: null,
      holdStartTime: null,
      status: 0,
      notified: false,
      arrived: false,
      version: 0,
      menuName: "カット、カラーリング",
      price: 8000,
      time: 30,
      storeName: null,
      homePageUrl: null,
      customerLastName: "Customer A",
      customerFirstName: "-",
    },
    {
      reservationId: 2,
      storeId: 1,
      customerId: 2,
      reservationNumber: 1002,
      reservedDate: "2024-01-28",
      staffId: null,
      serviceStartTime: null,
      serviceEndTime: null,
      holdStartTime: null,
      status: 0,
      notified: false,
      arrived: false,
      version: 0,
      menuName: "パーマ",
      price: 4500,
      time: 15,
      storeName: null,
      homePageUrl: null,
      customerLastName: "Customer B",
      customerFirstName: "-",
    },
    {
      reservationId: 4,
      storeId: 1,
      customerId: 4,
      reservationNumber: 1003,
      reservedDate: "2024-01-28",
      staffId: null,
      serviceStartTime: null,
      serviceEndTime: null,
      holdStartTime: null,
      status: 0,
      notified: false,
      arrived: false,
      version: 0,
      menuName: "カット",
      price: 3000,
      time: 15,
      storeName: null,
      homePageUrl: null,
      customerLastName: "Customer D",
      customerFirstName: "-",
    },
    {
      reservationId: 5,
      storeId: 1,
      customerId: 5,
      reservationNumber: 1004,
      reservedDate: "2024-01-28",
      staffId: null,
      serviceStartTime: null,
      serviceEndTime: null,
      holdStartTime: null,
      status: 0,
      notified: false,
      arrived: false,
      version: 0,
      menuName: "カット",
      price: 3000,
      time: 15,
      storeName: null,
      homePageUrl: null,
      customerLastName: "Customer E",
      customerFirstName: "-",
    },
    {
      reservationId: 6,
      storeId: 1,
      customerId: 6,
      reservationNumber: 1005,
      reservedDate: "2024-01-28",
      staffId: null,
      serviceStartTime: null,
      serviceEndTime: null,
      holdStartTime: null,
      status: 0,
      notified: false,
      arrived: false,
      version: 0,
      menuName: "カラーリング",
      price: 5000,
      time: 15,
      storeName: null,
      homePageUrl: null,
      customerLastName: "Customer F",
      customerFirstName: "-",
    },
    {
      reservationId: 7,
      storeId: 1,
      customerId: 7,
      reservationNumber: 1006,
      reservedDate: "2024-01-28",
      staffId: null,
      serviceStartTime: null,
      serviceEndTime: null,
      holdStartTime: null,
      status: 0,
      notified: false,
      arrived: false,
      version: 0,
      menuName: "カット",
      price: 3000,
      time: 15,
      storeName: null,
      homePageUrl: null,
      customerLastName: "Customer G",
      customerFirstName: "-",
    },
    {
      reservationId: 8,
      storeId: 1,
      customerId: 8,
      reservationNumber: 1007,
      reservedDate: "2024-01-28",
      staffId: null,
      serviceStartTime: null,
      serviceEndTime: null,
      holdStartTime: null,
      status: 0,
      notified: false,
      arrived: false,
      version: 0,
      menuName: "カット",
      price: 3000,
      time: 15,
      storeName: null,
      homePageUrl: null,
      customerLastName: "Customer H",
      customerFirstName: "-",
    },
  ]);

  const [staffs, setStaffs] = useState<StoreStaff[]>([
    {
      staffId: 6,
      storeId: 1,
      lastName: "後藤",
      firstName: null,
      isActive: true,
      reservationId: null,
    },
    {
      staffId: 7,
      storeId: 1,
      lastName: "ダミー1",
      firstName: null,
      isActive: true,
      reservationId: null,
    },
    {
      staffId: 8,
      storeId: 1,
      lastName: "ダミー2",
      firstName: null,
      isActive: true,
      reservationId: null,
    },
  ]);

  const activationOptions = {
    activationConstraint: {
      delay: isBrowser ? 0 : 0, // タブレットの場合、ドラッグ時の遅延を設定 TODO 遅延設定不要？
      tolerance: 0,
    },
  };

  const sensor = useSensor(
    isBrowser ? PointerSensor : TouchSensor,
    activationOptions,
  );
  const sensors = useSensors(sensor);

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

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);
  if (!isMounted) return null;

  /**
   * ドラッグ開始
   * @param active
   */
  const handleDragStart = ({ active }: DragStartEvent) => {
    console.log(active);
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

    const { reservationId } = reservation;
    const targetIndex = reservations.findIndex(
      (r) => r.reservationId === reservationId,
    );

    if (targetIndex === -1) return;

    const updatedReservation = {
      ...reservations[targetIndex],
      status: over?.data.current?.status as Status,
      staffId: over?.data.current?.staffId,
    };

    const updatedReservations = [
      ...reservations.slice(0, targetIndex),
      updatedReservation,
      ...reservations.slice(targetIndex + 1),
    ];

    setReservations(updatedReservations);
  };

  const handleDragOver = ({ over }: DragOverEvent) => {
    console.log(over);
  };

  return (
    <div className="min-h-screen w-full bg-green-100">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        <div className="flex space-x-10">
          <div className="flex-1 flex-col mt-3 space-y-7 overflow-y-auto">
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
          <div className="flex-1 flex flex-col mt-3 space-y-7 overflow-y-auto">
            {staffs.map((staff) => (
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

          <div className="flex-1 flex-col mt-3 space-y-7 overflow-y-auto">
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
