import React, { FC, ReactNode } from "react";
import StaffListArea from "@/components/organisms/features/operation/staffListArea";

interface OperationLayoutProps {
  children: ReactNode;
}

const OperationLayout: FC<OperationLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <StaffListArea />
    </>
  );
};

export default OperationLayout;
