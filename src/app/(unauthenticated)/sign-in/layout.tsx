import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen w-full">{children}</div>
);

export default MainLayout;
