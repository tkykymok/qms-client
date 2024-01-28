import React, { FC, ReactNode } from "react";
import MySidebar from "@/components/molecules/MySidebar";

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
