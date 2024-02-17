"use client";

import React, { FC, ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { StoreStaff } from "@/types/model/staff";

interface SortableColumnProps {
  staff: StoreStaff;
  icon?: ReactNode;
}

const SortableColumn: FC<SortableColumnProps> = ({ staff, icon }) => {
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
          <div className="flex items-center space-x-2">
            {icon}
            <div>
              {staff.lastName} {staff.firstName}
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="flex flex-wrap min-h-24"></div>
    </div>
  );
};

export default SortableColumn;
