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
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
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
import StaffIcon from "@/components/molecules/StaffIcon";

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
  const isTablet = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return /tablet|ipad|playbook|silk/.test(userAgent);
  };

  const activationOptions = {
    activationConstraint: {
      delay: isTablet() ? 0 : 0, // タブレットの場合、ドラッグ時の遅延を設定 TODO 遅延設定不要？
      tolerance: 0,
    },
  };

  const sensor = useSensor(
    isTablet() ? TouchSensor : PointerSensor,
    activationOptions,
  );
  const sensors = useSensors(sensor);

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

  const toggleSortable = () => {
    setIsStaffSortable(!isStaffSortable);
  };

  return (
    <div
      className="h-screen flex flex-1 flex-col pt-3 justify-evenly overflow-y-auto"
      onDoubleClick={toggleSortable}
    >
      {/* 並び替えカラム */}
      {isStaffSortable && (
        <DndContext
          sensors={sensors}
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
              <SortableColumn
                staff={staff}
                icon={<StaffIcon staff={staff} onClick={toggleSortable} />}
              />
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
              title={`${staff.lastName} ${staff.firstName}`}
              staffId={staff.staffId}
              reservations={reservations!.filter((r) => {
                return r.staffId == staff.staffId;
              })}
              icon={<StaffIcon staff={staff} onClick={toggleSortable} />}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default StaffColumn;
