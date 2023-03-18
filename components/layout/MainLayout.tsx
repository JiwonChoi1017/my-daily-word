import Header from "./Header";
import React from "react";
import classes from "../../styles/Main.module.css";

/**
 * メインレイアウト.
 *
 * @param {React.ReactNode} (任意)children.
 * @param {boolean} showNavigation - ナビゲーションを表示するか.
 * @returns {JSX.Element} メインレイアウト.
 */
const MainLayout: React.FC<{
  // MEMO: React.FC で定義される children はオプショナルであり、型はReact.ReactNodeである。
  children?: React.ReactNode;
  showNavigation?: boolean;
}> = ({ children, showNavigation = true }) => {
  return (
    <div>
      <Header showNavigation={showNavigation} />
      <main>
        <div className={classes.main}>{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
