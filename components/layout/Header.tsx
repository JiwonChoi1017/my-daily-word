import { AuthContext } from "@/context/auth/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import classes from "../../styles/Header.module.css";
import { FaUser } from "react-icons/fa";

/**
 * ヘッダー.
 *
 * @param {boolean} showNavigation - ナビゲーションを表示するか.
 * @param {boolean} showQuiz - クイズを表示するか.
 * @param {string} bookId - 単語帳id.
 * @returns {JSX.Element} ヘッダー.
 */
const Header: React.FC<{
  showNavigation: boolean;
  showQuiz: boolean;
  bookId: string;
}> = ({ showNavigation, showQuiz, bookId }) => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  const { signOutHandler, currentUser } = useContext(AuthContext);
  // ルーター
  const router = useRouter();

  useEffect(() => {
    setIsSignIn(!!currentUser);

    const date = new Date();
    const currentDateArray: string[] = date.toLocaleDateString().split("/");
    // 日時に0をつけて文字列を結合
    const currentDateString = currentDateArray
      .map((date) => date.padStart(2, "0"))
      .join(".");
    setCurrentDate(currentDateString);
  }, [currentUser]);

  const onClickLogoHandler = () => {
    router.push("/");
  };
  // ログイン画面に遷移
  const moveToSignInPage = () => {
    router.push("/sign-in");
  };
  // ログアウトイベントハンドラ
  const onSignOutHandler = async () => {
    await signOutHandler();
    setIsSignIn(!!currentUser);
    onClickLogoHandler();
  };
  // ユーザアイコン
  const userIcon = (
    <div
      className={classes.userIcon}
      onClick={isSignIn ? onSignOutHandler : moveToSignInPage}
    >
      <FaUser />
      <p>{isSignIn ? "ログアウト" : "ログイン"}</p>
    </div>
  );
  // ナビゲーション
  const navigation = showNavigation && (
    <nav className={classes.navigation}>
      <ul>
        <li>
          <Link href="/vocabulary/list?page=1">単語帳リスト</Link>
        </li>
        {showQuiz && bookId && (
          <li>
            <Link href={`/vocabulary/list/${bookId}/quiz`}>クイズ</Link>
          </li>
        )}
      </ul>
    </nav>
  );

  return (
    <header className={classes.header}>
      <div className={classes.header__inner}>
        <div>
          <p>{currentDate}</p>
        </div>
        <h1 className={classes.header__logo} onClick={onClickLogoHandler}>
          Daily Word
        </h1>
        <div className={classes.header__border__box}>{userIcon}</div>
      </div>
      {navigation}
    </header>
  );
};

export default Header;
