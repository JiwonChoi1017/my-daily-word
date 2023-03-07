import { AuthContext } from "@/context/auth/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const MainNavigation = () => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [bookId, setBookId] = useState<string>("");
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  const { signOutHandler, currentUser } = useContext(AuthContext);

  const router = useRouter();

  const onSignOutHandler = async () => {
    await signOutHandler();
    router.push("/");
  };

  const signInLink = isSignIn ? (
    <button onClick={onSignOutHandler}>ログアウト</button>
  ) : (
    <Link href="/sign-in">ログイン</Link>
  );

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

  return (
    <header>
      <div>
        <ul>
          <li>{currentDate}</li>
          <li>
            <Link href="/vocabulary/list?page=1">List</Link>
          </li>
          {bookId && (
            <li>
              <Link href={`/vocabulary/list/${bookId}/quiz`}>Quiz</Link>
            </li>
          )}
          <li>{signInLink}</li>
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
