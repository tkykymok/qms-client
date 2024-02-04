import React, { FC, ReactNode } from "react";
import MySidebar from "@/components/molecules/MySidebar";
import StaffListArea from "@/components/organisms/features/operation/staffListArea";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <MySidebar />
      {children}
    </>
  );
};

export default AuthLayout;
