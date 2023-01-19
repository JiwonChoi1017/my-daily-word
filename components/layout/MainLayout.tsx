import MainNavigation from "./MainNavigation";
import React from "react";

// MEMO: React.FC で定義される children はオプショナルであり、型はReact.ReactNodeである。
const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <MainNavigation />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
