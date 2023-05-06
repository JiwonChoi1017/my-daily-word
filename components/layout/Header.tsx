import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/context/auth/AuthContext";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Modal from "../ui/Modal";
import classes from "../../styles/Header.module.css";
import { useRouter } from "next/router";

/**
 * ヘッダー.
 *
 * @param {boolean} showNavigation - ナビゲーションを表示するか.
 * @param {boolean} showWordList - 単語リストを表示するか.
 * @param {boolean} showQuiz - クイズを表示するか.
 * @param {string} bookId - 単語帳id.
 * @returns {JSX.Element} ヘッダー.
 */
const Header: React.FC<{
  showNavigation: boolean;
  showWordList: boolean;
  showQuiz: boolean;
  bookId: string;
}> = ({ showNavigation, showWordList, showQuiz, bookId }) => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  // ログアウトモーダルを表示するか
  const [showSignOutModal, setShowSignOutModal] = useState<boolean>(false);

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

  // トップ画面に遷移
  const moveToTopPage = () => {
    router.push("/");
  };
  // ログイン画面に遷移
  const moveToSignInPage = () => {
    router.push("/sign-in");
  };
  // ログアウトモーダルをトーグル
  const toggleSignOutModal = () => {
    setShowSignOutModal((prevState) => {
      return !prevState;
    });
  };
  // ロゴクリックイベントハンドラ
  const onClickLogoHandler = () => {
    moveToTopPage();
  };
  // 確認ボタンクリックイベントハンドラ
  const onClickConfirmButtonHandler = async () => {
    await signOutHandler();
    toggleSignOutModal();
    setIsSignIn(!!currentUser);
    // トップ画面に遷移してから画面をリロード
    moveToTopPage();
    router.reload();
  };
  // ユーザアイコン
  const userIcon = (
    <div
      className={classes.userIcon}
      onClick={isSignIn ? toggleSignOutModal : moveToSignInPage}
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
        {showWordList && bookId && (
          <li>
            <Link href={`/vocabulary/list/${bookId}?page=1`}>単語リスト</Link>
          </li>
        )}
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
      <Modal
        show={showSignOutModal}
        text="ログアウトしますか？"
        confirmText="ログアウト"
        cancelText="キャンセル"
        onClickConfirm={onClickConfirmButtonHandler}
        onClickCancel={toggleSignOutModal}
      />
    </header>
  );
};

export default Header;
