import React, { FC, ReactNode } from "react";
import MySidebar from "@/components/molecules/MySidebar";
import ToastListArea from "@/components/organisms/ToastListArea";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <MySidebar />
      {children}
      <ToastListArea />
    </>
  );
};

export default AuthLayout;
