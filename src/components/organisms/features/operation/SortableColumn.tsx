"use client";

import React, { FC } from "react";
import DraggableCard from "@/components/organisms/features/operation/DraggableCard";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useDroppable,
} from "@dnd-kit/core";
import { Status } from "@/types/model/type";
import CardContext from "@/components/organisms/features/operation/CardContext";
import { Reservation } from "@/types/model/reservation";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { StoreStaff } from "@/types/model/staff";

interface SortableColumnProps {
  staff: StoreStaff;
}

const SortableColumn: FC<SortableColumnProps> = ({ staff }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: staff.staffId,
      data: { ...staff },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`
        mx-3
        rounded-md
        bg-white
        shadow-xl
        border-2
        border-green-300
      `}
    >
      <div className="bg-white text-neutral-700 font-medium select-none z-10">
        <div className={`p-5 flex justify-between bg-in-progress`}>
          <div className="flex">
            <div>{staff.lastName}</div>
          </div>
        </div>
        <hr />
      </div>

      <div className="flex flex-wrap min-h-24"></div>
    </div>
  );
};

export default SortableColumn;
