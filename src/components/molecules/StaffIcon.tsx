import React, { FC } from "react";
import { StoreStaff } from "@/types/model/staff";
import Image from "next/image";

interface StaffIconProps {
  staff: StoreStaff;
  onClick?: (staff: StoreStaff) => void;
}

const StaffIcon: FC<StaffIconProps> = ({ staff, onClick }) => {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden">
      <Image
        alt="Avatar"
        className={`cursor-pointer transition-transform`}
        fill
        src={staff.imageUrl ? staff.imageUrl : "/images/img.png"}
        priority
        onClick={() => (onClick ? onClick(staff) : null)}
      />
    </div>
  );
};

export default StaffIcon;
