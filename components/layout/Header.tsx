import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/context/auth/AuthContext";
import { DateHelper } from "@/helpers/date-helper";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Modal from "../ui/Modal";
import classes from "../../styles/Header.module.css";
import { useRouter } from "next/router";

/** Props. */
interface Props {
  /** ナビゲーションを表示するか. */
  showNavigation: boolean;
  /** 単語リストを表示するか. */
  showWordList: boolean;
  /** クイズを表示するか. */
  showQuiz: boolean;
  /** 単語帳id. */
  bookId: string;
}

/** 日付関連ヘルパー. */
const dateHelper = new DateHelper();

/**
 * ヘッダー.
 *
 * @param {Props} props
 * @returns {JSX.Element} ヘッダー.
 */
const Header = ({ showNavigation, showWordList, showQuiz, bookId }: Props) => {
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
    const dateString = dateHelper.convertDateToString(date, ".");

    setCurrentDate(dateString);
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
      <p className={classes.header__text}>
        {isSignIn ? "ログアウト" : "ログイン"}
      </p>
    </div>
  );
  // ナビゲーション
  const navigation = showNavigation && (
    <nav className={classes.navigation}>
      <ul>
        <li>
          <Link
            href="/vocabulary/list?page=1"
            className="__vocabularyBookListPageLink__"
          >
            単語帳リスト
          </Link>
        </li>
        {showWordList && bookId && (
          <li>
            <Link
              href={`/vocabulary/list/${bookId}?page=1`}
              className="__vocabularyWordListPageLink__"
            >
              単語リスト
            </Link>
          </li>
        )}
        {showQuiz && bookId && (
          <li>
            <Link
              href={`/vocabulary/list/${bookId}/quiz`}
              className="__quizPageLink__"
            >
              クイズ
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );

  return (
    <header className={classes.header}>
      <div className={classes.header__inner}>
        <div>
          <p className={classes.header__text}>{currentDate}</p>
        </div>
        <h1 className={classes.header__logo} onClick={onClickLogoHandler}>
          My Daily Word
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
