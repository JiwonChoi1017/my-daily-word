import { AuthContext } from "@/context/auth/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import classes from "../../styles/Header.module.css";

/**
 * ヘッダー.
 *
 * @param {boolean} showNavigation - ナビゲーションを表示するか.
 * @returns {JSX.Element} ヘッダー.
 */
const Header: React.FC<{ showNavigation: boolean }> = ({ showNavigation }) => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [bookId, setBookId] = useState<string>("");
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  const { signOutHandler, currentUser } = useContext(AuthContext);

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

    const { id } = router.query;
    if (!id) return;

    setBookId(typeof id === "string" ? id : id[0]);
  }, [currentUser]);

  const onClickLogoHandler = () => {
    router.push("/");
  };

  const onSignOutHandler = async () => {
    await signOutHandler();
    onClickLogoHandler();
  };

  const signInLink = isSignIn ? (
    <button onClick={onSignOutHandler}>ログアウト</button>
  ) : (
    <Link href="/sign-in">ログイン</Link>
  );

  // ナビゲーション
  const navigation = showNavigation && (
    <nav className={classes.navigation}>
      <ul>
        <li>
          <Link href="/vocabulary/list?page=1">List</Link>
        </li>
        {bookId && (
          <li>
            <Link href={`/vocabulary/list/${bookId}/quiz`}>Quiz</Link>
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
        <div className={classes.header__border__box}>{signInLink}</div>
      </div>
      {navigation}
    </header>
  );
};

export default Header;
