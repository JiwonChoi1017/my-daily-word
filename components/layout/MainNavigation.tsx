import { AuthContext } from "@/context/auth/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const MainNavigation = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const { signOutHandler, currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [bookId, setBookId] = useState<string>("");

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

    const { id } = router.query;
    if (!id) return;

    setBookId(typeof id === "string" ? id : id[0]);
  }, [currentUser]);

  return (
    <header>
      <div>
        <ul>
          <li>{signInLink}</li>
          <li>
            <Link href="/vocabulary/list">List</Link>
          </li>
          {bookId && (
            <li>
              <Link href={`/vocabulary/list/${bookId}/quiz`}>Quiz</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
