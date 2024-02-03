import React, { FC, useEffect, useState } from "react";
import SortableColumn from "@/components/organisms/features/operation/SortableColumn";
import DroppableColumn from "@/components/organisms/features/operation/DroppableColumn";
import { Status } from "@/types/model/type";
import { Reservation } from "@/types/model/reservation";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { StoreStaff } from "@/types/model/staff";
import { useStoreStaff } from "@/hooks/useStoreStaff";

interface StaffColumnProps {
  status: Status;
  reservations: Reservation[];
  activeStaffs: StoreStaff[];
}

const StaffColumn: FC<StaffColumnProps> = ({
  status,
  reservations,
  activeStaffs,
}) => {
  const [isStaffSortable, setIsStaffSortable] = useState(false);
  const [localActiveStaffs, setLocalActiveStaffs] = useState<StoreStaff[]>([]);

  useEffect(() => {
    if (activeStaffs) setLocalActiveStaffs(activeStaffs);
  }, [activeStaffs]);

  const { handleSortActiveStaffs } = useStoreStaff();
  const handleDragStart = ({ active }: DragStartEvent) => {};

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      // 並び替え前のindex
      const oldIndex = activeStaffs.findIndex(
        (staff) => staff.staffId === active.id,
      );
      // 並び替え後のindex
      const newIndex = activeStaffs.findIndex(
        (staff) => staff.staffId === over?.id,
      );
      // 並び替え
      setLocalActiveStaffs(arrayMove(activeStaffs, oldIndex, newIndex));

      // 並び替えをDBに反映
      const activeStaffIds = localActiveStaffs.map((staff) => staff.staffId);

      handleSortActiveStaffs(
        arrayMove(activeStaffIds, oldIndex, newIndex),
      ).then(() => {
        setIsStaffSortable(false);
      });
    }
  };

  const handleOnDoubleClick = () => {
    setIsStaffSortable(!isStaffSortable);
  };

  return (
    <div
      className="h-screen flex flex-1 flex-col pt-3 justify-evenly overflow-y-auto"
      onDoubleClick={handleOnDoubleClick}
    >
      {/* 並び替えカラム */}
      {isStaffSortable && (
        <DndContext
          // sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
          {localActiveStaffs!.map((staff) => (
            <SortableContext
              key={staff.staffId}
              items={activeStaffs!.map((staff) => staff.staffId)}
              strategy={verticalListSortingStrategy}
            >
              <SortableColumn staff={staff} />
            </SortableContext>
          ))}
        </DndContext>
      )}

      {/* ドロップカラム */}
      {!isStaffSortable && (
        <>
          {localActiveStaffs!.map((staff) => (
            <DroppableColumn
              key={staff.staffId}
              status={status}
              title={staff.lastName}
              staffId={staff.staffId}
              reservations={reservations!.filter((r) => {
                return r.staffId == staff.staffId;
              })}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default StaffColumn;
