import Header from "./Header";
import React from "react";
import classes from "../../styles/MainLayout.module.css";
import { Helmet } from "react-helmet";

/**
 * メインレイアウト.
 *
 * @param {React.ReactNode} children - (任意)children.
 * @param {boolean} showNavigation - (任意)ナビゲーションを表示するか.
 * @param {boolean} showWordList - (任意)単語リストを表示するか.
 * @param {boolean} showQuiz - (任意)クイズを表示するか.
 * @param {string} bookId - (任意)単語帳id.
 * @returns {JSX.Element} メインレイアウト.
 */
const MainLayout: React.FC<{
  // MEMO: React.FC で定義される children はオプショナルであり、型はReact.ReactNodeである。
  children?: React.ReactNode;
  showNavigation?: boolean;
  showWordList?: boolean;
  showQuiz?: boolean;
  bookId?: string;
}> = ({
  children,
  showNavigation = true,
  showWordList = false,
  showQuiz = false,
  bookId = "",
}) => {
  return (
    <div>
      <Header
        showNavigation={showNavigation}
        showWordList={showWordList}
        showQuiz={showQuiz}
        bookId={bookId}
      />
      <Helmet>
        <title>Daily Word</title>
      </Helmet>
      <main>
        <div className={classes.main}>{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
